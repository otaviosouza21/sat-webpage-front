import React from "react";
import style from "./Button.module.css";
import { Link } from "react-router-dom";

const Button = ({ color, children, patch,handleSubmit }) => {
  return (
    <button className={style.button} style={{ background: color && color }}>
      <Link onClick={(e)=>handleSubmit && handleSubmit(e)} to={patch}>{children}</Link>
    </button>
  );
};

export default Button;
