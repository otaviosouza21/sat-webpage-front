import React from "react";
import style from './Button.module.css'

const Button = ({ color, children }) => {
  return (
    <button className={style.button} style={{background: color && color }}>
      {children}
    </button>
  );
};

export default Button;
