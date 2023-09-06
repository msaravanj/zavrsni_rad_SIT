import React, { useState } from "react";
import classes from "./RowTableBooking.module.css";
import { Row, Col } from "react-bootstrap";
import { Button, Badge, Toast } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { favoritesActions } from "../store";
import { bookingActions } from "../store";

const RowTableBooking = (props) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.favorites);
  const [showToast, setShowToast] = useState(false);

  let numNights;
  let date1 = new Date(props.checkin2);
  let date2 = new Date(props.checkout2);
  let timeDiff = Math.abs(date2.getTime() - date1.getTime());

  numNights = Math.ceil(timeDiff / (1000 * 3600 * 24));

  return (
    <div className={classes.row}>
      <Row className={classes.align}>
        <Col>
          <Button
            type="button"
            variant="outline-primary"
            onClick={() => {
              dispatch(
                bookingActions.uploadLocation({
                  location: [props.latitude, props.longitude],
                })
              );
              props.showViewMap();
            }}
          >
            Find on map
          </Button>
          {props.type === "Airbnb" ? (
            <div className={classes.location}>
              <p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-info-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                </svg>
                &nbsp; Not exact location
              </p>
            </div>
          ) : (
            <p></p>
          )}
        </Col>

        <Col xs={5}>
          <h4 className={classes.colorBlue}>{props.name}</h4>
          <p>{props.city}</p>
          <p>{props.address}</p>
          <a href={props.url} target="_blank">
            {props.type}
          </a>
        </Col>

        <Col>
          <p>Adults: {props.adults}</p>
          <p>Children: {props.children}</p>
          <p>-------------</p>
          <h3 className={classes.colorBlue}>{props.price} €</h3>
          {numNights === 1 ? (
            <p>{numNights} night</p>
          ) : (
            <p>{numNights} nights</p>
          )}
        </Col>

        <Col>
          <h3 className={classes.colorBlue}>{props.reviewWord}</h3>
          <h1>
            <Badge bg="primary">{props.review}</Badge>
          </h1>
          {props.review === null && (
            <h3>
              <Badge bg="warning" text="dark">
                New
              </Badge>
            </h3>
          )}
        </Col>

        <Col>
          <Button
            size="sm"
            onClick={() => {
              let flag = true;
              if (favorites.length === 0) {
                dispatch(
                  favoritesActions.addToFavorites({
                    favorite: {
                      type: "rooms",
                      name: props.name,
                      city: props.city,
                      address: props.address,
                      url: props.url,
                      adults: props.adults,
                      children: props.children,
                      price: props.price,
                      reviewWord: props.reviewWord,
                      review: props.review,
                      nights: numNights,
                    },
                  })
                );
              } else {
                favorites.forEach((obj) => {
                  if (
                    JSON.stringify(obj) ===
                    JSON.stringify({
                      type: "rooms",
                      name: props.name,
                      city: props.city,
                      address: props.address,
                      url: props.url,
                      adults: props.adults,
                      children: props.children,
                      price: props.price,
                      reviewWord: props.reviewWord,
                      review: props.review,
                      nights: numNights,
                    })
                  ) {
                    flag = false;
                  }
                });

                if (flag) {
                  dispatch(
                    favoritesActions.addToFavorites({
                      favorite: {
                        type: "rooms",
                        name: props.name,
                        city: props.city,
                        address: props.address,
                        url: props.url,
                        adults: props.adults,
                        children: props.children,
                        price: props.price,
                        reviewWord: props.reviewWord,
                        review: props.review,
                        nights: numNights,
                      },
                    })
                  );
                }
              }
              setShowToast(true);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              fill="currentColor"
              className="bi bi-heart"
              viewBox="0 0 16 16"
            >
              <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
            </svg>
          </Button>
        </Col>
      </Row>
      <div className={classes.toast}>
        <Toast
          bg="success"
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">Message</strong>
            <small>just now</small>
          </Toast.Header>
          <Toast.Body className={classes.textBody}>
            Added to Favorites!
          </Toast.Body>
        </Toast>
      </div>
    </div>
  );
};

export default RowTableBooking;
