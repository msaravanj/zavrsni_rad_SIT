import React, { useState } from "react";
import classes from "./RowTableRental.module.css";

import { Row, Col, Image, Toast } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { rentalActions, favoritesActions } from "../store";

const RowTableRental = (props) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.favorites);
  const [showToast, setShowToast] = useState(false);

  return (
    <div className={classes.row}>
      <Row className={classes.align}>
        <Col>
          <Button
            type="button"
            variant="outline-primary"
            onClick={() => {
              dispatch(
                rentalActions.uploadLocation({
                  location: props.pickupLatLon,
                })
              );
              props.showViewMap();
            }}
          >
            Find on map
          </Button>
        </Col>
        <Col>
          <Image src={props.image} alt="Car" rounded={true}></Image>
        </Col>

        <Col xs={5}>
          <p>{props.partner}</p>
          <h4 className={classes.colorBlue}>{props.name}</h4>
          <p>{props.description}</p>
          {props.passengers > 0 && (
            <p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="#000000"
                viewBox="0 0 256 256"
              >
                <path d="M227.46,214c-16.52-28.56-43-48.06-73.68-55.09a68,68,0,1,0-51.56,0c-30.64,7-57.16,26.53-73.68,55.09a4,4,0,0,0,6.92,4C55,184.19,89.62,164,128,164s73,20.19,92.54,54a4,4,0,0,0,3.46,2,3.93,3.93,0,0,0,2-.54A4,4,0,0,0,227.46,214ZM68,96a60,60,0,1,1,60,60A60.07,60.07,0,0,1,68,96Z"></path>
              </svg>
              &nbsp; {props.passengers} passengers
            </p>
          )}
          {props.isAutomatic ? <p>Automatic</p> : <p>Manual</p>}

          <p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="#000000"
              viewBox="0 0 256 256"
            >
              <path d="M128,68a36,36,0,1,0,36,36A36,36,0,0,0,128,68Zm0,64a28,28,0,1,1,28-28A28,28,0,0,1,128,132Zm0-112a84.09,84.09,0,0,0-84,84c0,30.42,14.17,62.79,41,93.62a250,250,0,0,0,40.73,37.66,4,4,0,0,0,4.58,0A250,250,0,0,0,171,197.62c26.81-30.83,41-63.2,41-93.62A84.09,84.09,0,0,0,128,20Zm37.1,172.23A254.62,254.62,0,0,1,128,227a254.62,254.62,0,0,1-37.1-34.81C73.15,171.8,52,139.9,52,104a76,76,0,0,1,152,0C204,139.9,182.85,171.8,165.1,192.23Z"></path>
            </svg>
            &nbsp;
            {props.pickupLocation}
          </p>
          <p>Center distance: {props.centerDistance} km</p>
        </Col>

        <Col>
          {props.isFreeCancellation && (
            <p className={classes.colorGreen}>Free Cancellation</p>
          )}
          <h3 className={classes.colorBlue}>{props.price}€</h3>
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
                      type: "rental",
                      image: props.image,
                      pickDate: props.pickDate,
                      dropDate: props.dropDate,
                      partner: props.partner,
                      name: props.name,
                      description: props.description,
                      passengers: props.passengers,
                      isAutomatic: props.isAutomatic,
                      pickupLocation: props.pickupLocation,
                      centerDistance: props.centerDistance,
                      isFreeCancellation: props.isFreeCancellation,
                      price: props.price,
                    },
                  })
                );
              } else {
                favorites.forEach((obj) => {
                  if (
                    JSON.stringify(obj) ===
                    JSON.stringify({
                      type: "rental",
                      image: props.image,
                      pickDate: props.pickDate,
                      dropDate: props.dropDate,
                      partner: props.partner,
                      name: props.name,
                      description: props.description,
                      passengers: props.passengers,
                      isAutomatic: props.isAutomatic,
                      pickupLocation: props.pickupLocation,
                      centerDistance: props.centerDistance,
                      isFreeCancellation: props.isFreeCancellation,
                      price: props.price,
                    })
                  ) {
                    flag = false;
                  }
                });

                if (flag) {
                  dispatch(
                    favoritesActions.addToFavorites({
                      favorite: {
                        type: "rental",
                        image: props.image,
                        pickDate: props.pickDate,
                        dropDate: props.dropDate,
                        partner: props.partner,
                        name: props.name,
                        description: props.description,
                        passengers: props.passengers,
                        isAutomatic: props.isAutomatic,
                        pickupLocation: props.pickupLocation,
                        centerDistance: props.centerDistance,
                        isFreeCancellation: props.isFreeCancellation,
                        price: props.price,
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

export default RowTableRental;
