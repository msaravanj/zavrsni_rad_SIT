import MapBus from "../components/MapBus";
import mapStyle from "./Leaflet.module.css";
import BusInputForm from "../components/BusInputForm";
import styles from "./Pages.module.css";
import React, { useState, useRef } from "react";
import Table from "../components/Table";
import BusCarousel from "../components/BusCarousel";
import classes from "./Rentals.module.css";

const Buses = () => {
  const [showTable, setShowTable] = useState(false);

  const ref = useRef(null);
  const ref2 = useRef(null);

  const setViewToTable = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };
  const setViewToMap = () => {
    ref2.current?.scrollIntoView({ behavior: "smooth" });
  };
  const showTableHandler = (bool) => {
    setShowTable(bool);
  };

  return (
    <div>
      <div className={styles.body}>
        <BusCarousel />
        <div className={classes.inputForm}>
          <BusInputForm
            onShowTable={showTableHandler}
            onSetViewToMap={setViewToMap}
            onSetViewToTable={setViewToTable}
          />
        </div>
        <div ref={ref}>{showTable && <Table onViewMap={setViewToMap} />}</div>
        <div ref={ref2}>
          <MapBus className={mapStyle["leaflet-container"]} />
        </div>
      </div>
    </div>
  );
};

export default Buses;
