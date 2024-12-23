import React from "react";
import styles from '../QuestionariosCadastro.module.css'
import Plus from "../../../../../assets/icons/plus.svg";
import QuestionCard from '../QuestionCard/QuestionCard.tsx'
import { useGlobalContext } from "../../../../../Hooks/GlobalContext.tsx";
import { questionListProps } from "../QuestionariosCadastro";
import Title from "../../../../../Components/Titles/Title.tsx";


export type QuestionListProps = React.ComponentProps<'div'>&{
  handleCardDelete: (index:number)=> void;
  questionList: questionListProps[];
}

const QuestionList = ({ handleCardDelete, questionList, ...props }:QuestionListProps) => {
  const {setModal, setModalScreen} = useGlobalContext();
  return (
    <div className={styles.newQuestions} {...props}>
      <div className={styles.header}>
         <Title text="Perguntas" fontSize="2" /> 
        <div
          onClick={() => setModalScreen({nomeModal: "Questionario Config", status: true})}
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
