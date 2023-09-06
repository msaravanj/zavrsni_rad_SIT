import { useState, forwardRef, useImperativeHandle } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ListGroup from "react-bootstrap/ListGroup";
import classes from "./SelectAirportModal.module.css";
import { useDispatch } from "react-redux";
import { fromFlightLocationActions } from "../store/index";

const SelectAirportFromModal = forwardRef((props, ref) => {
  const [show, setShow] = useState(false);
  let key = 1;
  const dispatch = useDispatch();
  const [airportFrom, setAirportFrom] = useState();

  const handleClose = () => setShow(false);
  useImperativeHandle(ref, () => ({
    handleShow() {
      setShow(true);
    },
  }));

  return (
    <Modal
      className={classes.modal}
      show={show}
      onHide={() => {
        props.settingCitySelected(false);
        setAirportFrom("");
        dispatch(
          fromFlightLocationActions.uploadLocationChanged({
            isFromChanged: false,
          })
        );
        handleClose();
      }}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Select airport</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup>
          {props.airports !== [] &&
            props.airports.map((airport) => {
              return (
                <ListGroup.Item
                  key={key++}
                  action
                  variant="primary"
                  onClick={() => {
                    props.setSelectedCity(airport);
                    console.log(airport.name);
                    setAirportFrom(airport);
                  }}
                >
                  {airport.iata} | {airport.name}
                </ListGroup.Item>
              );
            })}
        </ListGroup>
        {props.airports.length === 0 && (
          <p>Didn't find any results. Try again.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          disabled={props.selectedcity === ""}
          onClick={() => {
            props.settingCitySelected(true);
            dispatch(
              fromFlightLocationActions.uploadLocation({
                location: [airportFrom.location.lat, airportFrom.location.lon],
              })
            );
            handleClose();
          }}
        >
          Okay
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default SelectAirportFromModal;
