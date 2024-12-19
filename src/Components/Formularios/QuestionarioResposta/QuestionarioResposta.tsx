import React, { useEffect, useState } from "react";
import styles from "../Cadastros/CadastroForm.module.css";
import Title from "../../Titles/Title";
import { PerguntasProps, QuestionarioProps } from "../../../types/apiTypes";
import useFetch from "../../../Hooks/useFetch";
import { GET_TO_ID, GET_TO_WHERE } from "../../../Api/api";
import useToast from "../../../Hooks/useToast";
import InputText from "../Forms/Input/InputText";
import Button from "../../Button/Button";

export const QuestionarioResposta = () => {
  const [currentQuestionario, setCurrentQuestionario] =
    useState<QuestionarioProps>();
  const [currentPerguntas, setCurrentPerguntas] = useState<PerguntasProps[]>();
  const activeToast = useToast();
  const { request, loading, error, data } = useFetch();

  async function getQuestions(id: number) {
    async function fetchQuestionario() {
      const { url, options } = GET_TO_WHERE(
        "perguntas",
        "formulario_id",
        String(id)
      );
      const { response, json } = await request(url, options);
      if (response?.ok) {
        const perguntas = json.data;
        setCurrentPerguntas(perguntas);
      
      } else {
        activeToast({
          message: "Ocorreu um erro ao buscar dados",
          type: "error",
        });
      }
    }

    fetchQuestionario();
  }

  useEffect(() => {
    async function fetchQuestionario() {
      const { url, options } = GET_TO_ID("formularios", String(218));
      const { response, json } = await request(url, options);
      if (response?.ok) {
        const questionario = json.data;
        setCurrentQuestionario(questionario);
        getQuestions(Number(currentQuestionario?.id));
      } else {
        activeToast({
          message: "Ocorreu um erro ao buscar dados",
          type: "error",
        });
      }
    }

    fetchQuestionario();
  }, []);

  return (
    <form className={styles.containerForm}>
      <Title
        text={currentQuestionario?.titulo}
        subtitle={currentQuestionario?.descricao}
        fontSize="2"
      />
      {currentPerguntas &&
        currentPerguntas.map((pergunta) => {
          return <InputText label={pergunta.descricao} />;
        })}
      <Button>Enviar Resposta</Button>
    </form>
  );
};
