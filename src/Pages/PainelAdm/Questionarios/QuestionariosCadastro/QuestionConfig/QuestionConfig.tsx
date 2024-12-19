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
import useToast from "../../../../../Hooks/useToast";
import { PerguntasProps, tipoPerguntasProps } from "../../../../../types/apiTypes";
import useFetch from "../../../../../Hooks/useFetch";
import { GET_ALL } from "../../../../../Api/api";

type QuestionConfigProps = {
  setPerguntasData: React.Dispatch<React.SetStateAction<PerguntasProps[]>>;
};

export interface Option {
  id: number;
  titulo: string;
}

const QuestionConfig = ({ setPerguntasData }: QuestionConfigProps) => {
  const { request, loading } = useFetch();
  const { setModalScreen, dataUpdate, setDataUpdate } = useGlobalContext();
  const [tipoPergunta, setTipoPergunta] = useState<tipoPerguntasProps | null>(null);
  const [currentTipoPergunta, setCurrentTipoPergunta] = useState<string>("1");
  const [options, setOptions] = useState<Option[]>([]);
  
  const activeToast = useToast();
  const titleForm = useForm();
  const descricaoForm = useForm();
  const formRef = useRef<HTMLFormElement>(null);

  // Busca os tipos de perguntas disponíveis ao montar o componente
  useEffect(() => {
    const getTipoPerguntas = async () => {
      try {
        const { url, options } = GET_ALL("tipo-respostas");
        const { response, json } = await request(url, options);
        if (!response?.ok) throw new Error("Não foi possível buscar os tipos de pergunta");
        setTipoPergunta(json);
      } catch (error) {
        console.error(error);
      }
    };

    getTipoPerguntas();
  }, []);

  // Função para atualizar o tipo de pergunta selecionado
  const handleTipoPerguntaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentTipoPergunta(e.target.value);
  };

  // Evento para adicionar nova pergunta
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (titleForm.validate() && descricaoForm.validate()) {
      setPerguntasData((prevQuestions) => {
        const pergunta: PerguntasProps = {
          titulo: titleForm.value,
          descricao: descricaoForm.value,
          tipo_resposta_id: currentTipoPergunta,
          possui_sub_pergunta: tipoPergunta?.status || false,
        };
        return [...prevQuestions, pergunta];
      });
      
      setModalScreen({ nomeModal: "", status: false });
      activeToast({ message: "Pergunta Cadastrada", type: "success" });
    } else {
      activeToast({ message: "Preencha os campos obrigatórios", type: "warning" });
    }
  };

  const handleCloseModal = (e: React.FormEvent) => {
    e.preventDefault();
    setModalScreen({ nomeModal: "", status: false });
  };

  console.log(currentTipoPergunta);
  

  // Renderiza spinner enquanto carrega os tipos de perguntas
  if (!tipoPergunta || loading) return <p>Carregando...</p>;

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
        options={tipoPergunta}
        onChange={handleTipoPerguntaChange}
        value={currentTipoPergunta}
      />
      {currentTipoPergunta === "3" && (
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
