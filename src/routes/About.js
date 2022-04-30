import React, { Fragment } from "react";
import styles from "./About.module.css";
import Contact from "../components/contact/ContactUs";

const About = () => {
  return (
    <Fragment>
      <div className={styles["about-wrapper"]}>
        <div className={styles["par-wrapper"]}>
          <p>
            Our idea for this application is to bring, YOU, every event to one
            place, where you can buy, create or just explore what events that
            are going to be. We present you something, that can change and make
            faster whole events sector.{" "}
          </p>
        </div>
        <div className={styles["us-wrapper"]}>
          We are just grounp of 3 classmates that got idea to build something
          like this, because we think that application like this is really
          missing in our region. We hope that you will use it as much as you
          want to enjoy life.
        </div>
      </div>
      <div className={styles["about-contact-wrapper"]}>
        <h1>Feel free to contact us</h1>
        <p>
          We would like to hear your experience, your complains or your praises.
          Feel free to contact us
        </p>
        <div className={styles["about-contact-line"]}></div>
        <div>
          <Contact />
        </div>
      </div>
    </Fragment>
  );
};

export default About;
