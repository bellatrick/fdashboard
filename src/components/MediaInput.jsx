import React from "react";
import styles from "../style/media.module.css";
const MediaInput = (props) => {

  return (
    <div className="w-full">
      <label
        htmlFor={props.type}
        className="block text-xs font-medium mb-3 text-gray-400 tracking-widest"
      >
        {props.label}
      </label>
      <div className={styles.upload}>
        <input type="button" className={styles.uploadButton} value="Browse" />
        <input type="file" name="upload" accept="image/png, image/jpeg" id="fileUpload" onChange={props.onChange}  />
        <span className={styles.fileName}>
          {props.value[0]?.name? props.value[0]?.name:'Choose Image'}
        </span>
      </div>
      <p className={styles.red}>
       {props.helperText}
      </p>
    </div>
  );
};

export default MediaInput;
