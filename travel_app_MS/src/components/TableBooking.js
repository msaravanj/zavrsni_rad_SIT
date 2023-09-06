import React, { useState } from "react";
import styles from "./TableBooking.module.css";
import RowTableBooking from "./RowTableBooking";
import { useSelector } from "react-redux";
import Form from "react-bootstrap/Form";

const TableBooking = (props) => {
  const propertiesRated = useSelector((state) => state.booking.properties);
  const propertiesCheap = useSelector((state) => state.booking.properties);
  const [select, setSelect] = useState("rated");

  const propertiesCheap1 = propertiesCheap
    .slice()
    .sort((a, b) => a.price - b.price);

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
            <option value="rated">Best rated</option>
            <option value="price">Cheapest price</option>
          </Form.Select>
        </div>
      </div>
      {select === "rated" &&
        propertiesRated.map((property) => (
          <RowTableBooking
            key={property.id}
            name={property.name}
            city={property.city}
            latitude={property.latitude}
            longitude={property.longitude}
            address={property.address}
            review={property.review}
            price={property.price}
            checkout={property.checkout}
            checkin={property.checkin}
            url={property.url}
            photoUrl={property.photoUrl}
            reviewWord={property.reviewWord}
            adults={property.adults}
            children={property.children}
            showViewMap={props.onViewMap}
            onShowZoomModal={props.onShowZoomModal}
            type={property.type}
            checkin2={property.checkin2}
            checkout2={property.checkout2}
          ></RowTableBooking>
        ))}
      {select === "price" &&
        propertiesCheap1.map((property) => (
          <RowTableBooking
            key={property.id}
            name={property.name}
            city={property.city}
            latitude={property.latitude}
            longitude={property.longitude}
            address={property.address}
            review={property.review}
            price={property.price}
            checkout={property.checkout}
            checkin={property.checkin}
            url={property.url}
            photoUrl={property.photoUrl}
            reviewWord={property.reviewWord}
            adults={property.adults}
            children={property.children}
            showViewMap={props.onViewMap}
            onShowZoomModal={props.onShowZoomModal}
            type={property.type}
            checkin2={property.checkin2}
            checkout2={property.checkout2}
          ></RowTableBooking>
        ))}
    </div>
  );
};

export default TableBooking;
