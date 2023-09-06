import React from "react";
import styles from "./Table.module.css";
import RowTable from "./RowTable";
import { useSelector } from "react-redux";

const Table = () => {
  const trips = useSelector((state) => state.trips.trips);

  return (
    <div className={styles.table}>
      {trips.map((trip) => (
        <RowTable
          key={trip.id}
          date={trip.date}
          from={trip.from}
          to={trip.to}
          departure={trip.departure}
          arrival={trip.arrival}
          duration={trip.duration}
          price={trip.price}
        ></RowTable>
      ))}
    </div>
  );
};

export default Table;
