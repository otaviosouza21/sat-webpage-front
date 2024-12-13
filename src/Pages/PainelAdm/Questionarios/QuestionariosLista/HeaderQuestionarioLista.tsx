import React from "react";
import styles from "./QuestionarioLista.module.css";
import Plus from "../../../../assets/icons/plus.svg";
import Title from "../../../../Components/Titles/Title";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../../../Hooks/GlobalContext";

const HeaderQuestionarioLista = () => {

  const {setDataUpdate} = useGlobalContext()
  
  return (
    <div className={styles.header}>
      <Title text="Questionários" fontSize="3" />
      <Link
        to={"/questionario/cadastro"}
        onClick={() => setDataUpdate("")}
        className={styles.button}
      >
        <img src={Plus} alt="" />
        Novo Questionário
      </Link>
    </div>
  );
};

export default HeaderQuestionarioLista;
