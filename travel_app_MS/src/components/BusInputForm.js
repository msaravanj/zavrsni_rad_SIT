import classes from "./BusInputForm.module.css";
import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useGranularEffect } from "granular-hooks";

import {
  fromLocationActions,
  toLocationActions,
  tripsActions,
} from "../store/index";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Row,
  Col,
  Container,
  Button,
  Form,
  Alert,
  Spinner,
} from "react-bootstrap";

const BusInputForm = (props) => {
  const todaysDate = () => {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    const today = year + "-" + month + "-" + day;

    return today;
  };

  const dispatch = useDispatch();
  const [cityNameFrom, setCityNameFrom] = useState("");
  const [cityNameTo, setCityNameTo] = useState("");
  const [tripDate, setTripDate] = useState(todaysDate());
  const [cityIdFrom, setCityIdFrom] = useState();
  const [cityIdTo, setCityIdTo] = useState();
  const [isFindFinished, setIsFindFinished] = useState(false);
  const [searchClicked, setSearchClicked] = useState(1);
  const [effectFinished, setEffectFinished] = useState(1);

  const [formIsTouched, setFormIsTouched] = useState(false);

  const [fromCityError, setFromCityError] = useState({ error: false });
  const [toCityError, setToCityError] = useState({ error: false });
  const [flixTripsError, setFlixTripsError] = useState({ error: false });
  const [autocompleteFromError, setAutocompleteFromError] = useState({
    error: false,
  });
  const [autocompleteToError, setAutocompleteToError] = useState({
    error: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  const initialRender = useRef(true);
  const initialRender1 = useRef(true);

  const { onShowTable } = props;
  const fromCityIsValid = cityNameFrom.trim() !== "";
  const toCityIsValid = cityNameTo.trim() !== "";

  const urlGeo =
    "https://address-from-to-latitude-longitude.p.rapidapi.com/geolocationapi?address=";
  const optionsGeo = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "b1ea854598mshf9e4713004ceb47p17ac51jsna4065fbbf64a",
      "X-RapidAPI-Host": "address-from-to-latitude-longitude.p.rapidapi.com",
    },
  };

  const fetchFromLocationHandler = (cityName) => {
    fetch(urlGeo + cityName, optionsGeo)
      .then((response) => response.json())
      .then((data) => {
        const lon = data.Results[0].longitude;
        const lat = data.Results[0].latitude;
        dispatch(fromLocationActions.uploadLocation({ location: [lat, lon] }));

        setFromCityError({ error: false });
      })
      .catch((err) => {
        console.error(err);
        dispatch(tripsActions.uploadTrips({ trips: [] }));
        dispatch(
          fromLocationActions.uploadLocationChanged({ isFromChanged: false })
        );

        setFromCityError({ error: true });
      });
  };

  const fetchToLocationHandler = (cityName) => {
    fetch(urlGeo + cityName, optionsGeo)
      .then((response) => response.json())
      .then((data) => {
        const lon = data.Results[0].longitude;
        const lat = data.Results[0].latitude;
        dispatch(toLocationActions.uploadLocation({ location: [lat, lon] }));

        setToCityError({ error: false });
      })
      .catch((err) => {
        console.error(err);
        dispatch(tripsActions.uploadTrips({ trips: [] }));
        dispatch(
          toLocationActions.uploadLocationChanged({ isToChanged: false })
        );

        setToCityError({ error: true });
      });
  };

  const optionsAutocomplete = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "b1ea854598mshf9e4713004ceb47p17ac51jsna4065fbbf64a",
      "X-RapidAPI-Host": "flixbus2.p.rapidapi.com",
    },
  };

  const fetchAutocompleteFromCity = (cityName) => {
    fetch(
      `https://flixbus2.p.rapidapi.com/autocomplete?query=${cityName}`,
      optionsAutocomplete
    )
      .then((response) => response.json())
      .then((data) => {
        const city_id = data[0].city.legacy_id;

        setCityIdFrom(city_id);

        setAutocompleteFromError({ error: false });
      })
      .catch((err) => {
        console.error(err);
        props.onShowTable(false);
        dispatch(tripsActions.uploadTrips({ trips: [] }));
        dispatch(
          fromLocationActions.uploadLocationChanged({ isFromChanged: false })
        );
        setAutocompleteFromError({ error: true });
      });
  };

  const fetchAutocompleteToCity = (cityName) => {
    fetch(
      `https://flixbus2.p.rapidapi.com/autocomplete?query=${cityName}`,
      optionsAutocomplete
    )
      .then((response) => response.json())
      .then((data) => {
        const city_id = data[0].city.legacy_id;
        setCityIdTo(city_id);

        setAutocompleteToError({ error: false });
      })
      .catch((err) => {
        console.error(err);
        setAutocompleteToError({ error: true });
        dispatch(tripsActions.uploadTrips({ trips: [] }));
        dispatch(
          toLocationActions.uploadLocationChanged({ isToChanged: false })
        );

        props.onShowTable(false);
      });
  };

  const optionsSearchTrips = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "b1ea854598mshf9e4713004ceb47p17ac51jsna4065fbbf64a",
      "X-RapidAPI-Host": "flixbus.p.rapidapi.com",
    },
  };

  const searchFlixTrips = () => {
    fetch(
      `https://flixbus.p.rapidapi.com/v1/search-trips?to_id=${cityIdTo}&from_id=${cityIdFrom}&currency=EUR&departure_date=${tripDate}&number_adult=1&search_by=cities`,
      optionsSearchTrips
    )
      .then((response) => response.json())
      .then((data) => {
        let num = 0;
        const trips = data[0].items;
        const arr1 = [];
        for (const el of trips) {
          const from = data[0].from.name;
          const to = data[0].to.name;
          const departure = el.departure.timestamp;
          const arrival = el.arrival.timestamp;
          const duration = el.duration.hour + ":" + el.duration.minutes;
          const price = el.price_total_sum;
          num = num + 1;
          const id = num;
          arr1.push({
            id: id,
            date: tripDate,
            from: from,
            to: to,
            departure: departure,
            arrival: arrival,
            duration: duration,
            price: price,
          });
        }
        dispatch(tripsActions.uploadTrips({ trips: arr1 }));
        setFlixTripsError({ error: false });
        onShowTable(true);
      })
      .catch((err) => {
        console.error(err);
        dispatch(tripsActions.uploadTrips({ trips: [] }));
        setFlixTripsError({ error: true });
        onShowTable(false);
      });
  };

  const findBtnActionHandler = () => {
    try {
      setIsLoading(true);
      setFormIsTouched(true);
      setFlixTripsError({ error: false });
      fetchFromLocationHandler(cityNameFrom);
      fetchToLocationHandler(cityNameTo);
      setTimeout(() => {
        setSearchClicked(searchClicked + 1);
      }, 1300);
      setIsLoading(false);
    } catch {
      console.log("Something went wrong!");
      setIsLoading(false);
    }
  };

  const showBtnActionHandler = () => {
    try {
      setIsLoading(true);
      searchFlixTrips();
      props.onShowTable(true);
      setTimeout(() => {
        props.onSetViewToTable(true);
      }, 200);

      setIsFindFinished(false);
      setIsLoading(false);
    } catch {
      console.log("Something went wrong!");
      setIsLoading(false);
    }
  };

  useGranularEffect(
    () => {
      if (initialRender.current) {
        initialRender.current = false;
        return;
      } else {
        if (fromCityError.error === true || toCityError.error === true) {
          onShowTable(false);
          return;
        } else {
          setIsLoading(true);
          fetchAutocompleteFromCity(cityNameFrom);
          fetchAutocompleteToCity(cityNameTo);
          props.onSetViewToMap(true);
          setTimeout(() => {
            setEffectFinished(effectFinished + 1);
          }, 500);
          setIsLoading(false);
        }
      }
    },
    [searchClicked],
    [
      cityNameFrom,
      cityNameTo,
      fetchAutocompleteFromCity,
      fetchAutocompleteToCity,
      fromCityError.error,
      toCityError.error,
    ]
  );

  useGranularEffect(
    () => {
      if (initialRender1.current) {
        initialRender1.current = false;
        return;
      } else {
        if (
          autocompleteToError.error === true ||
          autocompleteFromError.error === true
        ) {
          return;
        } else {
          setIsLoading(true);
          onShowTable(false);
          props.onSetViewToMap(true);

          setTimeout(() => {
            setIsFindFinished(true);
          }, 1000);
          setIsLoading(false);
        }
      }
    },
    [effectFinished],
    [onShowTable, autocompleteFromError.error, autocompleteToError.error]
  );

  return (
    <Container className={classes.inputForm}>
      <Form className={classes.form_1}>
        <div className={classes.grid}>
          <div className={classes.centralized}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Travel from</Form.Label>
              <Form.Control
                type="city"
                //  placeholder="From: city"
                className={classes.datePicker}
                autoFocus
                onChange={(event) => {
                  setCityNameFrom(event.target.value);
                }}
              />

              {!fromCityIsValid && formIsTouched && (
                <p className={classes.form_text1}>
                  Please provide a valid city name.
                </p>
              )}
            </Form.Group>
          </div>
          <div className={classes.centralized}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Travel to</Form.Label>
              <Form.Control
                type="city"
                className={classes.datePicker}
                //  placeholder="To: city"
                onChange={(event) => {
                  setCityNameTo(event.target.value);
                }}
              />
              {!toCityIsValid && formIsTouched && (
                <p className={classes.form_text1}>
                  Please provide a valid city name.
                </p>
              )}
            </Form.Group>
          </div>
          <div className={classes.centralized}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Choose date</Form.Label>
              <Form.Control
                type="date"
                defaultValue={todaysDate.toString}
                className={classes.datePicker}
                min={new Date().toISOString().split("T")[0]}
                onChange={(event) => {
                  setTripDate(event.target.value);
                }}
              ></Form.Control>
            </Form.Group>
          </div>
        </div>
        <div className={classes.row2}>
          <Row className={classes.btns}>
            <Col xs lg="1">
              <Button
                type="button"
                disabled={cityNameFrom.length === 0 || cityNameTo.length === 0}
                onClick={findBtnActionHandler}
              >
                Search
              </Button>
            </Col>
            <Col xs lg="1">
              <Button
                variant="success"
                type="button"
                disabled={
                  !isFindFinished ||
                  toCityError.error ||
                  fromCityError.error ||
                  autocompleteFromError.error ||
                  autocompleteToError.error
                }
                onClick={showBtnActionHandler}
              >
                Show trips
              </Button>
            </Col>
            <div className={classes.spinner}>
              {isLoading && <Spinner animation="border" variant="primary" />}
            </div>
          </Row>
        </div>
      </Form>
      {fromCityError.error && (
        <Alert key="danger1" variant="danger">
          Couldn't find city from "Travel from" field. Check your input and try
          again.
        </Alert>
      )}
      {toCityError.error && (
        <Alert key="danger2" variant="danger">
          Could't find city from "Travel to" field. Check your input and try
          again.
        </Alert>
      )}
      {autocompleteFromError.error && (
        <Alert key="danger3" variant="danger">
          Couldn't find any Flixbus route for city from "Travel from" field.
          Check your input and try again
        </Alert>
      )}
      {autocompleteToError.error && (
        <Alert key="danger4" variant="danger">
          Couldn't find any Flixbus route for city from "Travel to" field. Check
          your input and try again
        </Alert>
      )}
      {flixTripsError.error && (
        <Alert key="warning" variant="warning">
          Couldn't find any bus line that matches your request.
        </Alert>
      )}
    </Container>
  );
};

export default BusInputForm;
