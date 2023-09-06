import Card from "../components/Card";
import styles from "./Home.module.css";

import airplaneImg from "../assets/airplane_img.jpg";
import busImg from "../assets/bus_img.jpg";
import carImg from "../assets/car_img.jpg";
import hotelImg from "../assets/hotel_img.jpg";

const Home = () => {
  return (
    <div>
      <h1 className={styles["heading-welcome"]}>Welcome to my travel app!</h1>
      <p className={styles["paragraph_intro"]}>
        Find information about bus routes, flights, rent-a-cars and
        accomodation!
      </p>
      <div className={styles.wrapper}>
        <Card
          img={airplaneImg}
          alt="Airplane"
          title="Flights"
          description="Find your perfect flight"
          route="/airlines"
        />
        <Card
          img={busImg}
          alt="Bus"
          title="Bus lines"
          description="Find your perfect bus line"
          route="/buses"
        />
        <Card
          img={hotelImg}
          alt="Hotel"
          title="Rooms"
          description="Find the best accomodation for your trip"
          route="/booking"
        />
        <Card
          img={carImg}
          alt="Car"
          title="Rent-a-car"
          description="Pick your favorite car for travel"
          route="/rentals"
        />
      </div>
    </div>
  );
};

export default Home;
