import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./QuestionariosCadastro.module.css";
import useTokenValidate from "../../../../Hooks/useTokenValidate";
import Button from "../../../../Components/Button/Button";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../../Hooks/useFetch";
import useForm from "../../../../Hooks/useForm";
import { GET_TO_WHERE, POST_DATA, UPDATE_DATA } from "../../../../Api/api";
import "react-toastify/dist/ReactToastify.css";
import useToast from "../../../../Hooks/useToast";
import QuestionConfig from "./QuestionConfig/QuestionConfig";
import ModalScreen from "../../../../Components/ModalScreen/ModalScreen";
import { GlobalContext } from "../../../../Hooks/GlobalContext";
import { convertDataUS } from "../../../../plugins/convertData";
import QuestionarioForm from "./QuestionarioForm/QuestionarioForm";
import LoadingCenterComponent from "../../../../Components/Utils/LoadingCenterComponent/LoadingCenterComponent";
import QuestionList from "./QuestionList/QuestionList";

const QuestionariosCadastro = () => {
  const { fetchValidaToken, userAuth } = useTokenValidate();
  const { request, loading, error } = useFetch();
  const { setModal, modal, dataUpdate } = useContext(GlobalContext);
  const [questionList, setQuestionList] = useState([]);

  const formRef = useRef();
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
      setTimeout(()=>{
        formRef.current["status"].value = dataUpdate.status ? "1" : "2";
      },500)
    
      
      getQuestions();

    }
  }, [userAuth.rule]);

  //cria novo formulario
  function createForm(dataQuestionario) {
    const { url, options } = POST_DATA("formularios", dataQuestionario);
    return { url, options };
  }

// atualiza formulario
  function updateForm(dataQuestionario) {
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
    const perguntasRequest = await request(url, options);
    if (!perguntasRequest.response.ok)
      throw new Error("Não foi possivel buscar as perguntas");
    setQuestionList(perguntasRequest.json.data);
  }

 
  function handleSubmit(e) {
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
        return activeToast("Inicio da vigencia maior do que o fim", "warning");
      }

      const dataQuestionario = {
        form: {
          titulo: tituloForm.value,
          descricao: descricaoForm.value,
          vigencia_inicio: vigenciaInicioForm.value,
          vigencia_fim: vigenciaFimForm.value,
          usuario_id: userAuth.usuario.id,
          tipo: tipoForm.value,
          status: formRef.current["status"].value === "1" ? true : false,
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

        if (questionarioRequest.response.ok) {
          const message = questionarioRequest.json.message
          tituloForm.reset();
          vigenciaInicioForm.reset();
          vigenciaFimForm.reset();
          descricaoForm.reset();
          tipoForm.reset();
          activeToast(message, "success");
          navigation(-1);
        } else {
          activeToast(error, "error");
        }
      }
      postQuestionario();
    } else {
      activeToast("Preencha os campos obrigatórios", "warning");
    }
  }

  function handleCardDelete(index) {
    setQuestionList((prevData) => prevData.filter((_, i) => i !== index));
  }

  function handleChangeCheckbox() {
    setFimVigencia(!fimVigencia);
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
        setModal={setModal}
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
