import React, { useEffect, useRef, useState } from "react";
import styles from "./QuestionariosCadastro.module.css";
import useTokenValidate from "../../../../Hooks/useTokenValidate";
import Button from "../../../../Components/Button/Button.tsx";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../../Hooks/useFetch";
import useForm from "../../../../Hooks/useForm.tsx";
import { GET_TO_WHERE, POST_DATA, UPDATE_DATA } from "../../../../Api/api";
import "react-toastify/dist/ReactToastify.css";
import useToast from "../../../../Hooks/useToast";
import QuestionConfig from "./QuestionConfig/QuestionConfig.tsx";
import ModalScreen from "../../../../Components/ModalScreen/ModalScreen.tsx";
import { useGlobalContext } from "../../../../Hooks/GlobalContext.tsx";
import { convertDataUS } from "../../../../plugins/convertData";
import QuestionarioForm from "./QuestionarioForm/QuestionarioForm.tsx";
import LoadingCenterComponent from "../../../../Components/Utils/LoadingCenterComponent/LoadingCenterComponent";
import QuestionList from "./QuestionList/QuestionList";
import { Form } from "../QuestionariosLista/QuestionariosLista";
import { QuestionarioResposta } from "../../../../Components/Formularios/QuestionarioResposta/QuestionarioResposta.tsx";

export interface questionListProps {
  formulario_id: string;
  titulo: string;
  descricao: string;
  tipo_resposta: string;
  possui_sub_pergunta: boolean;
  multipleQuestionOptions?: { titulo: string }[] | null;
}

export interface QuestionForm {
  form: Form;
  question: questionListProps[];
}

const QuestionariosCadastro = () => {
  const { fetchValidaToken, userAuth } = useTokenValidate();
  const { request, loading, error } = useFetch();
  const { modal, dataUpdate } = useGlobalContext();
  const [questionList, setQuestionList] = useState<questionListProps[]>([]);

  const formRef = useRef<HTMLFormElement>(null);
  const activeToast = useToast();
  const tituloForm = useForm();
  const vigenciaInicioForm = useForm();
  const vigenciaFimForm = useForm();
  const descricaoForm = useForm();
  const tipoForm = useForm();
  const navigation = useNavigate();

  useEffect(() => {
    fetchValidaToken();

    if (dataUpdate) {
      tituloForm.setValue(dataUpdate.titulo);
      descricaoForm.setValue(dataUpdate.descricao);
      vigenciaInicioForm.setValue(convertDataUS(dataUpdate.vigencia_inicio));
      vigenciaFimForm.setValue(convertDataUS(dataUpdate.vigencia_fim));
      tipoForm.setValue(dataUpdate.tipo);
      setTimeout(() => {
        if (formRef.current) {
          formRef.current["status"].value = dataUpdate.status ? "1" : "2";
        }
      }, 500);

      getQuestions();
    }
  }, [userAuth.rule]);

  //cria novo formulario
  function createForm(dataQuestionario: QuestionForm) {
    
    const { url, options } = POST_DATA("formularios", dataQuestionario);
    return { url, options };
  }
  

  // atualiza formulario
  function updateForm(dataQuestionario: QuestionForm) {
    const { url, options } = UPDATE_DATA(
      "formularios",
      dataQuestionario,
      dataUpdate.id,
      userAuth.token
    );
    return { url, options };
  }

  // pega perguntas cadastradas na atualização do formulario
  async function getQuestions() {
    const { url, options } = GET_TO_WHERE(
      "perguntas",
      "formulario_id",
      dataUpdate.id
    );
    const { response, json } = await request(url, options);
    if (!response?.ok) {
      throw new Error("Não foi possivel buscar as perguntas");
    }
    if (!json?.data) {
      throw new Error("Formato inesperado de resposta da API");
    }
    const data: questionListProps[] = json.data;
    setQuestionList(data);
  }

  function handleSubmit(e: React.MouseEvent) {
    e.preventDefault();
    if (
      tituloForm.validate() &&
      vigenciaInicioForm.validate() &&
      vigenciaFimForm.validate() &&
      descricaoForm.validate() &&
      tipoForm.validate() &&
      userAuth.status // apenas cadastrar com usuario logado/autenticado
    ) {
      if (vigenciaInicioForm.value > vigenciaFimForm.value) {
        return activeToast({
          message: "Inicio da vigencia maior do que o fim",
          type: "warning",
        });
      }

      const dataQuestionario = {
        form: {
          titulo: tituloForm.value,
          descricao: descricaoForm.value,
          vigencia_inicio: vigenciaInicioForm.value,
          vigencia_fim: vigenciaFimForm.value,
          usuario_id: userAuth.usuario.id,
          tipo: tipoForm.value,
          status: formRef.current
            ? formRef.current["status"].value === "1"
              ? true
              : false
            : false,
        },
        question: questionList,
      };

      async function postQuestionario() {
        if (dataQuestionario.question.length < 1) {
          window.alert("Por favor, insira pelo menos uma pergunta");
          return;
        }

        const { url, options } = dataUpdate
          ? updateForm(dataQuestionario)
          : createForm(dataQuestionario);

        const questionarioRequest = await request(url, options);

        if (questionarioRequest.response?.ok) {
          const message = questionarioRequest.json.message;
          tituloForm.reset();
          vigenciaInicioForm.reset();
          vigenciaFimForm.reset();
          descricaoForm.reset();
          tipoForm.reset();
          activeToast({ message, type: "success" });
          navigation(-1);
        } else {
          if (error) activeToast({ message: error, type: "error" });
        }
      }
      postQuestionario();
    } else {
      activeToast({
        message: "Preencha os campos obrigatórios",
        type: "warning",
      });
    }
  }

  function handleCardDelete(index: number) {
    setQuestionList((prevData) => prevData.filter((_, i) => i !== index));
  }

  if (loading) return <LoadingCenterComponent />;
  if (error) return <p>Erro ao carregar os dados: {error}</p>;
  return (
    <div
      data-aos="fade-right"
      data-aos-easing="linear"
      data-aos-duration="500"
      className={`${styles.container} `}
    >
      <div className={styles.header}>
        {/* <Title text="Cadastrar Questionário" fontSize="3" /> */}
        <span style={{ cursor: "pointer" }} onClick={() => navigation(-1)}>
          Voltar
        </span>
      </div>
      <QuestionarioForm
        formRef={formRef}
        tituloForm={tituloForm}
        vigenciaInicioForm={vigenciaInicioForm}
        vigenciaFimForm={vigenciaFimForm}
        descricaoForm={descricaoForm}
        tipoForm={tipoForm}
      />
      <div className={styles.line}></div>
      <QuestionList
        questionList={questionList}
        handleCardDelete={handleCardDelete}
        // setModal={setModal}
      />
      <Button handleSubmit={handleSubmit}>
        {loading ? "Salvando..." : "Salvar"}
      </Button>
      {modal === "show-QuestionConfig" && (
        <ModalScreen>
          <QuestionConfig setQuestionList={setQuestionList} />
        </ModalScreen>
      )}
     
    </div>
  );
};

export default QuestionariosCadastro;
