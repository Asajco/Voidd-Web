import React, { useContext } from "react";
import EventContext from "../../store/event-context";
import { formatDate } from "../../utils/firebase-converters";

import styles from "./Event.module.css";

const Event = (props) => {
  const eventCtx = useContext(EventContext);

  return (
    <div className={styles["event-card"]}>
      <div className={styles["event-img"]}>
        <img src={props.image} alt="" />
      </div>
      <div className={styles["event-info"]}>
        <h3>{props.title}</h3>
        <p className={styles.description}>{props.description}</p>
        <p className={styles.location}>{props.location}</p>
        <p className={styles.date}>{formatDate(props.date)}</p>
        <p className={styles.genre}>Genre: {props.genre}</p>
        <p className={styles.price}>Price: {props.price + "€"}</p>
        <p>
          {props.remainingTickets > 0
            ? `Tickets left: ${props.remainingTickets}`
            : "Sold out!"}
        </p>
        <div className={styles["event-card-buttons"]}>
          {props.remainingTickets > 0 && (
            <button type="button" onClick={() => eventCtx.onTicketBuy(props.eventRef)}>
              Buy ticket
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Event;
