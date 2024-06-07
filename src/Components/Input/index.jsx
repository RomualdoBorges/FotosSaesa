import React from "react";
import styles from "./Input.module.css";

const Input = ({ id, validOs, value, onChange, label }) => {
  return (
    <div className={styles.inputGroup}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <input
        className={`${styles.inputField} ${validOs ? styles.inputError : ""}`}
        type="text"
        id={id}
        value={value}
        onChange={onChange}
      />
      {validOs && (
        <p className={styles.errorParagraph}>
          *Favor informar o número da Ordem de Serviço.
        </p>
      )}
    </div>
  );
};

export default Input;
