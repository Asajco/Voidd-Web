import React from "react";
import styles from "./Membership.module.css";
import { firestore } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../store/auth-context";

const Membership = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const authCtx = useAuth();
  const {
    userData: { uid: userId },
  } = authCtx;

  const membershipType = new URLSearchParams(search).get("type") || "basic";

  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    cardNumber: "",
    cvNumber: "",
    validDate: "",
    membership: membershipType,
  });

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await setDoc(
      doc(firestore, "users", userId),
      {
        card: {
          number: formData.cardNumber,
          cvNumber: formData.cvNumber,
          valid: formData.validDate,
        },
        membership: formData.membership,
      },
      { merge: true }
    );
    authCtx.updateUserAccountState();
    navigate("/");
  }
  return (
    <div className={styles["form-image"]}>
      <form onSubmit={handleSubmit} className={styles["form-wrapper"]}>
        <input
          type="text"
          placeholder="First Name"
          onChange={handleChange}
          name="firstName"
          value={formData.firstName}
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Last Name"
          onChange={handleChange}
          name="lastName"
          value={formData.lastName}
          className={styles.input}
        />
        <input
          type="email"
          placeholder="Email"
          onChange={handleChange}
          name="email"
          value={formData.email}
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Card number"
          onChange={handleChange}
          name="cardNumber"
          value={formData.cardNumber}
          className={styles.cardNumber}
        />
        <div className={styles["card-data"]}>
          <input
            type="text"
            placeholder="CV of your card"
            onChange={handleChange}
            name="cvNumber"
            value={formData.cvNumber}
            className={styles.cv}
          />
          <input
            type="text"
            placeholder="Valid till"
            onChange={handleChange}
            name="validDate"
            value={formData.validDate}
            className={styles.valid}
          />
        </div>

        <fieldset className={styles["membership-choosing"]}>
          <legend className={styles.legend}>Choose yoor membership</legend>
          <input
            type="radio"
            id="basic"
            name="membership"
            value="basic"
            checked={formData.membership === "basic"}
            onChange={handleChange}
          />
          <label htmlFor="basic" className={styles["form-membership-basic"]}>
            Basic acount
          </label>
          <br />

          <input
            type="radio"
            id="premiumMonth"
            name="membership"
            value="premiumMonth"
            checked={formData.membership === "premiumMonth"}
            onChange={handleChange}
          />
          <label
            htmlFor="premiumMonth"
            className={styles["form-membership-basic"]}
          >
            Premium from 1 month
          </label>
          <br />

          <input
            type="radio"
            id="premiumYear"
            name="membership"
            value="premiumYear"
            checked={formData.membership === "premiumYear"}
            onChange={handleChange}
          />
          <label
            htmlFor="premiumYear"
            className={styles["form-memership-basic"]}
          >
            Premium for 1 year
          </label>
          <br />
        </fieldset>
        <button className={styles["form-button"]} type="submit">
          Buy membership
        </button>
      </form>
    </div>
  );
}

export default Membership;