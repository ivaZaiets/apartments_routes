import React, { useEffect, useState } from "react";
import { LeafletMouseEvent } from "leaflet";
import { useMapEvents } from "react-leaflet";

import { ApartmentsContextInterface } from "./interfaces/apartmentsContextInterface";
import { Apartments } from "./interfaces/apartments";

import { apartments } from '../public/api/apartments.json';

import { v4 as uuidv4 } from 'uuid';

export const Context = React.createContext<ApartmentsContextInterface>(
    {} as ApartmentsContextInterface,
);

export const ApartmentsContext = ({ children }: { children: React.ReactNode }) => {

    const [currentZoomLevel, setCurrentZoomLevel] = useState(10);
    const [modalReserve, setModalReserve] = useState<Apartments | null>(null);
    const [allApartments, setAllApartments] = useState<Apartments[]>(apartments);
    const [initialApartments, setInitialApartments] = useState(false);
    const [isAccess, setIsAccess] = useState(false);
    const [isClose, setIsClose] = useState(true);
    const [query, setQuery] = useState('');
    const [price, setPrice] = useState('');
    const [adress, setAdress] = useState('');
    const [city, setCity] = useState('');
    const [error, setError] = useState(false);

    const savedTheme = localStorage.getItem('theme') || 'light';
    const [theme, setTheme] = useState(savedTheme);

    const allZoomLayer = (zoomLevel: number[]) => {
        const maxZoom = 18;

        while (zoomLevel[zoomLevel.length - 1] < maxZoom) {
            zoomLevel.push(zoomLevel[zoomLevel.length - 1] + 1);
        }

        return zoomLevel;
    }

    const reset = () => {
        setQuery('');
        setPrice('');
        setAdress('');
        setCity('');
    }

    const addMarker = (e: LeafletMouseEvent) => {
        const { lat, lng } = e.latlng;

        const newMarker: Apartments = {
            id: uuidv4(),
            title: query,
            lat: lat,
            lng: lng,
            price: price + '₴',
            adress: adress,
            city: city,
            img: [
                {
                    "id": 0,
                    "src": "../images/empty_image.png",
                    "alt": "apartments 1 Lviv"
                },
                {
                    "id": 1,
                    "src": "../images/empty_image.png",
                    "alt": "apartments 1 Lviv"
                },
                {
                    "id": 2,
                    "src": "../images/empty_image.png",
                    "alt": "apartments 1 Lviv"
                },
            ],
            zoomLevel: allZoomLayer([currentZoomLevel]),
        }

        setAllApartments([...allApartments, newMarker])
        setIsAccess(false);
        reset();
    }

    const MapAddAdvertising = () => {
        useMapEvents({
            click: (e: LeafletMouseEvent) => {
                addMarker(e);
                setError(false);
            }
        });
        return null;
    };

    const MapCatchError = () => {
        useMapEvents({
            click: () => setError(true),
        });
        return null;
    };

    useEffect(() => {
        setInitialApartments(true)
    }, [])

    const contextValue: ApartmentsContextInterface = {
        currentZoomLevel,
        setCurrentZoomLevel,
        modalReserve,
        setModalReserve,
        allApartments,
        setAllApartments,
        initialApartments,
        setInitialApartments,
        isAccess,
        setIsAccess,
        isClose,
        setIsClose,
        query,
        setQuery,
        price,
        setPrice,
        adress,
        setAdress,
        city,
        setCity,
        error,
        setError,
        theme,
        setTheme,
        MapAddAdvertising,
        MapCatchError,
    };

    return (
        <Context.Provider value={contextValue}>
            {children}
        </Context.Provider>
    );
};