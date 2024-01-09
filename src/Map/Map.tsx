import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { data, dataDark } from '../helpers/tileLayerHelper';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';

import cn from 'classnames';
import styles from './Map.module.scss';
import customIcon from '../../public/images/apartments.png';

import { apartments } from '../../public/api/apartments.json';

import { ApartmentsDetails } from '../ApartmentsDetails/ApartmentsDetails';
import { Zoom } from '../Zoom/Zoom';
import { ModalReserve } from '../ModalReserve/ModalReserve';
import { ModalAdvertising } from '../ModalAdvertising/ModalAdvertising';
import { Switch } from '../Switch/Switch';

import { useCustomContext } from '../helpers/customContext';

export const Map = () => {
    const {
        error,
        setIsAccess,
        setIsClose,
        setError,
        isAccess,
        isClose,
        theme,
        allApartments,
        setModalReserve,
        modalReserve,
        initialApartments,
        currentZoomLevel,
        MapAddAdvertising,
        MapCatchError,
    } = useCustomContext();

    const customMarkerIcon = new L.Icon({
        iconUrl: customIcon,
    });

    return (
        <div className={styles.container}>
            <div className={styles.container__left_side}>
                <button
                    className={cn(styles.container__left_side_btn, {
                        [styles['container__left_side_btn_error']]: error
                    })}
                    onClick={() => {
                        setIsAccess(true);
                        setIsClose(false);
                        setError(false);
                    }}>
                    Здати в оренду
                </button>

                {error && (
                    <p className={styles.container__left_side_error_message}>
                        Заповніть, будь ласка, необхідні данні
                    </p>
                )}

                <Switch />
            </div>

            <div className={styles.container__modal_advertising}>
                {isAccess && !isClose && <ModalAdvertising />}
            </div>

            <MapContainer
                center={[49.8397, 24.0297]}
                zoom={10}
                className={styles.container__map}
            >
                {theme === 'light' ? (
                    <TileLayer
                        url={data.url}
                        attribution={data.attribution}
                    />
                ) : (
                    <TileLayer
                        url={dataDark.url}
                        attribution={dataDark.attribution}
                    />
                )}

                <MapCatchError />

                {isAccess && <MapAddAdvertising />}

                <MarkerClusterGroup>
                    {allApartments.map(item => (
                        <Marker
                            key={item.id}
                            position={[item.lat, item.lng]}
                            icon={customMarkerIcon}
                            eventHandlers={{ click: () => setModalReserve(item) }}
                        />
                    ))}
                </MarkerClusterGroup>

                <Zoom />

            </MapContainer>

            <div className={styles.container__modal_reserve}>
                {modalReserve && <ModalReserve />}
            </div>

            <div className={styles.container__right_side}>

                {initialApartments && currentZoomLevel < 14 && currentZoomLevel > 9
                    && JSON.stringify(apartments) === JSON.stringify(allApartments) &&
                    apartments.map(item => (
                        <ApartmentsDetails key={item.id} item={item} />
                    ))
                }

                {allApartments.map(item => (
                    item.zoomLevel.includes(currentZoomLevel) ?
                        (<ApartmentsDetails key={item.id} item={item} />) :
                        null
                ))}
            </div>
        </div>
    );
};

