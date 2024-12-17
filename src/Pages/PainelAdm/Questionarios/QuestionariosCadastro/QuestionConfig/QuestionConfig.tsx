import { useEffect, useRef, useState } from "react";

import Title from "../../../../../Components/Titles/Title";

import Button from "../../../../../Components/Button/Button";
import MultipleResponses from "./MultipleResponses/MultipleResponses";
import useForm from "../../../../../Hooks/useForm";
import styles from "./QuestionConfig.module.css";
import CloseButton from "../../../../../Components/CloseButton/CloseButton";
import { useGlobalContext } from "../../../../../Hooks/GlobalContext";
import { questionListProps } from "../QuestionariosCadastro";
import InputText from "../../../../../Components/Formularios/Forms/Input/InputText";
import InputSelect from "../../../../../Components/Formularios/Forms/Input/InputSelect";

type QuestionConfigProps = {
  setQuestionList: React.Dispatch<React.SetStateAction<questionListProps[]>>;
};

type FormRef = HTMLFormElement & {
  tipo_resposta: HTMLSelectElement;
  multipleRespose?: HTMLInputElement[];
};

export interface Option {
  id: number;
  titulo: string;
}

const QuestionConfig: React.FC<QuestionConfigProps> = ({ setQuestionList }) => {
  const formRef = useRef<FormRef | null>(null);
  const [questionType, setQuestionType] = useState<string>("1");
  const [options, setOptions] = useState<Option[]>([{ id: 1, titulo: "" }]);
  const { setModal, dataUpdate, setDataUpdate } = useGlobalContext();

  useEffect(() => {
    if (dataUpdate) {
      titleForm.setValue(dataUpdate.titulo);
      descricaoForm.setValue(dataUpdate.descricao);
      if (dataUpdate.tipo_resposta === "MultiRespostas") {
        setQuestionType("2");
      }
    }
  }, []);

  const optionsFormat = (options: Option[]) => {
    const formatOptions = options.map((opt) => {
      return {
        titulo: opt.titulo
      };
    });
    return formatOptions;
  };


  const titleForm = useForm();
  const descricaoForm = useForm();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (titleForm.validate() && descricaoForm.validate() && formRef.current) {
      setQuestionList((prevQuestions) => {
        const question: questionListProps = {
          formulario_id: dataUpdate?.formulario_id || "", // Preencha com um valor padrão ou derive do contexto
          titulo: titleForm.value,
          descricao: descricaoForm.value,
          tipo_resposta:
            formRef.current && formRef.current["tipo_resposta"].value === "1"
              ? "Texto"
              : "MultiRespostas",
          possui_sub_pergunta:
            formRef.current && formRef.current["tipo_resposta"].value === "2"
              ? true
              : false, // Garantir valor booleano
          multipleQuestionOptions: optionsFormat(options)  || null,
        };

        return [...prevQuestions, question];
      });

      setModal("");
    }
  };



  const handleCloseModal = () => {
    setModal("");
    setDataUpdate({});
  };

  return (
    <form className={`${styles.container} animation-opacity`} ref={formRef}>
      <div className={styles.header}>
        <Title text="Nova Pergunta" fontSize="2" />
        <CloseButton closeModal={handleCloseModal} />
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
        onChange={(e) => { 
          
          setQuestionType(e.target.value)
       
        }}
        value={questionType}
      />
      {questionType === "2" && (
        <MultipleResponses
          question_id={dataUpdate && dataUpdate.id}
          options={options}
          setOptions={setOptions}
        />
      )}
      <Button handleSubmit={handleClick}>Salvar</Button>
    </form>
  );
};

export default QuestionConfig;
