import React from "react";
import styles from "./Table.module.css";
import RowTableFlights from "./RowTableFlights";
import { useSelector } from "react-redux";

const TableFlights = () => {
  const flights = useSelector((state) => state.flights.flights);

  return (
    <div className={styles.table}>
      {flights.map((flight) => (
        <RowTableFlights
          key={flight.number}
          airportFrom={flight.airportFrom}
          airportTo={flight.airportTo}
          departureDate={flight.departureDate}
          departureTime={flight.departureTime}
          arrivalDate={flight.arrivalDate}
          arrivalTime={flight.arrivalTime}
          number={flight.number}
          model={flight.model}
          airline={flight.airline}
        ></RowTableFlights>
      ))}
    </div>
  );
};

export default TableFlights;
