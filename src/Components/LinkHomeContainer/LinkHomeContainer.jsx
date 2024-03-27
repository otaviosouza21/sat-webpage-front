import React from "react";
import Button from "../Button/Button";
import styles from "./LinkHomeContainer.module.css";
import Title from "../Titles/Title";

const LinkHomeContainer = ({ icon, title, subtitle, button }) => {
  return (
    <div className={styles.containerLinkHome}>
      <img src={icon} alt="" srcset="" />
      <div className={styles.titulos}>
        <Title text={title} fontSize="3" />
        <p>{subtitle}</p>
      </div>
      <Button>{button}</Button>
    </div>
  );
};

export default LinkHomeContainer;
