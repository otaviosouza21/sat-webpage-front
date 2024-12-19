import React, { useEffect, useRef, useState } from "react";
import styles from "./QuestionariosCadastro.module.css";
import useTokenValidate from "../../../../Hooks/useTokenValidate";
import Button from "../../../../Components/Button/Button.tsx";
import { useActionData, useNavigate } from "react-router-dom";
import useFetch from "../../../../Hooks/useFetch";
import useForm from "../../../../Hooks/useForm.tsx";
import {
  GET_ALL,
  GET_TO_WHERE,
  POST_DATA,
  UPDATE_DATA,
} from "../../../../Api/api";
import "react-toastify/dist/ReactToastify.css";
import useToast from "../../../../Hooks/useToast";
import QuestionConfig from "./QuestionConfig/QuestionConfig.tsx";
import ModalScreen from "../../../../Components/ModalScreen/ModalScreen.tsx";
import { useGlobalContext } from "../../../../Hooks/GlobalContext.tsx";
import { convertDataUS } from "../../../../plugins/convertData";
import QuestionarioForm from "./QuestionarioForm/QuestionarioForm.tsx";
import LoadingCenterComponent from "../../../../Components/Utils/LoadingCenterComponent/LoadingCenterComponent";
import QuestionList from "./QuestionList/QuestionList";
import { Form } from "../QuestionariosLista/QuestionariosLista";
import { QuestionarioResposta } from "../../../../Components/Formularios/QuestionarioResposta/QuestionarioResposta.tsx";
import { defaultPerguntasProps, defaultQuestionario, PerguntasProps, QuestionarioCompletoProps, subPerguntasProps, tipoFormularioProps } from "../../../../types/apiTypes.ts";

export interface questionListProps {
  formulario_id: string;
  titulo: string;
  descricao: string;
  tipo_resposta: string;
  possui_sub_pergunta: boolean;
  multipleQuestionOptions?: { titulo: string }[] | null;
}

export interface QuestionForm {
  form: Form;
  question: questionListProps[];
}

const QuestionariosCadastro = () => {
  const { modal, dataUpdate, modalScreen } = useGlobalContext();
  const { fetchValidaToken, userAuth } = useTokenValidate();
  const { request, loading, error,data } = useFetch();

  const [formularioData, setFormularioData] =useState<Form>(defaultQuestionario);
  const [perguntasData,setPerguntasData] = useState<PerguntasProps[] | null>(null)
  const [subPerguntasData,setSubPerguntasData] = useState<subPerguntasProps[] | null >(null)

  const [tipoFormulario,setTiposFormulario] = useState<tipoFormularioProps[] | null>(null)

  const [currentTipoForm,setCurrentTipoForm] = useState<string>("0")
  const [statusForm,setStatusForm] = useState<string>("1")
 


  const formRef = useRef<HTMLFormElement>(null);
  const activeToast = useToast();
  const tituloForm = useForm();
  const vigenciaInicioForm = useForm();
  const vigenciaFimForm = useForm();
  const descricaoForm = useForm();
  const navigation = useNavigate();


  

  // valida token de usuario logado
  useEffect(() => {
    fetchValidaToken();
    async function getTiposFormulario() {
      const { url, options } = GET_ALL("tipos-formulario");
      const { response, json } = await request(url, options);
      if(!response?.ok) throw new Error('Não foi possivel puxar tipos do formulario')
      setTiposFormulario(json)
      }
      getTiposFormulario();
  }, []);


  //Pega os tipos de fomulario ao carregar
  async function getTiposFormulario() {
    const { url, options } = GET_ALL("tipos-formulario");
    const { response, json } = await request(url, options);
    if(!response?.ok) throw new Error('Não foi possivel puxar tipos do formulario')
  }

  //cria novo formulario
  function createForm(dataQuestionario: QuestionarioCompletoProps) {
    const { url, options } = POST_DATA("formularios", dataQuestionario);
    return { url, options };
  }

  // atualiza formulario
  function updateForm(dataQuestionario: QuestionForm) {
    const { url, options } = UPDATE_DATA(
      "formularios",
      dataQuestionario,
      dataUpdate.id,
      userAuth.token
    );
    return { url, options };
  }

// inciar cadastro do formulario apos evento de clique no botao
  async function handleSubmit(e: React.MouseEvent) {
    e.preventDefault();
    if (
      tituloForm.validate() &&
      vigenciaInicioForm.validate() &&
      vigenciaFimForm.validate() &&
      descricaoForm.validate() &&
      userAuth.status // apenas cadastrar com usuario logado/autenticado
    ) {

      if (vigenciaInicioForm.value > vigenciaFimForm.value) {
        return activeToast({
          message: "Inicio da vigencia maior do que o fim",
          type: "warning",
        });
      }

      // monta Formulario Principal
      setFormularioData({
        titulo: tituloForm.value,
        descricao: descricaoForm.value,
        vigencia_inicio: vigenciaInicioForm.value,
        vigencia_fim: vigenciaInicioForm.value,
        usuario_id: userAuth.usuario.id,
        status: true,
        tipo_id: Number(currentTipoForm)
      })

   //Monta Perguntas completas
      const perguntasCompletas = perguntasData?.map(pergunta=>{
        const perguntaCompleta = {...pergunta,
          opcoes_resposta: pergunta.possui_sub_pergunta && subPerguntasData
        }
        return perguntaCompleta
      })

      const formularioCompleto =  {
        form: {
          ...formularioData,
          perguntas: perguntasCompletas
        }
      }


      if(formularioCompleto) {
        const {url,options} = createForm(formularioCompleto)
        const {response,json} = await request(url,options);
        console.log(formularioCompleto);
        
        
        if(!response?.ok) throw new Error("Erro ao cadastrar Formulario") 
        activeToast({message: "Formulario Cadastrado com sucesso", type: "success"})
      }
      
    } else {
      activeToast({
        message: "Preencha os campos obrigatórios",
        type: "warning",
      });
    }
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
        tipoForm={tipoFormulario}
        setCurrentTipoForm={setCurrentTipoForm}
        currentTipoForm={currentTipoForm}
        setStatusForm={setStatusForm}
        statusForm={statusForm}
      />
      <div className={styles.line}></div>
     <QuestionList
        perguntasData={perguntasData}
        setPerguntasData={setPerguntasData}
      /> 
      <Button handleSubmit={handleSubmit}>
        {loading ? "Salvando..." : "Salvar"}
      </Button>

      <ModalScreen>
        <QuestionConfig setPerguntasData={setPerguntasData} setSubPerguntasData={setSubPerguntasData} />
      </ModalScreen>
    </div>
  );
};

export default QuestionariosCadastro;
