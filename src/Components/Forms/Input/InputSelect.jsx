import React from "react";
import styles from "./Input.module.css";

const InputSelect = ({ label, id, options, placeholder, gridColumn,opacity }) => {

  return (
    <div className={styles.inputContainer} style={{opacity:opacity}}>
      <label htmlFor={id}>{label}</label>
      <select
        style={{ gridColumn: gridColumn }}
        className={styles.inputContainer}
        id={id}
        name={id}
      >
        {id === 'categoria' && <option value={26}>Outros</option>}
        {options && options.map((option,index) => {
          return <option key={index} value={option.id}>{option.nome}</option>;
        })}
      </select>
    </div>
  );
};

export default InputSelect;
