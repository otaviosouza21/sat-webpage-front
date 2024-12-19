import { useEffect, useState } from "react";

import styles from "./QuestionarioLista.module.css";
import { Link, useNavigate } from "react-router-dom";
import useFetch from "../../../../Hooks/useFetch";
import { DELETE_DATA, GET_ALL } from "../../../../Api/api";
import useTokenValidate from "../../../../Hooks/useTokenValidate";
import useToast from "../../../../Hooks/useToast.tsx";

import LoadingCenterComponent from "../../../../Components/Utils/LoadingCenterComponent/LoadingCenterComponent";
import { useGlobalContext } from "../../../../Hooks/GlobalContext.tsx";
import QuestionarioCardList from "./QuestionarioCard/QuestionarioCardList.tsx";
import HeaderQuestionarioLista from "./HeaderQuestionarioLista/HeaderQuestionarioLista.tsx";
import { QuestionarioCompletoProps } from "../../../../types/apiTypes.ts";

export interface Form {
  id?: number;
  descricao: string;
  status: boolean;
  tipo_id: number;
  titulo: string;
  usuario_id: number;
  vigencia_fim: string;
  vigencia_inicio: string;
}

const QuestionariosLista = () => {
  const { request, loading, error } = useFetch();
  const [formulariosData, setFormulariosData] = useState<QuestionarioCompletoProps[]>([]);
  const { fetchValidaToken, userAuth } = useTokenValidate();
  const { setDataUpdate } = useGlobalContext();
  const navigate = useNavigate();
  const activeToast = useToast();

  useEffect(() => {
    fetchValidaToken();
  }, [userAuth.rule]);

  useEffect(() => {
    async function getQuestionarios() {
      const { url, options } = GET_ALL("formularios");
      const {response,json} = await request(url, options);

      if (!response?.ok) {
        throw new Error("Não foi possivel puxar dados");
      } 
      const {retorno} = json.data
    
      setFormulariosData(retorno);
    }
    getQuestionarios();
  }, []);

  
  

  async function handleDelete(id: number) {
    const { url, options } = DELETE_DATA("formularios", id, userAuth.token);
    const questionarioRequest = await request(url, options);
    if (questionarioRequest.response?.ok) {
      activeToast({
        message: "Questionário Deletado com sucesso",
        type: "warning",
      });
      setFormulariosData((prevData) =>
        prevData.filter((form) => form.id !== id)
      );
    } else {
      throw new Error("Não foi possivel deletar dados");
    }
  }

  async function handleEdit(form: Form) {
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
