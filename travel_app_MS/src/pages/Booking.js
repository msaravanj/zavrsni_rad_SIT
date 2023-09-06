import BookingInputForm from "../components/BookingInputForm";
import MapBooking from "../components/MapBooking";
import React from "react";
import { useState, useRef } from "react";
import TableBooking from "../components/TableBooking";
import vacationImg from "../assets/vacation.jpg";
import ZoomModal from "../components/ZoomModal";
import classes from "./Rentals.module.css";

const Booking = () => {
  const [showTable, setShowTable] = useState(false);

  const ref = useRef(null);
  const ref2 = useRef(null);

  const setViewToTable = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const setViewToMap = () => {
    ref2.current?.scrollIntoView({ behavior: "smooth" });
  };

  const [showZoomModal, setShowZoomModal] = useState(false);

  const onSetZoomModal = (bool) => {
    setShowZoomModal(bool);
  };

  const showTableHandler = (bool) => {
    setShowTable(bool);
  };

  return (
    <div className={classes.page}>
      <img
        src={vacationImg}
        className={classes.imgBooking}
        alt="vacation"
      ></img>
      <div ref={ref2} className={classes.inputForm}>
        <BookingInputForm
          onSetViewToMap={setViewToTable}
          onShowTable={showTableHandler}
        />
      </div>
      <ZoomModal
        onShowZoomModal={onSetZoomModal}
        showZoomModal={showZoomModal}
      />

      <MapBooking />
      <div ref={ref}>
        {showTable && (
          <TableBooking
            onViewMap={setViewToMap}
            onShowZoomModal={onSetZoomModal}
          />
        )}
      </div>
    </div>
  );
};

export default Booking;
