import React, { useState } from "react";
import styles from "./Table.module.css";
import classes from "./RowTableBooking.module.css";
import { Button, Toast } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { favoritesActions } from "../store";

const RowTable = (props) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.favorites);
  const [showToast, setShowToast] = useState(false);

  let arrDate = new Date(props.arrival * 1000);
  let arrival;
  if (arrDate.getMinutes() <= 9 && arrDate.getHours() <= 9) {
    arrival = "0" + arrDate.getHours() + ":" + arrDate.getMinutes() + "0";
  } else {
    if (arrDate.getMinutes() <= 9) {
      arrival = arrDate.getHours() + ":" + arrDate.getMinutes() + "0";
    } else {
      if (arrDate.getHours() <= 9) {
        arrival = "0" + arrDate.getHours() + ":" + arrDate.getMinutes();
      } else {
        arrival = arrDate.getHours() + ":" + arrDate.getMinutes();
      }
    }
  }

  let depDate = new Date(props.departure * 1000);
  let departure;
  if (depDate.getMinutes() <= 9 && depDate.getHours() <= 9) {
    departure = "0" + depDate.getHours() + ":" + depDate.getMinutes() + "0";
  } else {
    if (depDate.getMinutes() <= 9) {
      departure = depDate.getHours() + ":" + depDate.getMinutes() + "0";
    } else {
      if (depDate.getHours() <= 9) {
        departure = "0" + depDate.getHours() + ":" + depDate.getMinutes();
      } else {
        departure = depDate.getHours() + ":" + depDate.getMinutes();
      }
    }
  }

  let price;
  if (props.price.toString().length === 1) {
    price = "0" + props.price + ".00";
  } else {
    if (props.price.toString().length === 2) {
      price = props.price + ".00";
    } else {
      if (props.price.toString().length === 4) {
        price = "0" + props.price;
      } else {
        if (props.price.toString().length === 3) {
          price = "0" + props.price + "0";
        } else {
          price = props.price;
        }
      }
    }
  }

  return (
    <div className={styles.row}>
      <div className={styles.column_text}>
        <span>{props.date}</span>
      </div>
      <div className={styles.column_text}>
        <span>{departure}h</span>
        <span>{props.from}</span>
      </div>
      <div className={styles.column_text}>
        <span>Duration</span>
        <span>{props.duration}h</span>
      </div>
      <div className={styles.column_text}>
        <span>{arrival}h</span>
        <span>{props.to}</span>
      </div>
      <div className={styles.column_text}>
        <span>Operator</span>
        <span>FlixBus</span>
      </div>
      <div className={styles.column_text}>
        <span>Price</span>
        <span>{price} €</span>
      </div>
      <div className="add_button">
        <Button
          type="button"
          onClick={() => {
            let flag = true;
            if (favorites.length === 0) {
              dispatch(
                favoritesActions.addToFavorites({
                  favorite: {
                    type: "bus",
                    date: props.date,
                    departure: departure,
                    arrival: arrival,
                    from: props.from,
                    to: props.to,
                    duration: props.duration,
                    price: price,
                    operator: "FlixBus",
                  },
                })
              );
            } else {
              favorites.forEach((obj) => {
                if (
                  JSON.stringify(obj) ===
                  JSON.stringify({
                    type: "bus",
                    date: props.date,
                    departure: departure,
                    arrival: arrival,
                    from: props.from,
                    to: props.to,
                    duration: props.duration,
                    price: price,
                    operator: "FlixBus",
                  })
                ) {
                  flag = false;
                }
              });

              if (flag) {
                dispatch(
                  favoritesActions.addToFavorites({
                    favorite: {
                      type: "bus",
                      date: props.date,
                      departure: departure,
                      arrival: arrival,
                      from: props.from,
                      to: props.to,
                      duration: props.duration,
                      price: price,
                      operator: "FlixBus",
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
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-heart"
            viewBox="0 0 16 16"
          >
            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
          </svg>
        </Button>
      </div>
      <div className={styles.toast}>
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
          <Toast.Body className={styles.textBody}>
            Added to Favorites!
          </Toast.Body>
        </Toast>
      </div>
    </div>
  );
};

export default RowTable;
