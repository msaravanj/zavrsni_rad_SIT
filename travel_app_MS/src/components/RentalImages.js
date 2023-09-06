import React from "react";
import { Image } from "react-bootstrap";
import img1 from "../assets/rental1_img.jpg";
import img2 from "../assets/rental2_img.jpg";
import img3 from "../assets/rental3_img.jpg";
import classes from "./RentalImages.module.css";

const RentalImages = () => {
  return (
    <div className={classes.row}>
      <div className={classes.shadow}>
        <Image src={img1} rounded />
      </div>
      <div className={classes.shadow}>
        <Image src={img2} rounded />
      </div>
      <div className={classes.shadow}>
        <Image src={img3} rounded />
      </div>
    </div>
  );
};

export default RentalImages;
