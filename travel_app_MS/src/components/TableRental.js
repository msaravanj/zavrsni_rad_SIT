import React, { useState } from "react";
import styles from "./TableBooking.module.css";
import RowTableRental from "./RowTableRental";
import { useSelector } from "react-redux";
import { Form } from "react-bootstrap";

const TableRental = (props) => {
  const carsCheap = useSelector((state) => state.rental.cars);
  const carsExpensive = useSelector((state) => state.rental.cars);

  const carsExpensive1 = carsExpensive
    .slice()
    .sort((a, b) => b.price - a.price);

  const [select, setSelect] = useState("cheap");
  let key1 = 0;

  return (
    <div className={styles.table}>
      <div className={styles.sort}>
        <h4>Sort by: </h4>
        <div className={styles.select}>
          <Form.Select
            aria-label="Select sorting"
            value={select}
            onChange={(e) => {
              setSelect(e.currentTarget.value);
            }}
          >
            <option value="cheap">Cheap - Expensive</option>
            <option value="expensive">Expensive - Cheap</option>
          </Form.Select>
        </div>
      </div>
      {select === "cheap" &&
        carsCheap.map((car) => (
          <RowTableRental
            key={key1++}
            name={car.carExample}
            partner={car.partner}
            description={car.description}
            passengers={car.passengers}
            isAutomatic={car.isAutomatic}
            image={car.image}
            pickDate={car.pickDate}
            dropDate={car.dropDate}
            pickupLocation={car.pickupLocation}
            pickupLatLon={car.pickupLatLon}
            centerDistance={car.centerDistance}
            dropoffLocation={car.dropoffLocation}
            dropoffLatLon={car.dropoffLatLon}
            price={car.price}
            isFreeCancellation={car.isFreeCancellation}
            showViewMap={props.onViewMap}
            onShowZoomModal={props.onShowZoomModal}
          ></RowTableRental>
        ))}
      {select === "expensive" &&
        carsExpensive1.map((car) => (
          <RowTableRental
            key={key1++}
            name={car.carExample}
            partner={car.partner}
            description={car.description}
            passengers={car.passengers}
            isAutomatic={car.isAutomatic}
            image={car.image}
            pickDate={car.pickDate}
            dropDate={car.dropDate}
            pickupLocation={car.pickupLocation}
            pickupLatLon={car.pickupLatLon}
            centerDistance={car.centerDistance}
            dropoffLocation={car.dropoffLocation}
            dropoffLatLon={car.dropoffLatLon}
            price={car.price}
            isFreeCancellation={car.isFreeCancellation}
            showViewMap={props.onViewMap}
            onShowZoomModal={props.onShowZoomModal}
          ></RowTableRental>
        ))}
    </div>
  );
};

export default TableRental;
