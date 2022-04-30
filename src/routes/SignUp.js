import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import ErrorAlert from "../components/authentication/ErrorAlert";

import loginImage from "../assets/images/login_image.png";
import styles from "./Authentication.module.css";
import useAuth from "../store/auth-context";

const SignUp = () => {
  const navigate = useNavigate();
  const authCtx = useAuth();
  const [email, setEmailState] = useState("");
  const [password, setPasswordState] = useState("");
  const [confirmPassword, setConfirmPasswordState] = useState("");
  const [isAuthValid, setAuthValidity] = useState(true);
  const [errMessage, setErrorMessage] = useState("");

  const location = useLocation();
  const destinationURL = location.state?.returnURL || "/";

  const OnSignInSumbitted = async (event) => {
    event.preventDefault();

    let errMsg = null;

    if (
      email.length === 0 ||
      password.length === 0 ||
      confirmPassword.length === 0
    ) {
      errMsg = "None of the fields can be empty.";
    } else if (password !== confirmPassword) {
      errMsg = "Passwords have to match.";
    } else {
      try {
        await authCtx.signUp(email, password);
      } catch (exception) {
        if (exception.code === "auth/weak-password") {
          errMsg = "Password requires at least 6 characters.";
        } else if (exception.code === "auth/email-already-in-use") {
          errMsg = "Email already in use.";
        } else {
          errMsg = "Given email is not valid.";
        }
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

  const OnConfirmPasswordChange = (event) => {
    setConfirmPasswordState(event.target.value.trim());
  };

  const DismissAlert = () => {
    setAuthValidity(true);
  };

  return (
    <div className={styles["auth-page"]}>
      <main>
        <h1>Create new account</h1>
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
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={OnPasswordChange}
              />
            </div>
            <div className={styles["labeled-input"]}>
              <label htmlFor="confirm password">Confirm password</label>
              <input
                id="confirm password"
                type="password"
                value={confirmPassword}
                onChange={OnConfirmPasswordChange}
              />
            </div>
            <button type="submit" className={styles.btn}>
              Sign up
            </button>
          </form>
        </div>
      </main>
      <img src={loginImage} alt="" />
    </div>
  );
};

export default SignUp;
