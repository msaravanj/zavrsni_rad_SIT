import { MapContainer, TileLayer, Marker, useMapEvent } from "react-leaflet";
import styles from "./Map.module.css";
import { useSelector } from "react-redux";
import { Polyline } from "react-leaflet";
import { Button } from "react-bootstrap";

const MapBus = () => {
  const fromCoordinates = useSelector((state) => state.fromLoc.fromLocation);
  const isFromChanged = useSelector((state) => state.fromLoc.isFromChanged);
  const toCoordinates = useSelector((state) => state.toLoc.toLocation);
  const isToChanged = useSelector((state) => state.toLoc.isToChanged);
  const bounds = [fromCoordinates, toCoordinates];

  const MapBounds = () => {
    const map = useMapEvent("click", () => {
      map.fitBounds(bounds);
    });
  };

  return (
    <div>
      <MapContainer
        className={styles.map}
        center={[51.4381, 5.4752]}
        zoom={2}
        scrollWheelZoom={false}
      >
        <TileLayer
          maxZoom="20"
          minZoom="1"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        ></TileLayer>
        {isToChanged && isFromChanged && <Marker position={toCoordinates} />}
        {isFromChanged && isToChanged && (
          <Polyline
            pathOptions={{ color: "blue" }}
            positions={[fromCoordinates, toCoordinates]}
          ></Polyline>
        )}
        <MapBounds />
      </MapContainer>
    </div>
  );
};

export default MapBus;
