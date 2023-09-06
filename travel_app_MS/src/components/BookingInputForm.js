import React, { useCallback } from "react";
import { useState, useRef } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Row,
  Alert,
  Spinner,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { bookingActions } from "../store";
import { useGranularEffect } from "granular-hooks";
import classes from "./BookingInputForm.module.css";

const BookingInputForm = (props) => {
  const [destinationField, setDestinationField] = useState("");
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkIn2, setCheckIn2] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [checkOut2, setCheckOut2] = useState("");
  const [numberAdults, setNumberAdults] = useState(1);
  const [numberChildren, setNumberChildren] = useState(0);
  const [numberRooms, setNumberRooms] = useState(1);
  const [properties, setProperties] = useState([]);
  const [propertiesAirbnb, setPropertiesAirbnb] = useState([]);
  const [destinationAirbnb, setDestinationAirbnb] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [propertiesAirbnbError, setPropertiesAirbnbError] = useState({
    error: false,
  });
  const [destinationAirbnbError, setDestinationAirbnbError] = useState({
    error: false,
  });
  const [destinationError, setDestinationError] = useState({ error: false });
  const [propertiesError, setPropertiesError] = useState({ error: false });

  const [checkInTimestamp, setCheckInTimestamp] = useState(0);
  const [checkOutTimestamp, setCheckOutTimestamp] = useState(0);

  const initialRender = useRef(true);

  const dispatch = useDispatch();

  const urlDest = `https://apidojo-booking-v1.p.rapidapi.com/locations/auto-complete?text=${destinationField}&languagecode=en-us`;
  const optionsDest = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "b1ea854598mshf9e4713004ceb47p17ac51jsna4065fbbf64a",
      "X-RapidAPI-Host": "apidojo-booking-v1.p.rapidapi.com",
    },
  };

  const urlDestAirbnb = `https://airbnb19.p.rapidapi.com/api/v1/searchDestination?query=${destinationField}`;
  const optionsDestAirbnb = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "b1ea854598mshf9e4713004ceb47p17ac51jsna4065fbbf64a",
      "X-RapidAPI-Host": "airbnb19.p.rapidapi.com",
    },
  };

  const fetchDestination = useCallback(async () => {
    const response = await fetch(urlDest, optionsDest);
    const data = await response.json();

    const response1 = await fetch(urlDestAirbnb, optionsDestAirbnb);
    const data1 = await response1.json();

    try {
      setDestination({
        name: data[0].name,
        longitude: data[0].longitude,
        latitude: data[0].latitude,
        id: data[0].dest_id,
        country: data[0].country,
      });

      dispatch(
        bookingActions.uploadLocation({
          location: [data[0].latitude, data[0].longitude],
        })
      );

      setDestinationError({ error: false });
    } catch (err) {
      console.error(err);
      setDestinationError({ error: true });

      try {
        setDestinationAirbnb({
          id: data1.data[0].id,
          name: data1.data[0].location_name,
          country: data1.data[0].countryCode,
        });

        dispatch(
          bookingActions.uploadLocation({
            location: [
              data1.data[0].location.fallbackMapCenter.latitude,
              data1.data[0].location.fallbackMapCenter.longitude,
            ],
          })
        );

        setDestinationAirbnbError({ error: false });
      } catch (err) {
        console.error(err);
        setDestinationAirbnbError({ error: true });
        dispatch(
          bookingActions.uploadLocation({
            location: [],
          })
        );
        dispatch(
          bookingActions.uploadLocationChanged({ isLocationChanged: false })
        );
        props.onShowTable(false);
        setIsLoading(false);
      }
    }
    try {
      setDestinationAirbnb({
        id: data1.data[0].id,
        name: data1.data[0].location_name,
        country: data1.data[0].countryCode,
      });
    } catch (err) {
      console.error(err);
      setDestinationAirbnbError({ error: true });
      setIsLoading(false);
    }
  });

  const urlProperties = `https://apidojo-booking-v1.p.rapidapi.com/properties/list?offset=0&arrival_date=${checkIn}&departure_date=${checkOut}&guest_qty=${numberAdults}&dest_ids=${destination.id}&room_qty=${numberRooms}&search_type=city&children_qty=${numberChildren}&search_id=none&price_filter_currencycode=EUR&order_by=popularity&languagecode=en-us&travel_purpose=leisure`;
  const optionsProperties = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "b1ea854598mshf9e4713004ceb47p17ac51jsna4065fbbf64a",
      "X-RapidAPI-Host": "apidojo-booking-v1.p.rapidapi.com",
    },
  };

  const urlPropertiesAirbnb = `https://airbnb19.p.rapidapi.com/api/v1/searchPropertyByPlace?id=${destinationAirbnb.id}&currency=EUR&adults=${numberAdults}&children=${numberChildren}&checkin=${checkIn}&checkout=${checkOut}&minBedrooms=${numberRooms}`;
  const optionsPropertiesAirbnb = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "b1ea854598mshf9e4713004ceb47p17ac51jsna4065fbbf64a",
      "X-RapidAPI-Host": "airbnb19.p.rapidapi.com",
    },
  };

  const fetchProperties = useCallback(async () => {
    setIsLoading(true);
    const response = await fetch(urlProperties, optionsProperties);
    const data = await response.json();

    const response1 = await fetch(urlPropertiesAirbnb, optionsPropertiesAirbnb);
    const data1 = await response1.json();

    try {
      const apartments = [];
      data.result.forEach((property) => {
        apartments.push({
          id: property.id,
          name: property.hotel_name,
          city: property.city,
          latitude: property.latitude,
          longitude: property.longitude,
          address: property.address_trans,
          review: property.review_score,
          price: property.price_breakdown.gross_price,
          checkout: property.checkout.until,
          checkin: property.checkin.from,
          url: property.url,
          photoUrl: property.main_photo_url,
          reviewWord: property.review_score_word,
          adults: data.room_distribution[0].adults,
          children: data.room_distribution[0].children.length,
          type: "Booking",
          checkin2: checkIn2,
          checkout2: checkOut2,
        });
      });

      let date1 = new Date(checkIn2);
      let date2 = new Date(checkOut2);
      let timeDiff = Math.abs(date2.getTime() - date1.getTime());
      let numberOfNights = Math.ceil(timeDiff / (1000 * 3600 * 24));

      data1.data.forEach((property) => {
        const price = property.price.slice(2);

        apartments.push({
          id: property.id,
          name: property.listingName,
          city: property.city,
          latitude: property.location.fallbackMapCenter.latitude,
          longitude: property.location.fallbackMapCenter.longitude,
          address: property.publicAddress,
          review: property.avgRating * 2,
          price: price * numberOfNights,
          url: "https://hr.airbnb.com/?_set_bev_on_new_domain=1691486087_NzQxMzI3NDdiMWMw",
          reviewWord: null,
          adults: numberAdults,
          children: numberChildren,
          type: "Airbnb",
          checkin2: checkIn2,
          checkout2: checkOut2,
        });
      });

      apartments.sort((a, b) => b.review - a.review);
      setProperties(apartments);
      dispatch(bookingActions.uploadProperties({ properties: apartments }));
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
      props.onShowTable(false);
      setPropertiesError({ error: true });
    }
  });

  useGranularEffect(
    () => {
      if (initialRender.current) {
        initialRender.current = false;

        return;
      } else {
        fetchProperties();

        setTimeout(() => {
          props.onShowTable(true);
          props.onSetViewToMap();
        }, 3000);
        //setPropertiesError({ error: false });
      }
    },
    [destination],
    []
  );

  return (
    <div>
      <Container className={classes.container}>
        <Form>
          <Row className="justify-content-md-center">
            <Col className={classes.gap1} md="auto">
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Destination</Form.Label>
                <Form.Control
                  type="city"
                  className={classes.field}
                  autoFocus
                  onChange={(event) => {
                    setDestinationField(event.target.value);
                  }}
                />
              </Form.Group>
            </Col>
            <Col className={classes.gap1} md="auto">
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Check in</Form.Label>
                <Form.Control
                  className={classes.field}
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(event) => {
                    setCheckIn(event.target.value);
                    setCheckIn2(
                      String(event.target.value).slice(5, 7) +
                        "/" +
                        String(event.target.value).slice(8, 10) +
                        "/" +
                        String(event.target.value).slice(0, 4)
                    );

                    setCheckInTimestamp(new Date(event.target.value).valueOf());
                  }}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col className={classes.gap1} md="auto">
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Check out</Form.Label>
                <Form.Control
                  type="date"
                  className={classes.field}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(event) => {
                    setCheckOut(event.target.value);
                    setCheckOut2(
                      String(event.target.value).slice(5, 7) +
                        "/" +
                        String(event.target.value).slice(8, 10) +
                        "/" +
                        String(event.target.value).slice(0, 4)
                    );
                    setCheckOutTimestamp(
                      new Date(event.target.value).valueOf()
                    );
                  }}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col className={classes.gap1} md="auto">
              <Form.Label>Adults</Form.Label>
              <Form.Select
                className={classes.field}
                aria-label="Default select example"
                onChange={(event) => {
                  setNumberAdults(event.target.value);
                }}
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
                <option value={9}>9</option>
                <option value={10}>10</option>
                <option value={11}>11</option>
                <option value={12}>12</option>
                <option value={13}>13</option>
                <option value={14}>14</option>
                <option value={15}>15</option>
                <option value={16}>16</option>
                <option value={17}>17</option>
                <option value={18}>18</option>
                <option value={19}>19</option>
                <option value={20}>20</option>
                <option value={21}>21</option>
                <option value={22}>22</option>
                <option value={23}>23</option>
                <option value={24}>24</option>
                <option value={25}>25</option>
                <option value={26}>26</option>
                <option value={27}>27</option>
                <option value={28}>28</option>
                <option value={29}>29</option>
                <option value={30}>30</option>
              </Form.Select>
            </Col>
            <Col className={classes.gap1} md="auto">
              <Form.Label>Children</Form.Label>
              <Form.Select
                className={classes.field}
                aria-label="Default select example"
                onChange={(event) => {
                  setNumberChildren(event.target.value);
                }}
              >
                <option value={0}>0</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
                <option value={9}>9</option>
                <option value={10}>10</option>
              </Form.Select>
            </Col>
            <Col className={classes.gap1} md="auto">
              <Form.Label>Rooms</Form.Label>
              <Form.Select
                className={classes.field}
                aria-label="Default select example"
                onChange={(event) => {
                  setNumberRooms(event.target.value);
                }}
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
                <option value={9}>9</option>
                <option value={10}>10</option>
                <option value={11}>11</option>
                <option value={12}>12</option>
              </Form.Select>
            </Col>
            <Col className={classes.gap1} md="auto">
              <Button
                type="button"
                disabled={
                  destinationField === "" ||
                  checkIn === "" ||
                  checkOut === "" ||
                  checkIn === checkOut ||
                  checkInTimestamp > checkOutTimestamp
                }
                onClick={() => {
                  // fetchDestinationAirbnb();
                  setIsLoading(true);
                  fetchDestination();
                }}
              >
                Search
              </Button>
            </Col>
            <div className={classes.spinner}>
              {isLoading && <Spinner animation="border" variant="primary" />}
            </div>
          </Row>
        </Form>
      </Container>
      {destinationError.error && destinationAirbnbError.error && (
        <Alert key="danger" variant="danger">
          Couldn't find destination that you searched for. Please try again.
        </Alert>
      )}
      {propertiesError.error &&
        !destinationError.error &&
        !destinationAirbnbError.error && (
          <Alert key="danger" variant="danger">
            No results.
          </Alert>
        )}
    </div>
  );
};

export default BookingInputForm;
