import React from "react";
import Button from "../Button/Button";
import styles from "./LinkHomeContainer.module.css";
import Title from "../Titles/Title";
import { Link } from "react-router-dom";


const LinkHomeContainer = ({ icon, title, subtitle, button,patch }) => {
  return (
    <div className={styles.containerLinkHome}>
      <img src={icon} alt="" />
      <div className={styles.titulos}>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
     <Button patch={patch}>{button}</Button>
    </div>
  );
};

export default LinkHomeContainer;
