import React from "react";
import styles from "./TicketCard.module.css";

import { formatDate } from "../utils/firebase-converters";

const TicketCard = (props) => {
  return (
    <div className={styles.ticket}>
      <div className={styles["ticket-description"]}>
        <h3>{props.relatedEvent.title}</h3>
        <p className={styles.location}>{props.relatedEvent.location}</p>
        <p className={styles.date}>{formatDate(props.relatedEvent.date)}</p>
      </div>
      <div className={`${styles["qr-code"]} ${props.valid === false ? styles["border-invalid"] : ""}`}>
        <img src={props.qrCode} alt="QR code" />
      </div>
    </div>
  
  );
};

export default TicketCard;
