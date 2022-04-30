import React from "react";

import styles from "./ErrorAlert.module.css";

const ErrorAlert = (props) => {
  return (
    <div className={styles["alert-box"]}>
      <span>{props.errorMessage}</span>
      <span
        className={`gg-close-o ${styles["gg-close-o"]}`}
        onClick={props.onDismissAlert}
      />
    </div>
  );
};

export default ErrorAlert;
