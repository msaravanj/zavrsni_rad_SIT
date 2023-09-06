import { useSelector, useDispatch } from "react-redux";
import { Button, Tab, Tabs, Badge, Col, Row, Image } from "react-bootstrap";
import classes from "./Favorites.module.css";
import styles from "../components/Table.module.css";
import classesB from "../components/RowTableBooking.module.css";
import classesR from "../components/RowTableRental.module.css";
import { favoritesActions } from "../store";
import { useState } from "react";
import { Modal } from "react-bootstrap";

const Favorites = () => {
  const favorites = useSelector((state) => state.favorites.favorites);
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);

  return (
    <div className={classes.favorites}>
      <div>
        <h2>YOUR FAVORITES LIST</h2>
        <h4>Check list of your saved offers.</h4>
      </div>
      <div className={classes.tabs}>
        <Tabs defaultActiveKey="profile" id="12345" className="mb-3" justify>
          <Tab eventKey="flights" title="Flights">
            <div className={styles.tableFav}>
              {favorites.filter((obj) => {
                return obj.type === "flight";
              }).length === 0 ? (
                <p>Flights list is empty.</p>
              ) : (
                favorites
                  .filter((obj) => {
                    return obj.type === "flight";
                  })
                  .map((el) => {
                    return (
                      <div className={styles.row1}>
                        <div className={styles.column_text}>
                          <span>{el.depDate}</span>
                        </div>
                        <div className={styles.column_text}>
                          <span>{el.depTime}h</span>
                          <span>
                            {el.airportFrom.iata} | {el.airportFrom.name}
                          </span>
                        </div>
                        <div className={styles.column_text}>
                          <span>{el.arrivalTime}h</span>
                          <span>
                            {el.airportTo.iata} | {el.airportTo.name}
                          </span>
                        </div>
                        <div className={styles.column_text}>
                          <span>Flight number:</span>
                          <span>{el.number}</span>
                        </div>
                        <div className={styles.column_text}>
                          <span>Operator:</span>
                          <span>{el.operator}</span>
                        </div>
                        <div className={styles.btnRmv}>
                          <Button
                            type="button"
                            variant="danger"
                            onClick={() => {
                              const indx = favorites.indexOf(el);
                              console.log(indx);
                              dispatch(
                                favoritesActions.removeFromFavorites({
                                  index: indx,
                                })
                              );
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="26"
                              height="26"
                              fill="currentColor"
                              class="bi bi-trash"
                              viewBox="0 0 16 16"
                            >
                              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                            </svg>
                          </Button>
                        </div>
                      </div>
                    );
                  })
              )}
            </div>
          </Tab>
          <Tab eventKey="bus" title="Bus">
            <div className={styles.tableFav}>
              {favorites.filter((obj) => {
                return obj.type === "bus";
              }).length === 0 ? (
                <p>Bus list is empty.</p>
              ) : (
                favorites
                  .filter((obj) => {
                    return obj.type === "bus";
                  })
                  .map((el) => {
                    return (
                      <div className={styles.row2}>
                        <div className={styles.column_text}>
                          <span>{el.date}</span>
                        </div>
                        <div className={styles.column_text}>
                          <span>{el.departure}h</span>
                          <span>{el.from}</span>
                        </div>
                        <div className={styles.column_text}>
                          <span>Duration</span>
                          <span>{el.duration}h</span>
                        </div>
                        <div className={styles.column_text}>
                          <span>{el.arrival}h</span>
                          <span>{el.to}</span>
                        </div>
                        <div className={styles.column_text}>
                          <span>Operator</span>
                          <span>{el.operator}</span>
                        </div>
                        <div className={styles.column_text}>
                          <span>Price</span>
                          <span>{el.price} €</span>
                        </div>
                        <div className={styles.btnRmv}>
                          <Button
                            type="button"
                            variant="danger"
                            onClick={() => {
                              const indx = favorites.indexOf(el);
                              console.log(indx);
                              dispatch(
                                favoritesActions.removeFromFavorites({
                                  index: indx,
                                })
                              );
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="26"
                              height="26"
                              fill="currentColor"
                              class="bi bi-trash"
                              viewBox="0 0 16 16"
                            >
                              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                            </svg>
                          </Button>
                        </div>
                      </div>
                    );
                  })
              )}
            </div>
          </Tab>
          <Tab eventKey="rooms" title="Rooms">
            <div className={styles.tableFav}>
              {favorites.filter((obj) => {
                return obj.type === "rooms";
              }).length === 0 ? (
                <p>Rooms list is empty.</p>
              ) : (
                favorites
                  .filter((obj) => {
                    return obj.type === "rooms";
                  })
                  .map((el) => {
                    return (
                      <div className={classesB.row}>
                        <Row className={classesB.align}>
                          <Col xs={5}>
                            <h4 className={classesB.colorBlue}>{el.name}</h4>
                            <p>{el.city}</p>
                            <p>{el.address}</p>
                            <a href={el.url} target="_blank">
                              Link to official page
                            </a>
                          </Col>

                          <Col>
                            <p>Adults: {el.adults}</p>
                            <p>Children: {el.children}</p>
                            <p>Nights: {el.nights}</p>
                            <p>-------------</p>
                            <h3 className={classesB.colorBlue}>{el.price}€</h3>
                          </Col>
                          <Col>
                            <h3 className={classesB.colorBlue}>
                              {el.reviewWord}
                            </h3>
                            <h1>
                              <Badge bg="primary">{el.review}</Badge>
                            </h1>
                            {el.reviewWord === "" && (
                              <Badge bg="warning" text="dark">
                                New on web
                              </Badge>
                            )}
                          </Col>

                          <Col>
                            <Button
                              type="button"
                              variant="danger"
                              onClick={() => {
                                const indx = favorites.indexOf(el);
                                console.log(indx);
                                dispatch(
                                  favoritesActions.removeFromFavorites({
                                    index: indx,
                                  })
                                );
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="26"
                                height="26"
                                fill="currentColor"
                                class="bi bi-trash"
                                viewBox="0 0 16 16"
                              >
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                              </svg>
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    );
                  })
              )}
            </div>
          </Tab>
          <Tab eventKey="rental" title="Rent-a-car">
            <div className={styles.tableFav}>
              {favorites.filter((obj) => {
                return obj.type === "rental";
              }).length === 0 ? (
                <p>Rent-a-car list is empty.</p>
              ) : (
                favorites
                  .filter((obj) => {
                    return obj.type === "rental";
                  })
                  .map((el) => {
                    return (
                      <div className={classesR.row}>
                        <Row className={classesR.align}>
                          <Col>
                            <Image
                              src={el.image}
                              alt="Car"
                              rounded={true}
                            ></Image>
                          </Col>

                          <Col xs={5}>
                            <p>{el.partner}</p>
                            <h4 className={classesR.colorBlue}>{el.name}</h4>
                            <p>{el.description}</p>
                            {el.passengers > 0 && (
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
                                &nbsp; {el.passengers} passengers
                              </p>
                            )}
                            {el.isAutomatic ? <p>Automatic</p> : <p>Manual</p>}

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
                              {el.pickupLocation}
                            </p>
                            <p>Center distance: {el.centerDistance} km</p>
                          </Col>

                          <Col>
                            <p>From: {el.pickDate}</p>
                            <p>To: {el.dropDate}</p>
                            {el.isFreeCancellation && (
                              <p className={classes.colorGreen}>
                                Free Cancellation
                              </p>
                            )}
                            <h3 className={classesR.colorBlue}>{el.price}€</h3>
                          </Col>
                          <Col>
                            <Button
                              type="button"
                              variant="danger"
                              onClick={() => {
                                const indx = favorites.indexOf(el);
                                console.log(indx);
                                dispatch(
                                  favoritesActions.removeFromFavorites({
                                    index: indx,
                                  })
                                );
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="26"
                                height="26"
                                fill="currentColor"
                                class="bi bi-trash"
                                viewBox="0 0 16 16"
                              >
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                              </svg>
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    );
                  })
              )}
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default Favorites;
