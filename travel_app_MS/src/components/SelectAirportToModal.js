import { useState, forwardRef, useImperativeHandle } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ListGroup from "react-bootstrap/ListGroup";
import classes from "./SelectAirportModal.module.css";
import { useDispatch } from "react-redux";
import { toFlightLocationActions } from "../store/index";

const SelectAirportToModal = forwardRef((props, ref) => {
  const [show, setShow] = useState(false);
  let key = 1;
  const dispatch = useDispatch();
  const [airportTo, setAirportTo] = useState();

  const handleClose = () => setShow(false);
  useImperativeHandle(ref, () => ({
    handleShow() {
      setShow(true);
    },
  }));

  return (
    <Modal
      className={classes.modal}
      onHide={() => {
        props.settingCitySelected(false);
        setAirportTo("");
        dispatch(
          toFlightLocationActions.uploadLocationChanged({
            isToChanged: false,
          })
        );
        handleClose();
      }}
      show={show}
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
                    setAirportTo(airport);
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
              toFlightLocationActions.uploadLocation({
                location: [airportTo.location.lat, airportTo.location.lon],
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

export default SelectAirportToModal;
