import React, { useEffect, useState } from "react";
import styles from "./QuestionarioResposta.module.css";
import CloseButton from "../../../../Components/CloseButton/CloseButton";
import Title from "../../../../Components/Titles/Title";
import { useGlobalContext } from "../../../../Hooks/GlobalContext";
import useFetch from "../../../../Hooks/useFetch";
import { GET_ALL, GET_TO_WHERE } from "../../../../Api/api";
import useToast from "../../../../Hooks/useToast";
import {
  PerguntasProps,
  QuestionarioCompletoProps,
  subPerguntasProps,
} from "../../../../types/apiTypes";
import LoadingDots from "../../../../Components/Utils/LoadingDots/LoadingDots";
import InputText from "../../../../Components/Formularios/Forms/Input/InputText";
import Button from "../../../../Components/Button/Button";
import InputSelect from "../../../../Components/Formularios/Forms/Input/InputSelect";

const QuestionarioResposta = ({ tipoForm }: { tipoForm: string }) => {
  const { setModalScreen } = useGlobalContext();
  const { request, error, loading, data } = useFetch();
  const activeToast = useToast();
  const [currentQuestionario, setCurrentQuestionario] =
    useState<QuestionarioCompletoProps | null>(null);
  const [currentPerguntas, setCurrentPerguntas] = useState<
    PerguntasProps[] | null
  >(null);

  useEffect(() => {
    getFormulario();
  }, []);



  async function getFormulario() {
    const { url, options } = GET_TO_WHERE("formularios", "tipo_id", tipoForm);
    const { response, json } = await request(url, options);
    if (!response?.ok) {
      setModalScreen({ nomeModal: "", status: false });
    }
    const data = json.data.retorno;
    setCurrentQuestionario(data[0]);
    setCurrentPerguntas(data[0].Pergunta);
  }

  const handleCloseModal = (e: React.FormEvent) => {
    e.preventDefault();
    window.localStorage.setItem("questionario-status", "s");
    setModalScreen({ nomeModal: "", status: false });
  };


  if (loading) return <LoadingDots />;
  return (
    <form
      data-aos="fade-right"
      data-aos-easing="linear"
      data-aos-duration="500"
      className={styles.container}
    >
      <div className={styles.header}>
        <div className={styles.title}>
          <Title text={currentQuestionario?.titulo} fontSize="2" />
          <p>{currentQuestionario?.descricao}</p>
        </div>
        <CloseButton closeModal={handleCloseModal} />
      </div>
      <form className={styles.inputs}>
        {currentPerguntas &&
          currentPerguntas.map((pergunta) => {
            if (pergunta.possui_sub_pergunta) {
              const subPerguntas = Array.isArray(pergunta?.SubPergunta)
                ? pergunta.SubPergunta
                : [];

              if (subPerguntas && subPerguntas?.length > 0) {
                const options = subPerguntas.map((sub, index) => {
                  return { id: index, nome: sub.titulo };
                });

                return (
                  <InputSelect
                    id=""
                    label={pergunta.titulo}
                    options={options}
                  />
                );
              }
            }
            return (
              <InputText
                label={pergunta.titulo}
                placeholder={pergunta.descricao}
              />
            );
          })}
      </form>
      <Button>Enviar</Button>
    </form>
  );
};

export default QuestionarioResposta;
