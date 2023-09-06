import React, { useState, useRef } from "react";
import classes from "./FlightInputForm.module.css";
import {
  Col,
  Row,
  Button,
  Form,
  Container,
  Alert,
  Spinner,
} from "react-bootstrap";
import { rentalActions } from "../store";
import { useDispatch } from "react-redux";
import { useGranularEffect } from "granular-hooks";

const RentalInputForm = (props) => {
  const [pickUpLocation, setPickUpLocation] = useState("");
  const [dropOffLocation, setDropOffLocation] = useState("");
  const [pickUpDate, setPickUpDate] = useState("");
  const [dropOffDate, setDropOffDate] = useState("");
  const [pickUpHour, setPickUpHour] = useState("");
  const [dropOffHour, setDropOffHour] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [cityId, setCityId] = useState("");
  const [cityIdError, setCityIdError] = useState({ error: false });
  const [carsError, setCarsError] = useState({ error: false });
  const [isLoading, setIsLoading] = useState(false);

  let pickupTimestamp = Math.floor(new Date(pickUpDate).getTime() / 1000.0);
  let dropoffTimestamp = Math.floor(new Date(dropOffDate).getTime() / 1000.0);

  let [yearPick, monthPick, dayPick] = pickUpDate.split("-");

  let [yearDrop, monthDrop, dayDrop] = dropOffDate.split("-");

  const dispatch = useDispatch();

  const initialRender = useRef(true);

  const urlCity = `https://priceline-com-provider.p.rapidapi.com/v2/cars/autoComplete?string=${pickUpLocation}&get_airports_in_cities=true&get_cities=true&get_airports=false`;
  const optionsCity = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "b1ea854598mshf9e4713004ceb47p17ac51jsna4065fbbf64a",
      "X-RapidAPI-Host": "priceline-com-provider.p.rapidapi.com",
    },
  };

  let urlCars = `https://priceline-com-provider.p.rapidapi.com/v2/cars/resultsVer?dropoff_time=${dropOffHour}&pickup_time=${pickUpHour}&dropoff_date=${monthDrop}/${dayDrop}/${yearDrop}&pickup_date=${monthPick}/${dayPick}/${yearPick}&pickup_code=${cityId}&prepaid_rates=true`;
  if (isChecked === true) {
    urlCars = urlCars + `&dropoff_code=${dropOffLocation}}`;
  }
  const optionsCars = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "b1ea854598mshf9e4713004ceb47p17ac51jsna4065fbbf64a",
      "X-RapidAPI-Host": "priceline-com-provider.p.rapidapi.com",
    },
  };

  const fetchCityId = () => {
    fetch(urlCity, optionsCity)
      .then((response) => response.json())
      .then((data) => {
        setCityId(
          data.getCarAutoComplete.results.city_data.city_0.ppn_car_cityid
        );
        dispatch(
          rentalActions.uploadLocation({
            location: [
              data.getCarAutoComplete.results.city_data.city_0.latitude,
              data.getCarAutoComplete.results.city_data.city_0.longitude,
            ],
          })
        );
        setCityIdError({ error: false });
      })
      .catch((err) => {
        console.error(err);
        setCityIdError({ error: true });
        props.onShowTable(false);
        dispatch(
          rentalActions.uploadLocationChanged({
            isLocationChanged: false,
          })
        );
      });
  };

  const fetchCars = () => {
    setIsLoading(true);
    fetch(urlCars, optionsCars)
      .then((response) => response.json())
      .then((data) => {
        const carsArr = [];
        let data1 = Object.values(data.getCarResultsV3.results.result_list);
        for (let car of data1) {
          carsArr.push({
            partner: car.partner.name,
            carExample: car.car.example,
            description: car.car.description,
            passengers: car.car.passengers,
            isAutomatic: car.car.automatic_transmission,
            image: car.car.imageurl,
            pickDate: pickUpDate,
            dropDate: dropOffDate,
            pickupLocation: car.pickup.location,
            pickupLatLon: [car.pickup.latitude, car.pickup.longitude],
            centerDistance: car.pickup.city_center_distance,
            dropoffLocation: car.dropoff.location,
            dropoffLatLon: [car.dropoff.latitude, car.dropoff.longitude],
            price: car.price_details.source_total,
            isFreeCancellation: car.price_details.free_cancellation,
          });
        }

        carsArr.sort((a, b) => a.price - b.price);

        dispatch(rentalActions.uploadCars({ cars: carsArr }));
        props.onShowTable(true);
        setCarsError({ error: false });
        props.onSetViewToTable();
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
        props.onShowTable(false);
        setCarsError({ error: true });
      });
  };

  useGranularEffect(
    () => {
      if (initialRender.current) {
        initialRender.current = false;
        console.log("initial");
        return;
      } else {
        fetchCars();
      }
    },
    [cityId],
    []
  );

  return (
    <Container className={classes.inputForm}>
      <Form className={classes.form_1}>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <Form.Group className="mb-3" controlId="control1">
              <Form.Label>Pick-up location</Form.Label>
              <Form.Control
                type="city"
                className={classes.fields}
                autoFocus
                onChange={(event) => {
                  setPickUpLocation(event.target.value);
                }}
              />
            </Form.Group>
          </Col>
          {isChecked === true && (
            <Col md="auto">
              <Form.Group className="mb-3" controlId="control2">
                <Form.Label>Drop-off location</Form.Label>
                <Form.Control
                  type="city"
                  className={classes.fields}
                  onChange={(event) => {
                    setDropOffLocation(event.target.value);
                  }}
                />
              </Form.Group>
            </Col>
          )}
          <Col md="auto">
            <Form.Group className="mb-3" controlId="control3">
              <Form.Label>Pick-up date</Form.Label>
              <Form.Control
                type="date"
                className={classes.fields}
                min={new Date().toISOString().split("T")[0]}
                onChange={(event) => {
                  setPickUpDate(event.target.value);
                }}
              ></Form.Control>
              <Form.Select
                aria-label="select"
                className={classes.fields}
                onChange={(event) => {
                  setPickUpHour(event.target.value);
                }}
              >
                <option value="">Select hour</option>
                <option value="00:00">0:00</option>
                <option value="01:00">1:00</option>
                <option value="02:00">2:00</option>
                <option value="03:00">3:00</option>
                <option value="04:00">4:00</option>
                <option value="05:00">5:00</option>
                <option value="06:00">6:00</option>
                <option value="07:00">7:00</option>
                <option value="08:00">8:00</option>
                <option value="09:00">9:00</option>
                <option value="10:00">10:00</option>
                <option value="11:00">11:00</option>
                <option value="12:00">12:00</option>
                <option value="13:00">13:00</option>
                <option value="14:00">14:00</option>
                <option value="15:00">15:00</option>
                <option value="16:00">16:00</option>
                <option value="17:00">17:00</option>
                <option value="18:00">18:00</option>
                <option value="19:00">19:00</option>
                <option value="20:00">20:00</option>
                <option value="21:00">21:00</option>
                <option value="22:00">22:00</option>
                <option value="23:00">23:00</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md="auto">
            <Form.Group className="mb-3" controlId="control4">
              <Form.Label>Drop-off date</Form.Label>
              <Form.Control
                className={classes.fields}
                type="date"
                min={new Date().toISOString().split("T")[0]}
                onChange={(event) => {
                  setDropOffDate(event.target.value);
                }}
              ></Form.Control>
              <Form.Select
                className={classes.fields}
                aria-label="Default select example"
                onChange={(event) => {
                  setDropOffHour(event.target.value);
                }}
              >
                <option value="">Select hour</option>
                <option value="00:00">0:00</option>
                <option value="01:00">1:00</option>
                <option value="02:00">2:00</option>
                <option value="03:00">3:00</option>
                <option value="04:00">4:00</option>
                <option value="05:00">5:00</option>
                <option value="06:00">6:00</option>
                <option value="07:00">7:00</option>
                <option value="08:00">8:00</option>
                <option value="09:00">9:00</option>
                <option value="10:00">10:00</option>
                <option value="11:00">11:00</option>
                <option value="12:00">12:00</option>
                <option value="13:00">13:00</option>
                <option value="14:00">14:00</option>
                <option value="15:00">15:00</option>
                <option value="16:00">16:00</option>
                <option value="17:00">17:00</option>
                <option value="18:00">18:00</option>
                <option value="19:00">19:00</option>
                <option value="20:00">20:00</option>
                <option value="21:00">21:00</option>
                <option value="22:00">22:00</option>
                <option value="23:00">23:00</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col className={classes.btns} xs lg="1">
            <Button
              type="button"
              disabled={
                pickUpLocation === "" ||
                pickUpHour === "" ||
                dropOffHour === "" ||
                pickUpDate === "" ||
                dropOffDate === "" ||
                (isChecked === true && dropOffLocation === "") ||
                pickupTimestamp >= dropoffTimestamp
              }
              onClick={() => {
                setIsLoading(true);
                fetchCityId();
                setIsLoading(false);
              }}
            >
              Search
            </Button>
            <div className={classes.spinner2}>
              {isLoading && <Spinner animation="border" variant="primary" />}
            </div>
          </Col>
        </Row>

        <Row>
          <Col xs={2} md={4}>
            <div className={classes.check}>
              <Form.Check
                type="checkbox"
                label="Drop car off at different location"
                name="Drop off location"
                checked={isChecked}
                onChange={() => {
                  setIsChecked(!isChecked);
                }}
              />
            </div>
          </Col>
        </Row>
      </Form>
      {(carsError.error || cityIdError.error) && (
        <Alert key="danger" variant="danger">
          Couldn't find any car for your request. Check your input and try
          again.
        </Alert>
      )}
    </Container>
  );
};

export default RentalInputForm;
