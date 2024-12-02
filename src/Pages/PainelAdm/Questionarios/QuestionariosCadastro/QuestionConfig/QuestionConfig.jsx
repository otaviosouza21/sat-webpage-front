import React, { useContext, useEffect, useRef, useState } from "react";
import InputText from "../../../../../Components/Forms/Input/InputText";
import Title from "../../../../../Components/Titles/Title";
import InputSelect from "../../../../../Components/Forms/Input/InputSelect";
import Button from "../../../../../Components/Button/Button";
import MultipleResponses from "./MultipleResponses/MultipleResponses";
import useForm from "../../../../../Hooks/useForm";
import styles from "./QuestionConfig.module.css";
import CloseButton from "../../../../../Components/CloseButton/CloseButton";
import { GlobalContext } from "../../../../../Hooks/GlobalContext";

const QuestionConfig = ({ setQuestionList }) => {
  const formRef = useRef();
  const [showInputOptions, setShowInputOptions] = useState("");
  const { setModal } = useContext(GlobalContext);
  const handleChandSelect = () => {
    const tipoResposta = +formRef.current["tipo_resposta"].value; // Acessa o valor
    setShowInputOptions(tipoResposta);
  };

  const titleForm = useForm();
  const descricaoForm = useForm();

  const handleClick = () => {
   formRef.current['tipo_resposta'].value
    
    if (titleForm.validate(), descricaoForm.validate()) {
      setQuestionList((prevQuestions) => {
        const question = {
          titulo: titleForm.value,
          titulo: titleForm.value,
          descricao: descricaoForm.value,
          tipo_resposta:  formRef.current['tipo_resposta'].value === '1' ? 'Texto' : 'MultiRespostas',
          possui_sub_pergunta: formRef.current['tipo_resposta'].value  === '1' ? false : true
        }
      
        
        return [...prevQuestions, question];
      });
       setModal('') 
    }
  };

  return (
    <form
      className={`${styles.container} animation-opacity`}
      ref={formRef}
    >
      <div className={styles.header}>
        <Title text="Nova Pergunta" fontSize="2" />
        <CloseButton
          closeModal={setModal}
          /* closeModal={closeModal}
        CloseContainerPost={CloseContainerPost} */
        />
      </div>
      <InputText {...titleForm} label="Titulo da pergunta" />
      <InputText {...descricaoForm} label="Descrição" />
      <InputSelect
    
        label="Tipo de Entrada"
        id="tipo_resposta"
        options={[
          { id: 1, nome: "Texto" },
          { id: 2, nome: "Multipla Escolha" },
        ]}
        onChange={handleChandSelect}
      />
      {showInputOptions === 2 && <MultipleResponses />}
      <Button handleSubmit={handleClick}>Salvar</Button>
    </form>
  );
};

export default QuestionConfig;
