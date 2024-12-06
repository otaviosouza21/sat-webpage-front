import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./QuestionariosCadastro.module.css";
import Title from "../../../../Components/Titles/Title";
import InputText from "../../../../Components/Forms/Input/InputText";
import useTokenValidate from "../../../../Hooks/useTokenValidate";
import Button from "../../../../Components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import Plus from "../../../../assets/icons/plus.svg";
import useFetch from "../../../../Hooks/useFetch";
import useForm from "../../../../Hooks/useForm";
import { GET_TO_WHERE, POST_DATA } from "../../../../Api/api";
import "react-toastify/dist/ReactToastify.css";
import useToast from "../../../../Hooks/useToast";
import QuestionConfig from "./QuestionConfig/QuestionConfig";
import ModalScreen from "../../../../Components/ModalScreen/ModalScreen";
import { GlobalContext } from "../../../../Hooks/GlobalContext";
import QuestionCard from "./QuestionCard/QuestionCard";
import InputSelect from "../../../../Components/Forms/Input/InputSelect";
import { convertData, convertDataUS } from "../../../../plugins/convertData";

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
      formRef.current["status"].value = dataUpdate.status ? "1" : "2";

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
      getQuestions();
    }
  }, [userAuth.rule]);

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

        const { url, options } = POST_DATA("formularios", dataQuestionario);
        const questionarioRequest = await request(url, options);
        if (questionarioRequest.response.ok) {
          tituloForm.reset();
          vigenciaInicioForm.reset();
          vigenciaFimForm.reset();
          descricaoForm.reset();
          tipoForm.reset();
          activeToast("Questionário cadastrado", "success");
          setTimeout(() => {
            navigation(-1);
          }, 2000);
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

  return (
    <div
      data-aos="fade-right"
      data-aos-easing="linear"
      data-aos-duration="500"
      className={`${styles.container} `}
    >
      <div className={styles.header}>
        {/* <Title text="Cadastrar Questionário" fontSize="3" /> */}
        <span onClick={() => navigation(-1)}>Voltar</span>
      </div>
      <form ref={formRef} className={styles.form}>
        <InputText {...tituloForm} label="Titulo" gridColumn="1/3" />
        <InputText
          {...vigenciaInicioForm}
          type="date"
          label="Vigencia Inicio"
          gridColumn="3"
        />
        <div>
          <InputText
            {...vigenciaFimForm}
            type="date"
            label="Vigencia Fim"
            gridColumn="4"
          />
        </div>
        <InputText {...descricaoForm} label="Descrição" gridColumn="1/5" />
        <InputText {...tipoForm} label="Tipo" gridColumn="1/4" />
        <InputSelect
          label="Status"
          id="status"
          options={[
            { id: 1, nome: "Ativo" },
            { id: 2, nome: "Inativo" },
          ]}
          gridColumn="2"
        />
      </form>
      <div className={styles.line}></div>
      <div className={styles.newQuestions}>
        <div className={styles.header}>
          {/*  <Title text="Perguntas" fontSize="2" /> */}
          <div
            onClick={() => setModal("show-QuestionConfig")}
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
                  text={question.titulo}
                />
              );
            })
          ) : (
            <p style={{ margin: "10px 0px" }}>Sem perguntas cadastradas</p>
          )}
        </ul>
      </div>
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
