import React from "react";

import styles from "./FlippingCard.module.css";

const FlippingCard = ({ frontContent, backContent }) => {
  return (
    <div className={styles.card}>
      <div className={styles["card-content"]}>
        <div className={styles["card-content-front"]}>{frontContent}</div>
        <div className={styles["card-content-back"]}>{backContent}</div>
      </div>
    </div>
  );
};

export default FlippingCard;
