import React from "react";
import style from "./Button.module.css";
import { Link } from "react-router-dom";

const Button = ({ color, children, patch }) => {
  return (
    <button className={style.button} style={{ background: color && color }}>
      <Link to={patch}>{children}</Link>
    </button>
  );
};

export default Button;
