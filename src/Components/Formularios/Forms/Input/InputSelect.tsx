import React, { ChangeEvent, ChangeEventHandler } from "react";
import styles from "./Input.module.css";

interface InputSelectProps {
  label: string;
  id: string;
  options: {
    id: number;
    nome: string;
  }[];
  placeholder?: string;
  gridColumn?: string;
  opacity?: number | null;
  onChange?: React.ChangeEventHandler<HTMLSelectElement> | undefined;
  value? : string;
}


const InputSelect = ({
  label,
  id,
  options,
  placeholder,
  gridColumn,
  opacity,
  onChange,
  value
}: InputSelectProps) => {
  return (
    <div className={styles.inputContainer} style={{ opacity: opacity ? opacity : '' }}>
      <label htmlFor={id}>{label}</label>
      <select
        style={{ gridColumn: gridColumn }}
        className={styles.inputContainer}
        id={id}
        name={id}
        onChange={onChange}
        value={value}
      >
        {id === "categoria" && <option value={26}>Outros</option>}
        {options &&
          options.map((option, index) => {
            return (
              <option key={index} value={option.id}>
                {option.nome}
              </option>
            );
          })}
      </select>
    </div>
  );
};

export default InputSelect;
