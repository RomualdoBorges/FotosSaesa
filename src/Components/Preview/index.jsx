import React from "react";
import styles from "./Preview.module.css";

const Preview = ({ previews }) => {
  return (
    <div className={styles.previewContainer}>
      {previews.map((preview, index) => (
        <img
          className={styles.previewImg}
          key={index}
          src={preview}
          alt={`Preview ${index + 1}`}
          width="200"
        />
      ))}
    </div>
  );
};

export default Preview;
