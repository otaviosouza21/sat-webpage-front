import React, { useContext } from "react";
import style from "./Button.module.css";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../Hooks/GlobalContext";

const Button = ({ color, children, patch, handleSubmit, modalParam}) => {
  const {setDataUpdate, setModal} = useContext(GlobalContext)


  return (
    <button className={style.button} style={{ background: color && color }}>
      <Link onClick={(e) =>{
        handleSubmit && handleSubmit(e)
        setDataUpdate(null)
        setModal(modalParam)
    
      }} to={patch}>
        {children}
      </Link>
    </button>
  );
};

export default Button;
