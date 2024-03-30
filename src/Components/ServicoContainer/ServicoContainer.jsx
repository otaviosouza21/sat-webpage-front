import React from "react";
import Button from "../Button/Button";
import wppIcon from "../../assets/icons/wathsapp.svg";
import styles from "./ServicoContainer.module.css";

const ServicoContainer = ({ servicosData }) => {
  const { nome_negocio, descricao_servico, nome_prestado, categoria_servico } =
    servicosData;

  return (
    <div className={styles.servicosContainer}>
      <div className={styles.servico}>
        <h3>{nome_negocio}</h3>
        <span>{categoria_servico}</span>
        <p>{nome_prestado}</p>
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
