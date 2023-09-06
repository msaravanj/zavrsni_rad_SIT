import styles from "./Card.module.css";
import { Link } from "react-router-dom";

const Card = (props) => {
  return (
    <div className={styles.card}>
      <div className={styles["card__body"]}>
        <img src={props.img} alt={props.alt} />
        <h2 className={styles["card__title"]}>{props.title}</h2>
        <p className={styles["card__description"]}>{props.description}</p>
      </div>
      <button className={styles["card__btn"]}>
        <Link className={styles["link"]} to={props.route}>
          Research
        </Link>
      </button>
    </div>
  );
};

export default Card;
