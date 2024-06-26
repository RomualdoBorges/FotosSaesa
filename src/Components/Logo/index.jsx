import React from "react";
import logo from "../../assets/logo.png";
import styles from "./Logo.module.css";

const Logo = () => {
  return <img src={logo} alt="Logo" className={styles.logo} />;
};

export default Logo;
