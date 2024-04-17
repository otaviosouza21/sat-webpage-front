import React, { useContext } from "react";
import Button from "../Button/Button";
import styles from "./LinkHomeContainer.module.css";
import { GlobalContext } from "../../Hooks/GlobalContext";




const LinkHomeContainer = ({ icon, title, subtitle, button,patch,setModal }) => {
  const { userAuth } = useContext(GlobalContext);
  return (
    <div className={styles.containerLinkHome}>
      <img src={icon} alt="" />
      <div className={styles.titulos}>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      {patch === '/servicos'?(

        <Button patch={patch} >{button}</Button>  
      ):
        <Button patch={`${userAuth.status ? patch :''}`} modalParam={`${!userAuth.status ? 'cadUsuario':'false'}`}>{button}</Button>
      }
    </div>
  );
};

export default LinkHomeContainer;
