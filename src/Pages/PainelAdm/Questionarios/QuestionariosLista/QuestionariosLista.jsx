import React, { useContext, useEffect, useState } from "react";
import Title from "../../../../Components/Titles/Title";
import Plus from "../../../../assets/icons/plus.svg";
import styles from "./QuestionarioLista.module.css";
import { Link, useNavigate } from "react-router-dom";
import useFetch from "../../../../Hooks/useFetch";
import { DELETE_DATA, GET_ALL } from "../../../../Api/api";
import useTokenValidate from "../../../../Hooks/useTokenValidate";
import useToast from "../../../../Hooks/useToast";

import LoadingCenterComponent from "../../../../Components/Utils/LoadingCenterComponent/LoadingCenterComponent";
import { GlobalContext } from "../../../../Hooks/GlobalContext";
import QuestionarioCardList from "./QuestionarioCardList";
import HeaderQuestionarioLista from "./HeaderQuestionarioLista";

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
      <HeaderQuestionarioLista />
      <ul className={styles.cards}>
        {formulariosData.length > 0 ? (
          formulariosData.map((form) => {
            return (
              <QuestionarioCardList
                key={form.id}
                form={form}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
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
