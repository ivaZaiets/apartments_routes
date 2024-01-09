import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { useCustomContext } from "../helpers/customContext";

export const Zoom = () => {
    const {setCurrentZoomLevel} = useCustomContext();
    
    const map = useMap();
  
    useEffect(() => {
      const handleZoomEnd = () => {
        setCurrentZoomLevel(map.getZoom())
      };
  
      map.on('zoomend', handleZoomEnd);
  
      return () => {
        
        map.off('zoomend', handleZoomEnd);
      };
    }, [map, setCurrentZoomLevel]);
  
    return null;
  };