import React, { useState } from "react";
import { Marker, TileLayer, MapContainer, useMapEvent } from "react-leaflet";
import { useSelector } from "react-redux";
import styles from "./Map.module.css";

const MapBooking = () => {
  const position = useSelector((state) => state.booking.location);
  const isPositionChanged = useSelector(
    (state) => state.booking.isLocationChanged
  );

  const MapBounds = () => {
    const map = useMapEvent("click", () => {
      map.fitBounds([position, position]);
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
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {isPositionChanged && <Marker position={position}></Marker>}
        {isPositionChanged && <MapBounds />}
      </MapContainer>
    </div>
  );
};

export default MapBooking;
