import React from "react";
import { Link } from "react-router-dom";
import styles from "./Thankyou.module.css";

function Thankyou() {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.icon}>✓</div>

        <h1>Thank you for your purchase!</h1>

        <p>
          Your course has been successfully purchased.
          You can start learning from your My Courses page.
        </p>

        <Link to="/my-courses" className={styles.button}>
          Go to My Courses
        </Link>
      </div>
    </div>
  );
}

export default Thankyou;