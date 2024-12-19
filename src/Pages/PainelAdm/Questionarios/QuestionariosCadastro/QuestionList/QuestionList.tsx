import React from "react";
import styles from "../QuestionariosCadastro.module.css";
import Plus from "../../../../../assets/icons/plus.svg";
import QuestionCard from "../QuestionCard/QuestionCard.tsx";
import { useGlobalContext } from "../../../../../Hooks/GlobalContext.tsx";
import { questionListProps } from "../QuestionariosCadastro";
import Title from "../../../../../Components/Titles/Title.tsx";
import { PerguntasProps } from "../../../../../types/apiTypes.ts";

export type QuestionListProps = React.ComponentProps<"div"> & {
  perguntasData: PerguntasProps[];
  setPerguntasData: React.Dispatch<React.SetStateAction<PerguntasProps[]>>;
};

const QuestionList = ({ perguntasData,setPerguntasData, ...props }: QuestionListProps) => {
  const { setModal, setModalScreen } = useGlobalContext();

// delete a pergunta baseada no index
  function handleCardDelete(index: number | undefined) {
    if (index === undefined) return; // Adicione uma verificação de segurança
    setPerguntasData((prevPerguntas: PerguntasProps[]) =>
      prevPerguntas.filter((_, i) => i !== index) // Remova o item pelo índice
    );
  }

  return (
    <div className={styles.newQuestions} {...props}>
      <div className={styles.header}>
        <Title text="Perguntas" fontSize="2" />
        <div
          onClick={() =>
            setModalScreen({ nomeModal: "Questionario Config", status: true })
          }
          className={styles.button}
        >
          <img src={Plus} alt="" />
          Nova Pergunta
        </div>
      </div>
      <ul className={styles.questionsList}>
        {perguntasData.length > 0 ? (
          perguntasData.map((question, index) => {
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
