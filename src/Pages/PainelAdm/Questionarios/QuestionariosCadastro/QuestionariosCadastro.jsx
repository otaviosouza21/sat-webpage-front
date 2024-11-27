import React, { useContext, useEffect, useState } from "react";
import styles from "./QuestionariosCadastro.module.css";
import Title from "../../../../Components/Titles/Title";
import InputText from "../../../../Components/Forms/Input/InputText";
import useTokenValidate from "../../../../Hooks/useTokenValidate";
import Button from "../../../../Components/Button/Button";
import { Link } from "react-router-dom";
import Plus from "../../../../assets/icons/plus.svg";

const QuestionariosCadastro = () => {
  const { fetchValidaToken, userAuth } = useTokenValidate();

  useEffect(() => {
    fetchValidaToken();
  }, [userAuth.rule]);

  function handleSubmit() {}

  return (
    <div className={styles.container}>
      <Title text="Cadastrar Questionário" fontSize="3" />
      <form className={styles.form}>
        <InputText label="Titulo" gridColumn="1/3" />
        <InputText type="date" label="Vigencia Inicio" gridColumn="3" />
        <InputText type="date" label="Vigencia Fim" gridColumn="4" />
        <InputText label="Descrição" gridColumn="1/5" />
        <InputText label="Status" />
        <div className={styles.line}></div>
        <div className={styles.newQuestions}>
          <Link to={"/questionario/cadastro"} className={styles.button}>
            <img src={Plus} alt="" />
            Nova Pergunta
          </Link>
        </div>
        <Button handleSubmit={handleSubmit}>
          {"loading" ? "Salvando..." : "Salvar"}
        </Button>
      </form>
    </div>
  );
};

export default QuestionariosCadastro;
