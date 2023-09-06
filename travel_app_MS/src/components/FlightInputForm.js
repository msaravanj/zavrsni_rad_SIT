import classes from "./FlightInputForm.module.css";
import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Alert } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Container, Button, Form, Spinner } from "react-bootstrap";
import SelectAirportFromModal from "./SelectAirportFromModal";
import SelectAirportToModal from "./SelectAirportToModal";
import { flightsActions } from "../store";

const FlightInputForm = (props) => {
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
  const [airportsFrom, setAirportsFrom] = useState([]);
  const [airportsTo, setAirportsTo] = useState([]);
  const [isFindFinished, setIsFindFinished] = useState(false);
  const [searchClicked, setSearchClicked] = useState(1);
  const [effectFinished, setEffectFinished] = useState(1);
  const [selectedFromCity, setSelectedFromCity] = useState("");
  const [selectedToCity, setSelectedToCity] = useState("");
  const [isFlightsEmpty, setIsFlightsEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const selectFromCity = (city) => {
    setSelectedFromCity(city);
  };

  const selectToCity = (city) => {
    setSelectedToCity(city);
  };

  const [isFromCitySelected, setIsFromCitySelected] = useState(false);
  const [isToCitySelected, setIsToCitySelected] = useState(false);
  const selectFromModalRef = useRef();
  const selectToModalRef = useRef();

  const settingFromCitySelected = (bool) => {
    setIsFromCitySelected(bool);
  };

  const settingToCitySelected = (bool) => {
    setIsToCitySelected(bool);
  };

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [flights, setFlights] = useState(null);
  const [flightsError, setFlightsError] = useState({ error: false });

  const [formIsTouched, setFormIsTouched] = useState(false);

  const [fromCityError, setFromCityError] = useState({ error: false });
  const [toCityError, setToCityError] = useState({ error: false });
  const [flixTripsError, setFlixTripsError] = useState({ error: false });
  const [fetchAirportsFromError, setFetchAirportsFromError] = useState({
    error: false,
  });
  const [fetchAirportsToError, setFetchAirportsToError] = useState({
    error: false,
  });

  const initialRender = useRef(true);
  const initialRender1 = useRef(true);

  const { onShowTable } = props;
  const fromCityIsValid = cityNameFrom.trim() !== "";
  const toCityIsValid = cityNameTo.trim() !== "";

  const fetchAirportsOptions = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "b1ea854598mshf9e4713004ceb47p17ac51jsna4065fbbf64a",
      "X-RapidAPI-Host": "aerodatabox.p.rapidapi.com",
    },
  };

  const fetchAirportsFromCity = (cityName) => {
    fetch(
      `https://aerodatabox.p.rapidapi.com/airports/search/term?q=${cityName}&limit=6`,
      fetchAirportsOptions
    )
      .then((response) => response.json())
      .then((data) => {
        const airports = [];
        data.items.forEach((element) => {
          airports.push({
            iata: element.iata,
            name: element.name,
            location: { lat: element.location.lat, lon: element.location.lon },
          });
        });

        setAirportsFrom(airports);
        setFetchAirportsFromError({ error: false });
        selectFromModalRef.current.handleShow();
      })
      .catch((err) => {
        console.error(err);
        setFetchAirportsFromError({ error: true });
      });
  };

  const flightUrl = `https://aerodatabox.p.rapidapi.com/flights/airports/iata/${selectedFromCity.iata}/${startDate}T${startTime}/${endDate}T${endTime}?withLeg=true&withCancelled=true&withCodeshared=true&withCargo=true&withPrivate=true&withLocation=false`;
  const flightOptions = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "b1ea854598mshf9e4713004ceb47p17ac51jsna4065fbbf64a",
      "X-RapidAPI-Host": "aerodatabox.p.rapidapi.com",
    },
  };

  const fetchFlights = () => {
    setIsLoading(true);
    fetch(flightUrl, flightOptions)
      .then((response) => response.json())
      .then((data) => {
        const flights1 = [];
        if (data.departures.length > 0) {
          data.departures.forEach((dep) => {
            if (dep.arrival.airport.iata === selectedToCity.iata) {
              flights1.push({
                airportFrom: selectedFromCity,
                airportTo: selectedToCity,
                departureDate: dep.departure.scheduledTimeLocal.split(" ")[0],
                departureTime: dep.departure.scheduledTimeLocal
                  .split(" ")[1]
                  .split("+")[0],
                arrivalDate: dep.arrival.scheduledTimeLocal.split(" ")[0],
                arrivalTime: dep.arrival.scheduledTimeLocal
                  .split(" ")[1]
                  .split("+")[0],
                number: dep.number,
                model: dep.aircraft.model,
                airline: dep.airline.name,
              });
            }
            if (flights1.length === 0) {
              setIsFlightsEmpty(true);
              setFlightsError({ error: false });
            } else {
              setIsFlightsEmpty(false);
              setFlights(flights1);
              setFlightsError({ error: false });

              setIsFindFinished(true);
            }
          });
        } else {
          setIsFlightsEmpty(true);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
        setIsFindFinished(false);
        setIsFlightsEmpty(false);
        setFlightsError({ error: true });
      });
  };

  const fetchAirportsToCity = (cityName) => {
    fetch(
      `https://aerodatabox.p.rapidapi.com/airports/search/term?q=${cityName}&limit=6`,
      fetchAirportsOptions
    )
      .then((response) => response.json())
      .then((data) => {
        const airports = [];
        data.items.forEach((element) => {
          airports.push({
            iata: element.iata,
            name: element.name,
            location: { lat: element.location.lat, lon: element.location.lon },
          });
        });

        setAirportsTo(airports);
        setFetchAirportsToError({ error: false });
        selectToModalRef.current.handleShow();
      })
      .catch((err) => {
        console.error(err);
        setFetchAirportsToError({ error: true });
      });
  };

  return (
    <Container className={classes.inputForm}>
      <SelectAirportFromModal
        settingCitySelected={settingFromCitySelected}
        selectedcity={selectedFromCity}
        setSelectedCity={selectFromCity}
        airports={airportsFrom}
        ref={selectFromModalRef}
      />
      <SelectAirportToModal
        settingCitySelected={settingToCitySelected}
        selectedcity={selectedToCity}
        setSelectedCity={selectToCity}
        airports={airportsTo}
        ref={selectToModalRef}
      />
      <Form className={classes.form_1}>
        <div className={classes.grid}>
          <div className={classes.centralized}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Travel from</Form.Label>
              <Form.Control
                type="city"
                autoFocus
                className={classes.inputField}
                onChange={(event) => {
                  setCityNameFrom(event.target.value);
                }}
              />
              {fetchAirportsFromError.error === true && (
                <Form.Text className={classes.airportSelected}>
                  Couldn't find any airport. Please try again.
                </Form.Text>
              )}
              {isFromCitySelected && (
                <div className={classes.citySelected} muted>
                  {selectedFromCity.iata} | {selectedFromCity.name}
                </div>
              )}

              <div className={classes.btnChoose}>
                <Button
                  size="sm"
                  type="button"
                  onClick={() => {
                    fetchAirportsFromCity(cityNameFrom);
                  }}
                  disabled={cityNameFrom === ""}
                >
                  Choose airport
                </Button>
              </div>
            </Form.Group>
          </div>
          <div className={classes.centralized}>
            <Form.Group>
              <Form.Label>Travel to</Form.Label>
              <Form.Control
                type="city"
                className={classes.inputField}
                onChange={(event) => {
                  setCityNameTo(event.target.value);
                }}
              />
              {!toCityIsValid && formIsTouched && (
                <p className={classes.form_text1}>
                  Please provide a valid city name.
                </p>
              )}
              {fetchAirportsToError.error === true && (
                <Form.Text className={classes.airportSelected}>
                  Couldn't find any airport. Please try again.
                </Form.Text>
              )}
              {isToCitySelected && (
                <div className={classes.citySelected} muted>
                  {selectedToCity.iata} | {selectedToCity.name}
                </div>
              )}

              <div className={classes.btnChoose}>
                <Button
                  size="sm"
                  type="button"
                  onClick={() => {
                    fetchAirportsToCity(cityNameTo);
                  }}
                  disabled={cityNameTo === ""}
                >
                  Choose airport
                </Button>
              </div>
            </Form.Group>
          </div>
          <div className={classes.centralized}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Start of date range</Form.Label>
              <Form.Control
                type="date"
                className={classes.inputField}
                min={new Date().toISOString().split("T")[0]}
                defaultValue={todaysDate.toString}
                onChange={(event) => {
                  setStartDate(event.target.value);
                }}
              ></Form.Control>
              <Form.Select
                className={classes.inputField}
                aria-label="Default select example"
                onChange={(event) => {
                  setStartTime(event.target.value);
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
          </div>

          <div className={classes.centralized}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>End of date range</Form.Label>
              <Form.Control
                className={classes.inputField}
                min={new Date().toISOString().split("T")[0]}
                type="date"
                defaultValue={todaysDate.toString}
                onChange={(event) => {
                  setEndDate(event.target.value);
                }}
              ></Form.Control>
              <Form.Select
                className={classes.inputField}
                aria-label="Default select example"
                onChange={(event) => {
                  setEndTime(event.target.value);
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
          </div>
          <div className={`${classes.btns} ${classes.btn1}`} xs lg="1">
            <Button
              type="button"
              disabled={
                selectedFromCity === "" ||
                selectedToCity === "" ||
                startDate === "" ||
                endDate === "" ||
                startTime === "" ||
                endTime === ""
              }
              onClick={() => {
                setIsLoading(true);
                fetchFlights();
                setIsLoading(false);
              }}
            >
              Search
            </Button>
          </div>
          <div className={`${classes.btns} ${classes.btn2}`} xs lg="1">
            <Button
              variant="success"
              type="button"
              disabled={!isFindFinished}
              onClick={() => {
                try {
                  setIsLoading(true);
                  dispatch(flightsActions.uploadFlights({ flights: flights }));

                  setIsFindFinished(false);
                  props.showTable(true);
                  setTimeout(() => {
                    props.onSetViewToTable(true);
                  }, 200);
                  setIsLoading(false);
                } catch (err) {
                  console.error(err);
                  props.showTable(false);
                  setIsLoading(false);
                }
              }}
            >
              Show flights
            </Button>
          </div>
          <div className={classes.spinner}>
            {isLoading && <Spinner animation="border" variant="primary" />}
          </div>
        </div>
      </Form>
      {flightsError.error && (
        <Alert key="danger1" variant="danger">
          Please try again. Note: The duration of the requested period of time
          must be positive and must not be more than 12 hours in duration.
        </Alert>
      )}

      {isFlightsEmpty && (
        <Alert key="warning" variant="warning">
          Couldn't find any flight that matches your request. Please try again.
        </Alert>
      )}
    </Container>
  );
};

export default FlightInputForm;
