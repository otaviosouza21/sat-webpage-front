import React, { useEffect, useState } from "react";
import InputText from "../../../../../../Components/Formularios/Forms/Input/InputText";
import plus from "../../../../../../assets/icons/plus.svg";
import sub from "../../../../../../assets/icons/sub.svg";
import styles from "./MultipleResponses.module.css";
import useFetch from "../../../../../../Hooks/useFetch";
import { GET_TO_WHERE } from "../../../../../../Api/api";
import { Option } from "../QuestionConfig";
import useToast from "../../../../../../Hooks/useToast";
import LoadingDots from "../../../../../../Components/Utils/LoadingDots/LoadingDots";
import { subPerguntasProps } from "../../../../../../types/apiTypes";

interface MultipleResponsesProps {
  question_id: string;
  setSubPerguntasData: React.Dispatch<
    React.SetStateAction<subPerguntasProps[] | null>
  >;
  subPerguntasData: subPerguntasProps[] | null;
}

const MultipleResponses = ({
 
  setSubPerguntasData,
  subPerguntasData,
}: MultipleResponsesProps) => {

  const handleClick = () => {};

  const handleChange = (newValue: string) => {
    const newSubPergunta: subPerguntasProps = {titulo: newValue};
  
    setSubPerguntasData((prevData) => {
      // Verifica se subPerguntasData não é null antes de realizar a operação
      if (prevData) {
        return [...prevData, newSubPergunta];  // Atualiza o estado
      }
      return [newSubPergunta];  // Caso seja null, inicia com um novo array
    });
  };

  const handleDelete = (id: number) => {};

  if (subPerguntasData && subPerguntasData?.length < 1) return null;
  return (
    <div className={styles.container}>
      {subPerguntasData &&
        subPerguntasData.map((option, index) => (
          <div key={option.id} className={styles.input}>
            <InputText
              key={option.id}
              placeholder={`Opção ${option.id}`}
              value={option.titulo}
              onChange={(e) => handleChange(e.target.value)}
              id="multipleResponse"
            />
            <img
              onClick={() => handleDelete(index)}
              src={sub}
              alt="Remove Option"
              className={styles.icon}
            />
          </div>
        ))}
      <img
        onClick={handleClick}
        src={plus}
        alt="Add Option"
        className={styles.icon}
      />
    </div>
  );
};

export default MultipleResponses;
