import React, { useState, useRef } from "react";
import MapRental from "../components/MapRental";
import RentalImages from "../components/RentalImages";
import RentalInputForm from "../components/RentalInputForm";
import classes from "./Rentals.module.css";
import TableRental from "../components/TableRental";

const Rentals = () => {
  const [showTable, setShowTable] = useState(false);
  const ref = useRef(null);
  const ref2 = useRef(null);

  const [showZoomModal, setShowZoomModal] = useState(false);

  const setViewToTable = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const onSetZoomModal = (bool) => {
    setShowZoomModal(bool);
  };

  const setViewToMap = () => {
    ref2.current?.scrollIntoView({ behavior: "smooth" });
  };

  const showTableHandler = (bool) => {
    setShowTable(bool);
  };

  return (
    <div className={classes.rentalPage}>
      <RentalImages />
      <div className={classes.inputForm}>
        <RentalInputForm
          onSetViewToMap={setViewToMap}
          onShowTable={showTableHandler}
          onSetViewToTable={setViewToTable}
        />
      </div>
      <div ref={ref2}>
        <MapRental />
      </div>

      <div ref={ref}>
        {showTable && (
          <TableRental
            onViewMap={setViewToMap}
            onShowZoomModal={onSetZoomModal}
          />
        )}
      </div>
    </div>
  );
};

export default Rentals;
