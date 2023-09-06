import MapFlight from "../components/MapFlight";
import FlightCarousel from "../components/FlightCarousel";
import { useState, useRef } from "react";

import styles from "./Pages.module.css";
import mapStyle from "./Leaflet.module.css";
import FlightInputForm from "../components/FlightInputForm";
import TableFlights from "../components/TableFlights";
import classes from "./Rentals.module.css";

const Airlines = () => {
  const [showTable, setShowTable] = useState(false);

  const showTableHandler = (bool) => {
    setShowTable(bool);
  };

  const ref = useRef(null);
  const ref2 = useRef(null);

  const setViewToTable = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const setViewToMap = () => {
    ref2.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={styles.body}>
      <FlightCarousel />
      <div className={classes.inputForm}>
        <FlightInputForm
          showTable={showTableHandler}
          onSetViewToMap={setViewToMap}
          onSetViewToTable={setViewToTable}
        />
      </div>
      {showTable && (
        <div ref={ref}>
          <TableFlights />
        </div>
      )}
      <div ref={ref2}>
        <MapFlight className={mapStyle["leaflet-container"]} />
      </div>
    </div>
  );
};

export default Airlines;
