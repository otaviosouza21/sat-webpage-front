import React, { useEffect, useState } from "react";
import Title from "../../../../Components/Titles/Title";
import Plus from "../../../../assets/icons/plus.svg";
import styles from "./QuestionarioLista.module.css";
import { Link, useNavigate } from "react-router-dom";
import useFetch from "../../../../Hooks/useFetch";
import {
  DELETE_DATA,
  DELETE_DATA_FORM,
  GET_ALL,
  GET_TO_WHERE,
} from "../../../../Api/api";
import { convertData } from "../../../../plugins/convertData";
import TrashIcon from "../../../../assets/svgFlies/TrashIcon";
import PenIcon from "../../../../assets/svgFlies/PenIcon";
import useTokenValidate from "../../../../Hooks/useTokenValidate";
import useToast from "../../../../Hooks/useToast";

const QuestionariosLista = () => {
  const { request, loading, error } = useFetch();
  const [formulariosData, setFormulariosData] = useState([]);
  const { fetchValidaToken, userAuth } = useTokenValidate();
  const [update,setUpdate] = useState(false)
  const activeToast = useToast();

  useEffect(() => {
    fetchValidaToken();
  }, [userAuth.rule]);



  useEffect(() => {
    async function postQuestionario() {
      const { url, options } = GET_ALL("formularios");
      const questionarioRequest = await request(url, options);

      if (!questionarioRequest.response?.ok)
        throw new Error("Não foi possivel puxar dados");
      setFormulariosData(questionarioRequest.json.data);
    }
    postQuestionario();
  }, []);

  async function getQuestionsVerify(id) {
    const { url, options } = GET_TO_WHERE("perguntas", "formulario_id", id);
    const perguntasGetRequest = await request(url, options);
    return perguntasGetRequest.json.data;
  }

  async function handleDelete(id) {
    const questionsData = await getQuestionsVerify(id);

    if (questionsData.length > 0) {
      const { url, options } = DELETE_DATA_FORM("perguntas", id);
      const perguntasRequest = await request(url, options);

      if (perguntasRequest.response.ok) {
        const { url, options } = DELETE_DATA("formularios", id);
        const questionarioRequest = await request(url, options);
        if (questionarioRequest.response.ok) {
          activeToast("Questionário Deletado com sucesso", "warning");
          setFormulariosData(prevData => prevData.filter(form => form.id !== id));
        } else {
          activeToast("Falha ao deletar questionario", "success");
        }
      }
    } else {
      const { url, options } = DELETE_DATA("formularios", id);
      const questionarioRequest = await request(url, options);
      activeToast("Questionário Deletado com sucesso", "warning");
      setUpdate(!update)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title text="Questionários" fontSize="3" />
        <Link to={"/questionario/cadastro"} className={styles.button}>
          <img src={Plus} alt="" />
          Novo Questionário
        </Link>
      </div>
      <ul className={styles.cards}>
        {formulariosData ? (
          formulariosData.map((form, index) => {
            return (
              <li key={index} className={styles.card}>
                <h4>{form.titulo}</h4>
                <p>{form.descricao}</p>
                <div className={styles.data}>
                  <span>Inicio: {convertData(form.vigencia_inicio)}</span>
                  <span>Fim: {convertData(form.vigencia_fim)}</span>
                </div>
                <div className={styles.icons}>
                  <TrashIcon
                    onclick={() => handleDelete(form.id)}
                    color={"green"}
                    size="30px"
                  />
                  <PenIcon color={"green"} size="30px" />
                </div>
              </li>
            );
          })
        ) : (
          <p>Impossivel exibir dados</p>
        )}
      </ul>
    </div>
  );
};

export default QuestionariosLista;
