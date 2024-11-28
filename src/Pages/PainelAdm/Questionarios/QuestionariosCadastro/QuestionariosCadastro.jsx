import React, { useContext, useEffect, useState } from "react";
import styles from "./QuestionariosCadastro.module.css";
import Title from "../../../../Components/Titles/Title";
import InputText from "../../../../Components/Forms/Input/InputText";
import useTokenValidate from "../../../../Hooks/useTokenValidate";
import Button from "../../../../Components/Button/Button";
import { Link } from "react-router-dom";
import Plus from "../../../../assets/icons/plus.svg";
import QuestionCard from "./QuestionCard/QuestionCard";
import useFetch from "../../../../Hooks/useFetch";
import useForm from "../../../../Hooks/useForm";
import { GlobalContext } from "../../../../Hooks/GlobalContext";
import { POST_DATA } from "../../../../Api/api";
import Toast from "../../../../Components/Toast/Toast";

const QuestionariosCadastro = () => {
  const [statusCadastro, setStatusCadastro] = useState({
    mensagem: "",
    status: false,
  });
  const { fetchValidaToken, userAuth } = useTokenValidate();
  const { request, loading, error } = useFetch();

  const tituloForm = useForm();
  const vigenciaInicioForm = useForm();
  const vigenciaFimForm = useForm();
  const descricaoForm = useForm();
  const statusForm = useForm();
  const tipoForm = useForm();

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
      const dataQuestionario = {
        titulo: tituloForm.value,
        descricao: descricaoForm.value,
        vigencia_inicio: vigenciaInicioForm.value,
        vigencia_fim: vigenciaFimForm.value,
        usuario_id: userAuth.usuario.id,
        tipo: tipoForm.value,
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
          setStatusCadastro({
            mensagem: "Questionario Cadastrado",
            status: true,
          });
        }
      }
      postQuestionario();
    } else {
      setStatusCadastro({
        mensagem: "Preencha os campos necessarios",
        status: true,
      });
      setTimeout(() => {
        setStatusCadastro({ mensagem: "", status: false });
      }, 2000);
    }
  }

  return (
    <div className={styles.container}>
      <Title text="Cadastrar Questionário" fontSize="3" />
      <form className={styles.form}>
        <InputText {...tituloForm} label="Titulo" gridColumn="1/3" />
        <InputText
          {...vigenciaInicioForm}
          type="date"
          label="Vigencia Inicio"
          gridColumn="3"
        />
        <InputText
          {...vigenciaFimForm}
          type="date"
          label="Vigencia Fim"
          gridColumn="4"
        />
        <InputText {...descricaoForm} label="Descrição" gridColumn="1/5" />
        <InputText {...tipoForm} label="Tipo" gridColumn="1/5" />
  
      </form>
      <div className={styles.line}></div>
      <div className={styles.newQuestions}>
        <div className={styles.header}>
          <Title text="Perguntas" fontSize="2" />
          <Link to={"/questionario/cadastro"} className={styles.button}>
            <img src={Plus} alt="" />
            Nova Pergunta
          </Link>
        </div>
        <div className={styles.questionsList}>
          <QuestionCard text="Há Quanto tempo reside em Taiaçupeba?" />
          <QuestionCard text="Há Quanto tempo reside em Taiaçupeba?" />
          <QuestionCard text="Há Quanto tempo reside em Taiaçupeba?" />
          <QuestionCard text="Há Quanto tempo reside em Taiaçupeba?" />
          <QuestionCard text="Há Quanto tempo reside em Taiaçupeba?" />
        </div>
      </div>
      <Button handleSubmit={handleSubmit}>
        {loading ? "Salvando..." : "Salvar"}
      </Button>
    </div>
  );
};

export default QuestionariosCadastro;
