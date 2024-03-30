import React from "react";
import Button from "../Button/Button";
import wppIcon from "../../assets/icons/wathsapp.svg";
import styles from "./ServicoContainer.module.css";

const ServicoContainer = () => {
  return (
    <div className={styles.servicosContainer}>
      <div className={styles.servico}>
        <h3>Diarista Fixa</h3>
        <span>Diarista</span>
        <p>Dona Maria</p>
        <Button>
          <img src={wppIcon} alt="" />
          Contato
        </Button>
      </div>
      <button className={styles.showMore}>+Ver Mais</button>
    </div>
  );
};

export default ServicoContainer;
