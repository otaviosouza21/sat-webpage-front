import React, { useContext, useEffect, useRef, useState } from "react";
import { Header } from "../../Header/Header";
import Footer from "../../Footer/Footer";
import styles from "../CadastroForm.module.css";
import InputText from "../../Forms/Input/InputText";
import InputSelect from "../../Forms/Input/InputSelect";
import Button from "../../Button/Button";
import Title from "../../Titles/Title";
import useFetch from "../../../Hooks/useFetch";
import { GET_ALL, GET_AUTH_USER, POST_DATA, UPDATE_DATA } from "../../../Api/api";
import useForm from "../../../Hooks/useForm";
import Loading from "../../Utils/Loading/Loading";
import Toast from "../../Toast/Toast";
import { GlobalContext } from "../../../Hooks/GlobalContext";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AtualizaServico = () => {
  const [categorias, setCategorias] = useState();
  const { request, loading, error } = useFetch();
  const [statusCadastro, setStatusCadastro] = useState(null);
  const {dataUpdate,setModal,setUserAuth,userAuth} = useContext(GlobalContext);
  const formRef = useRef();
  const navigate = useNavigate();
  const nomeNegocioForm = useForm();
  const descricaoForm = useForm();
  const tempoNegocio = useForm();

//validação acesso
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    async function fetchValidaToken() {
      if (token) {
        const { id, rule } = jwtDecode(token);
        const { url, options } = GET_AUTH_USER("usuarios", token, id);
        const { response, json } = await request(url, options);
        if (response.ok) {
          setUserAuth({ token, usuario: json, status: true, rule });
        } else {
          setUserAuth();
        }

      }
    }
    fetchValidaToken();
  }, []);

  useEffect(() => {
      nomeNegocioForm.setValue(dataUpdate.nome_negocio);
      descricaoForm.setValue(dataUpdate.descricao_servico);
      tempoNegocio.setValue(dataUpdate.tempo_negocio);
      setTimeout(() => {
        formRef.current["categoria"].value = String(dataUpdate.categoria_id);
        formRef.current["status"].value = dataUpdate.status ? 'Ativo' : 'Inativo';
        }, 500);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (
      nomeNegocioForm.validate() &&
      descricaoForm.validate() &&
      tempoNegocio.validate() &&
      userAuth.status
    ) {
      const dataServico = {
        nome_negocio: nomeNegocioForm.value,
        descricao_servico: descricaoForm.value,
        tempo_negocio: +tempoNegocio.value,
        status: formRef.current["status"].value === "Ativo" ? true : false,
        categoria_id: +formRef.current["categoria"].value,
        usuario_id: userAuth.usuario.id,
        possui_nome_negocio: true
      };
     

      async function postServico() {
        const { url, options } = UPDATE_DATA("servico", dataServico, dataUpdate.id)
        const servicoRequest = await request(url, options);
        if (servicoRequest.response.ok) {
          setStatusCadastro("Serviço Atualizado com Sucesso");
          nomeNegocioForm.reset(); //limpa campos
          descricaoForm.reset();
          tempoNegocio.reset();
          setTimeout(() => {
            navigate("/servicos");
            setStatusCadastro(null);
          }, 1000);
        }
      }
      postServico();
    } else {
      setStatusCadastro("Por Favor, Preencha todos os Campos");
      setTimeout(() => {
      setStatusCadastro(null);
      }, 1000);
    }
  }


  // pega as categorias e salva no estado 
  useEffect(() => {
    async function getCategorias() {
      const { url, options } = GET_ALL("categoria_servico");
      const { response, json } = await request(url, options);
      if (!response.ok) {console.log("Falha ao buscar Categorias")}
      setCategorias(json);
    }
    getCategorias();
  }, []);

  if (loading) return <Loading />
  if (categorias)
    return (
      <section>
        <Header />
        {userAuth.status && userAuth.token ? (
          <section className={`${styles.cadastroContainer} container`}>
            <Title
              text="Atualizar Serviço"
              fontSize="3"
            />
            <form
              onSubmit={handleSubmit}
              ref={formRef}
              className={styles.cadastroUsuario}
            >
              <InputText
                label="Nome do Negocio"
                type="text"
                placeholder="Jardinagem"
                id="nome_negocio"
                gridColumn="1/2"
                {...nomeNegocioForm}
              />
              <InputText
                label="Descrição do Serviço*"
                type="text"
                placeholder="Escreva o serviço prestado"
                gridColumn="2/5"
                id="descricao_servico"
                {...descricaoForm}
              />
              <InputText
                label="A quanto tempo o seu negocio existe?"
                type="number"
                placeholder="Em Anos"
                id="tempo_negocio"
                gridColumn="1/3"
                {...tempoNegocio}
              />
              <InputSelect
                label="Categoria*"
                options={categorias}
                id="categoria"
              />

              {userAuth.status && userAuth.rule === 3 && (// Acesso ADM
                <InputSelect
                  label="Status"
                  options={[{ nome: "Ativo" }, { nome: "Inativo" }]}
                  id="status"
                />
              )}
              <Button handleSubmit={handleSubmit}>
                {loading ? "Salvando..." : "Salvar"}
              </Button>
              {error && <Toast message={error} color="text-bg-danger" />}
              {statusCadastro && (
                <Toast message={statusCadastro} color="text-bg-success" />
              )}
            </form>
          </section>
        ) : (
          setModal(true)
        )}
        <Footer />
      </section>
    );
};

export default AtualizaServico;
