import React, { useContext, useEffect, useState } from "react";
import styles from "./QuestionariosCadastro.module.css";
import Title from "../../../../Components/Titles/Title";
import InputText from "../../../../Components/Forms/Input/InputText";
import useTokenValidate from "../../../../Hooks/useTokenValidate";
import Button from "../../../../Components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import Plus from "../../../../assets/icons/plus.svg";
import useFetch from "../../../../Hooks/useFetch";
import useForm from "../../../../Hooks/useForm";
import { POST_DATA } from "../../../../Api/api";
import "react-toastify/dist/ReactToastify.css";
import useToast from "../../../../Hooks/useToast";
import QuestionConfig from "./QuestionConfig/QuestionConfig";
import ModalScreen from "../../../../Components/ModalScreen/ModalScreen";
import { GlobalContext } from "../../../../Hooks/GlobalContext";
import QuestionCard from "./QuestionCard/QuestionCard";

const QuestionariosCadastro = () => {
  const { fetchValidaToken, userAuth } = useTokenValidate();
  const { request, loading, error } = useFetch();
  const { setModal, modal } = useContext(GlobalContext);
  const [questionList, setQuestionList] = useState([]);
  const [fimVigencia, setFimVigencia] = useState(false);

  const activeToast = useToast();

  const tituloForm = useForm();
  const vigenciaInicioForm = useForm();
  const vigenciaFimForm = useForm();
  const descricaoForm = useForm();
  const tipoForm = useForm();

  const navigation = useNavigate();

  useEffect(() => {
    fetchValidaToken();
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
        },
        question: [...questionList],
      };

      async function postQuestionario() {
        const { url, options } = POST_DATA("formularios", dataQuestionario);
        const questionarioRequest = await request(url, options);
        if (questionarioRequest.response.ok) {
          tituloForm.reset();
          vigenciaInicioForm.reset();
          vigenciaFimForm.reset();
          descricaoForm.reset();
          tipoForm.reset();
          activeToast("Questionário cadastrado", "success");
        } else {
          activeToast(error, "error");
        }
      }
      postQuestionario();
    } else {
      activeToast("Preencha os campos obrigatórios", "warning");
    }
  }

  function handleChangeCheckbox() {
    setFimVigencia(!fimVigencia);
  }

  console.log(fimVigencia);
  
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title text="Cadastrar Questionário" fontSize="3" />
        <span onClick={() => navigation(-1)}>Voltar</span>
      </div>
      <form className={styles.form}>
        <InputText {...tituloForm} label="Titulo" gridColumn="1/3" />
        <InputText
          {...vigenciaInicioForm}
          type="date"
          label="Vigencia Inicio"
          gridColumn="3"
        />
        <div>
          <input checked={fimVigencia} onChange={handleChangeCheckbox} type="checkbox" />
          <InputText
            {...vigenciaFimForm}
            type="date"
            label="Vigencia Fim"
            gridColumn="4"
          />
        </div>
        <InputText {...descricaoForm} label="Descrição" gridColumn="1/5" />
        <InputText {...tipoForm} label="Tipo" gridColumn="1/5" />
      </form>
      <div className={styles.line}></div>
      <div className={styles.newQuestions}>
        <div className={styles.header}>
          <Title text="Perguntas" fontSize="2" />
          <div
            onClick={() => setModal("show-QuestionConfig")}
            className={styles.button}
          >
            <img src={Plus} alt="" />
            Nova Pergunta
          </div>
        </div>
        <ul className={styles.questionsList}>
          {questionList.map((question) => {
            return <QuestionCard text={question.titulo} />;
          })}
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
