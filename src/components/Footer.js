import React from "react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.wrapper}>
      <h3 className={styles["footer-heading"]}>Discover. Enjoy. Travel</h3>
      <div className={styles["text-wrapper"]}>
        <p>
          Make your own specific events using our Voidd application. Voidd
          provides you more that you can imagine
        </p>
        <p>
          You can make, update a sell your tickets and this everything at one
          place all together
        </p>
        <hr className={styles["footer-line"]} />
      </div>
      <p className={styles["footer-credits"]}>
        © 2022 Voidd All Rights Reserved.
      </p>
    </footer>
  );
}
