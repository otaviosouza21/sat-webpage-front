import React, { useContext } from "react";
import style from "./Button.module.css";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../Hooks/GlobalContext";
import ReactGA from 'react-ga'

const Button = ({ color, children, patch, handleSubmit, modalParam}) => {
  const {setDataUpdate, setModal} = useContext(GlobalContext)


  return (
    <button className={style.button} style={{ background: color && color }}>
      <Link onClick={(event) =>{
          ReactGA.event({
            category: 'Button',
            action: 'Click',
            label: 'My Button'
          });
        handleSubmit && handleSubmit(event)
        setDataUpdate(null)
        if(modalParam){
          setModal(modalParam)
        }
    
      }} to={patch}>
        {children}
      </Link>
    </button>
  );
};

export default Button;
