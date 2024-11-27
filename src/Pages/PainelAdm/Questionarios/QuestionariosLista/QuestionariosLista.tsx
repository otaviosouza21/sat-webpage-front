import React from "react";
import Title from "../../../../Components/Titles/Title";
import Plus from "../../../../assets/icons/plus.svg";
import styles from './QuestionarioLista.module.css'
import { Link, useNavigate } from "react-router-dom";

const QuestionariosLista = () => {
const navigate = useNavigate()

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title text="Questionários" fontSize="3" />
        <Link to={'/questionario/cadastro'} className={styles.button}>
          <img src={Plus} alt="" />
          Novo Questionário
        </Link>
      </div>
    </div>
  );
};

export default QuestionariosLista;
