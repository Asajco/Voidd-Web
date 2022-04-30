import React from "react";

import styles from "./Spinner.module.css";

const Spinner = ({loadingDescription}) => {
  return (
    <div className={styles["spinner-wrapper"]}>
      <div className={styles["loader"]}>
        <h4>{loadingDescription ? loadingDescription : "Loading..."}</h4>
        <div className={styles["bar1"]}></div>
        <div className={styles["bar2"]}></div>
        <div className={styles["bar3"]}></div>
        <div className={styles["bar4"]}></div>
        <div className={styles["bar5"]}></div>
        <div className={styles["bar6"]}></div>
      </div>
    </div>
  );
};

export default Spinner;
