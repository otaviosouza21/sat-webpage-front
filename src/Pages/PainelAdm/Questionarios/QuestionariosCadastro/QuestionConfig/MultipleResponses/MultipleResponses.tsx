import React, { useEffect, useState } from "react";
import InputText from "../../../../../../Components/Formularios/Forms/Input/InputText";
import plus from "../../../../../../assets/icons/plus.svg";
import sub from "../../../../../../assets/icons/sub.svg";
import styles from "./MultipleResponses.module.css";
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
  const [inputs,setInputs] = useState([{id: 0 ,titulo: ""}])

  const handleAddInput = () => {setInputs([...inputs, {id: Date.now(), titulo: ""}])};

  const handleInputChange = (id: number,value: string) =>{
    setInputs((prevInputs) =>
      prevInputs.map((input) =>
        input.id === id ? { ...input, titulo: value } : input
      )
    );
    setSubPerguntasData(inputs)
  }

  const handleDelete = (id: number) =>{
    const firstId = inputs[0].id
    if(firstId !== id){
      setInputs((prevInputs) => prevInputs.filter((input) => input.id !== id));
    }
  }

  
  if (subPerguntasData && subPerguntasData?.length < 1) return null;
  return (
    <div className={styles.container}>
      {inputs.map((input, index) => {
        return (
          <div key={index} style={{ display: "flex", gap: "10px" }}>
            <InputText placeholder={`Opção ${index + 1}`} onChange={(e)=>handleInputChange(input.id, e.target.value)} />
            <img src={sub} onClick={()=> handleDelete(input.id)} alt="" />
          </div>
        );
      })}
      <img
        onClick={handleAddInput}
        src={plus}
        alt="Add Option"
        className={styles.icon}
      />
    </div>
  );
};

export default MultipleResponses;
