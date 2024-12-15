import React, { ChangeEvent } from "react";
import styles from "./Input.module.css";

type InputTextProps = React.ComponentProps<"input"> & {
  label?: string;
  id?: string;
  type?: string;
  placeholder?: string;
  gridColumn?: string;
  onBlur: () => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error: string | null;
  value: string;
  errorConfere?: "";
  opacity?: number | null;
};

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
  errorConfere,
  opacity,
}: InputTextProps) => {
  return (
    <div
      style={{ gridColumn: gridColumn, opacity: opacity ? opacity : 1 }}
      className={styles.inputContainer}
    >
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
      {errorConfere ? (
        <p className={styles.error}>{errorConfere}</p>
      ) : (
        <p className={styles.error}>{error}</p>
      )}
    </div>
  );
};

export default InputText;
