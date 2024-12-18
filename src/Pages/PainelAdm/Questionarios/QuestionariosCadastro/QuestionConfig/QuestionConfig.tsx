import { useRef, useState } from "react";

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

const QuestionConfig: React.FC<QuestionConfigProps> = ({ setQuestionList }) => {
  const formRef = useRef<FormRef | null>(null);
  const [showInputOptions, setShowInputOptions] = useState<string>("");
  const { setModal, dataUpdate, setDataUpdate, setModalScreen } =
    useGlobalContext();

  const handleChandSelect = () => {
    if (formRef.current) {
      const tipoResposta = formRef.current["tipo_resposta"].value;
      setShowInputOptions(tipoResposta);
    }
  };

  const titleForm = useForm();
  const descricaoForm = useForm();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const newMultipleResponse: { titulo: string }[] = [];

    if (formRef.current && formRef.current["tipo_resposta"].value === "2") {
      formRef.current["multipleRespose"]?.forEach((response) => {
        if (response.value) {
          newMultipleResponse.push({ titulo: response.value });
        }
      });
    }

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
          multipleQuestionOptions:
            newMultipleResponse.length > 0 ? newMultipleResponse : false,
        };

        return [...prevQuestions, question];
      });

      setModal("");
    }
  };

  const handleCloseModal = () => {
    setModalScreen({
      nomeModal: "",
      status: false,
      data: {}
    });
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
        onChange={handleChandSelect}
      />
      {showInputOptions === "2" && <MultipleResponses />}
      <Button handleSubmit={handleClick}>Salvar</Button>
    </form>
  );
};

export default QuestionConfig;
