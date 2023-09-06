import Carousel from "react-bootstrap/Carousel";
import bus1Img from "../assets/rsz_2bus1.jpg";
import bus2Img from "../assets/rsz_1bus2.jpg";
import bus3Img from "../assets/rsz_bus3.jpg";
import classes from "./BusCarousel.module.css";

const BusCarousel = () => {
  return (
    <Carousel className={classes.busCarousel}>
      <Carousel.Item interval={4000}>
        <img src={bus1Img} alt="First slide" />
        <Carousel.Caption className={classes.textStyle}>
          <h3>Find your ideal bus line </h3>

          <p>Travel cheap and stressless</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={4000}>
        <img src={bus2Img} alt="Second slide" />
        <Carousel.Caption className={classes.textStyle}>
          <h3>Comfortable seats</h3>
          <p>The best, modern Flixbus vehicles</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={4000}>
        <img src={bus3Img} alt="Third slide" />
        <Carousel.Caption className={classes.textStyle}>
          <h3>Enjoy the world around you</h3>
          <p>Notice all beautiful nature and arhitecture while travelling</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default BusCarousel;
