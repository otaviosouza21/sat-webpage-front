import React, { useContext, useEffect, useState } from "react";
import Title from "../../../../Components/Titles/Title";
import Plus from "../../../../assets/icons/plus.svg";
import styles from "./QuestionarioLista.module.css";
import { Link, useNavigate } from "react-router-dom";
import useFetch from "../../../../Hooks/useFetch";
import { DELETE_DATA, GET_ALL } from "../../../../Api/api";
import { convertData } from "../../../../plugins/convertData";
import TrashIcon from "../../../../assets/svgFlies/TrashIcon";
import PenIcon from "../../../../assets/svgFlies/PenIcon";
import useTokenValidate from "../../../../Hooks/useTokenValidate";
import useToast from "../../../../Hooks/useToast";
import LoadingDots from "../../../../Components/Utils/LoadingDots/LoadingDots";
import LoadingCenterComponent from "../../../../Components/Utils/LoadingCenterComponent/LoadingCenterComponent";
import { GlobalContext } from "../../../../Hooks/GlobalContext";

const QuestionariosLista = () => {
  const { request, loading, error } = useFetch();
  const [formulariosData, setFormulariosData] = useState([]);
  const { fetchValidaToken, userAuth } = useTokenValidate();
  const { setDataUpdate } = useContext(GlobalContext);
  const navigate = useNavigate();
  const activeToast = useToast();

  useEffect(() => {
    fetchValidaToken();
  }, [userAuth.rule]);

  useEffect(() => {
    async function getQuestionarios() {
      const { url, options } = GET_ALL("formularios");
      const questionarioRequest = await request(url, options);
      if (!questionarioRequest.response?.ok)
        throw new Error("Não foi possivel puxar dados");
      setFormulariosData(questionarioRequest.json.data);
    }
    getQuestionarios();
  }, []);

  async function handleDelete(id) {
    const { url, options } = DELETE_DATA("formularios", id);
    const questionarioRequest = await request(url, options);
    if (questionarioRequest.response.ok) {
      activeToast("Questionário Deletado com sucesso", "warning");
      setFormulariosData((prevData) =>
        prevData.filter((form) => form.id !== id)
      );
    } else {
      activeToast(error, "error");
    }
  }

  async function handleEdit(form) {
    setDataUpdate(form);
    navigate("/questionario/cadastro");
  }

  if (loading) return <LoadingCenterComponent />;
  if (error) return <p>Não foi possivel carregar dados</p>;
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title text="Questionários" fontSize="3" />
        <Link
          to={"/questionario/cadastro"}
          onClick={() => setDataUpdate('')}
          className={styles.button}
        >
          <img src={Plus} alt="" />
          Novo Questionário
        </Link>
      </div>
      <ul className={styles.cards}>
        {formulariosData.length > 0 ? (
          formulariosData.map((form, index) => {
            return (
              <li key={index} className={styles.card}>
                <div className={styles.header}>
                  <h4>{form.titulo}</h4>
                  <span
                    style={
                      form.status ? { color: "green" } : { color: "tomato" }
                    }
                  >
                    {form.status ? "Ativo" : "Inativo"}
                  </span>
                </div>
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
                  <PenIcon
                    onclick={() => handleEdit(form)}
                    color={"green"}
                    size="30px"
                  />
                </div>
              </li>
            );
          })
        ) : (
          <p style={{ margin: "16px 0" }}>Sem formularios cadastrados</p>
        )}
      </ul>
    </div>
  );
};

export default QuestionariosLista;
