import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import FlippingCard from "../components/FlippingCard";
import styles from "./Pricing.module.css";

export default function Pricing() {
  const navigate = useNavigate();

  const cardFrontBasic = (
    <Fragment>
      <h3 className={styles["pricing-card-title"]}>Basic account</h3>
      <ul className={styles["pricing-features-list"]}>
        <li>No acces to creating event</li>
        <li>You can buy and save your tickets</li>
        <li>Browsing different events</li>
      </ul>
      <hr className={styles["pricing-line"]} />
      <p>
        Price <span className={styles["pricing-price"]}>0$</span>
      </p>
    </Fragment>
  );
  
  const cardFrontPremiumMonth = (
    <Fragment>
      <h3 className={styles["pricing-card-title"]}>One month premium account</h3>
      <ul className={styles["pricing-features-list"]}>
        <li>Acces to creating events</li>
        <li>Creating 10 events per month</li>
        <li>Promoting you events</li>
      </ul>
      <hr className={styles["pricing-line"]} />
      <p>
        Price <span className={styles["pricing-price"]}>100$</span>
      </p>
    </Fragment>
  );
  const cardFrontPremiumYear = (
    <Fragment>
      <h3 className={styles["pricing-card-title"]}>Year premium account</h3>
      <ul className={styles["pricing-features-list"]}>
        <li> <span>Acces to creating events  </span></li>
        <li> <span>Unlimited amount of events</span></li> 
        <li> <span>Better price</span> </li> 
      </ul>
      <hr className={styles["pricing-line"]} />
      <p>
        Price <span className={styles["pricing-price"]}>700$</span>
      </p>
    </Fragment>
  );

  const cardBackBasic = (
    <Fragment>
      <h3 className={styles["pricing-card-title"]}>Basic program</h3>
      <button className={styles["pricing-btn"]} type="button" onClick={ () => navigate("/membership")}>
          Buy now
      </button>
    </Fragment>
  );
  
  const cardBackPremiumMonth = (
    <Fragment>
      <h3 className={styles["pricing-card-title"]}>Premium program<br/>Month</h3>
      <button className={styles["pricing-btn"]} type="button" onClick={ () => navigate("/membership?type=premiumMonth")}>
          Buy now
      </button>
    </Fragment>
  );

  const cardBackPremiumYear = (
    <Fragment>
      <h3 className={styles["pricing-card-title"]}>Premium program<br/>Year</h3>
      <button className={styles["pricing-btn"]} type="button" onClick={ () => navigate("/membership?type=premiumYear")}>
          Buy now
      </button>
    </Fragment>
  );

  return (
    <div className={styles["pricing-container"]}>
      <FlippingCard frontContent={cardFrontBasic} backContent={cardBackBasic} />
      <FlippingCard frontContent={cardFrontPremiumMonth} backContent={cardBackPremiumMonth} />
      <FlippingCard frontContent={cardFrontPremiumYear} backContent={cardBackPremiumYear} />
    </div>
  );
}
