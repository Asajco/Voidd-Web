import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import ErrorAlert from "../components/authentication/ErrorAlert";
import loginImage from "../assets/images/login_image.png";
import styles from "./Authentication.module.css";
import SignUpPrompt from "../components/authentication/SignUpPrompt";
import useAuth from "../store/auth-context";

const SignIn = () => {
  const navigate = useNavigate();
  const authCtx = useAuth();

  const [email, setEmailState] = useState("");
  const [password, setPasswordState] = useState("");
  const [isAuthValid, setAuthValidity] = useState(true);
  const [errMessage, setErrorMessage] = useState("");

  const location = useLocation();
  const destinationURL = location.state?.returnURL || "/";

  const OnSignInSumbitted = async (event) => {
    event.preventDefault();

    let errMsg = null;

    if (email.length === 0 || password.length === 0) {
      errMsg = "None of the fields can be empty.";
    } else {
      try {
        await authCtx.signIn(email, password);
      } catch {
        errMsg = "Incorrect email or password.";
      }
    }

    if (errMsg !== null) {
      setAuthValidity(false);
      setErrorMessage(errMsg);
    } else {
      navigate(destinationURL);
    }
  };

  const OnEmailChange = (event) => {
    setEmailState(event.target.value.trim());
  };

  const OnPasswordChange = (event) => {
    setPasswordState(event.target.value.trim());
  };

  const DismissAlert = () => {
    setAuthValidity(true);
  };

  return (
    <div className={styles["auth-page"]}>
      <img src={loginImage} alt="" />
      <main>
        <h1>Welcome to Voidd</h1>
        {isAuthValid === false && (
          <ErrorAlert errorMessage={errMessage} onDismissAlert={DismissAlert} />
        )}
        <div className={styles["auth-card"]}>
          <form onSubmit={OnSignInSumbitted}>
            <div className={styles["labeled-input"]}>
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                type="text"
                value={email}
                onChange={OnEmailChange}
              />
            </div>
            <div className={styles["labeled-input"]}>
              <div className={styles["fgt-password"]}>
                <label htmlFor="password">Password</label>
                <a href="#root">Forgot password?</a>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={OnPasswordChange}
              />
            </div>
            <button type="submit" className={styles.btn}>
              Sign in
            </button>
          </form>
        </div>
        <SignUpPrompt returnURL={destinationURL} />
      </main>
    </div>
  );
};

export default SignIn;
