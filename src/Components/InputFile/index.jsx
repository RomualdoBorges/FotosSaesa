import React from "react";
import styles from "./InputFile.module.css";

const InputFile = ({ id, label, validImg, onChange }) => {
  return (
    <div className={styles.inputGroup}>
      <label className={styles.fileLabel} htmlFor={id}>
        {label}
      </label>
      {validImg && (
        <p className={styles.errorParagraph}>
          *Favor informar adicionar as três fotos.
        </p>
      )}
      <input
        className={styles.fileInput}
        type="file"
        id={id}
        accept="image/*"
        multiple
        onChange={onChange}
      />
    </div>
  );
};

export default InputFile;
