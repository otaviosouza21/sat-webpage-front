import React from "react";
import styles from "./Input.module.css";

const InputText = ({
  label,
  id,
  type,
  placeholder,
  gridColumn,
  onBlur,
  onChange,
  error,
  value,
  errorConfere
}) => {
  return (
    <div style={{ gridColumn: gridColumn }} className={styles.inputContainer}>
      <label htmlFor={id}>{label}</label>
      <input
        placeholder={placeholder}
        type={type}
        id={id}
        onBlur={onBlur}
        onChange={onChange}
        name={id}
        value={value} 
      />
      {errorConfere ? <p className={styles.error}>{errorConfere}</p> : <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default InputText;
