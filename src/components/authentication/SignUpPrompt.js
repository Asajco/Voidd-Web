import React from "react";
import styles from "./SignUpPrompt.module.css";
import {Link} from "react-router-dom"

const SignUpPrompt = (props) => {

  return (
    <div className={styles["prompt-box"]}>
      <p>Are you new to Voidd?</p>
      <Link to="/signup" state={{ returnURL: props.returnURL }}>Sign up here!</Link>
    </div>
  );
};

export default SignUpPrompt;
