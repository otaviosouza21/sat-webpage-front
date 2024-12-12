import React from "react";
import styles from '../QuestionariosCadastro.module.css'
import Plus from "../../../../../assets/icons/plus.svg";
import QuestionCard from '../QuestionCard/QuestionCard'

const QuestionList = ({ setModal, handleCardDelete, questionList }) => {
  return (
    <div className={styles.newQuestions}>
      <div className={styles.header}>
        {/*  <Title text="Perguntas" fontSize="2" /> */}
        <div
          onClick={() => setModal("show-QuestionConfig")}
          className={styles.button}
        >
          <img src={Plus} alt="" />
          Nova Pergunta
        </div>
      </div>
      <ul className={styles.questionsList}>
        {questionList.length > 0 ? (
          questionList.map((question, index) => {
            return (
              <QuestionCard
                index={index}
                handleCardDelete={handleCardDelete}
                key={index}
                question={question}
              />
            );
          })
        ) : (
          <p style={{ margin: "10px 0px" }}>Sem perguntas cadastradas</p>
        )}
      </ul>
    </div>
  );
};

export default QuestionList;