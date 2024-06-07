import React from "react";
import styles from "./Button.module.css";

const Button = ({ children }) => {
  return (
    <button className={styles.submitButton} type="submit">
      {children}
    </button>
  );
};

export default Button;
