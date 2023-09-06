import { MapContainer, TileLayer, Marker, useMapEvent } from "react-leaflet";
import styles from "./Map.module.css";
import { useSelector } from "react-redux";
import { Polyline } from "react-leaflet";

const MapFlight = () => {
  const fromCoordinates = useSelector(
    (state) => state.fromFlightLoc.fromLocation
  );
  const isFromChanged = useSelector(
    (state) => state.fromFlightLoc.isFromChanged
  );
  const toCoordinates = useSelector((state) => state.toFlightLoc.toLocation);
  const isToChanged = useSelector((state) => state.toFlightLoc.isToChanged);
  const bounds = [fromCoordinates, toCoordinates];

  const MapBounds = () => {
    const map = useMapEvent("click", () => {
      map.fitBounds(bounds);
    });
  };

  return (
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
  );
};

export default MapFlight;
