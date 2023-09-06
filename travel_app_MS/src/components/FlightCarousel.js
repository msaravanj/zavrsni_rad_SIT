import Carousel from "react-bootstrap/Carousel";
import flightImg from "../assets/flightImg.jpg";
import landingImg from "../assets/landingImg.jpg";
import airportImg from "../assets/airportImg.jpg";
import classes from "./BusCarousel.module.css";

const FlightCarousel = () => {
  return (
    <Carousel className={classes.busCarousel}>
      <Carousel.Item interval={4000}>
        <img src={flightImg} alt="First slide" />
        <Carousel.Caption className={classes.textStyle}>
          <h3>Enjoy every second above the clouds</h3>
          <p>It's the most exciting way to travel</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={4000}>
        <img src={landingImg} alt="Second slide" />
        <Carousel.Caption className={classes.textStyle}>
          <h3>Spend less time on getting to destination</h3>
          <p>Air travel is the quickest mode of travel</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={4000}>
        <img src={airportImg} alt="Third slide" />
        <Carousel.Caption className={classes.textStyle}>
          <h3>Always on time</h3>
          <p>Flying is very organized and safe</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default FlightCarousel;
