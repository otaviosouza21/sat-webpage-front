import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "../CadastroForm.module.css";
import InputText from "../../Forms/Input/InputText";
import InputSelect from "../../Forms/Input/InputSelect";
import Button from "../../Button/Button";
import Title from "../../Titles/Title";
import useFetch from "../../../Hooks/useFetch";
import {
  GET_ALL,
  GET_AUTH_USER,
  POST_DATA,
  UPDATE_DATA,
} from "../../../Api/api";
import useForm from "../../../Hooks/useForm";
import Loading from "../../Utils/Loading/Loading";
import Toast from "../../Toast/Toast";
import { GlobalContext } from "../../../Hooks/GlobalContext";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import ModalAlert from "../../Utils/ModalAlert/ModalAlert";

const CadastroServico = () => {
  const [categorias, setCategorias] = useState();
  const { request, loading, error } = useFetch();
  const [statusCadastro, setStatusCadastro] = useState({
    mensagem: '',
    status: false
  });
  const { setModal, setUserAuth, userAuth,logout } = useContext(GlobalContext);
  const formRef = useRef();
  const navigate = useNavigate();
  //
  const nomeNegocioForm = useForm();
  const descricaoForm = useForm();
  const tempoNegocio = useForm();

  //check de login na transição para pagina de cadastro/ verifica se está locado
  useEffect(() => {
    async function fetchValidaToken() {
      const token = window.localStorage.getItem("token");
      if (token) {
        const { id, rule } = jwtDecode(token);
        const { url, options } = GET_AUTH_USER("usuarios", token, id);
        const { response, json } = await request(url, options);
        if (response.ok) {
          setUserAuth({ token, usuario: json, status: true, rule });
        } else {
          setUserAuth({});
          logout()
        }
      }
    }
    fetchValidaToken();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (
      nomeNegocioForm.validate() &&
      descricaoForm.validate() &&
      tempoNegocio.validate() &&
      userAuth.status // apenas cadastrar com usuario logado/autenticado
    ) {
      const dataServico = {
        nome_negocio: nomeNegocioForm.value,
        descricao_servico: descricaoForm.value,
        tempo_negocio: +tempoNegocio.value,
        status: false,
        categoria_id: +formRef.current["categoria"].value,
        usuario_id: userAuth.usuario.id,
        possui_nome_negocio: true,
      };

      async function postServico() {
        const { url, options } = POST_DATA("servico", dataServico);
        const servicoRequest = await request(url, options);
        if (servicoRequest.response.ok) {
          nomeNegocioForm.reset();
          descricaoForm.reset();
          tempoNegocio.reset();
          setStatusCadastro({mensagem: 'Serviço envidado para analise', status: true});
        }
      }
      postServico();
    } else {
      setStatusCadastro({mensagem: 'Preencha os campos necessarios', status: false});
      setTimeout(() => {
        setStatusCadastro({mensagem: '', status: false});
      }, 2000);
    }
  }

  // pega as categorias e salva no estado
  useEffect(() => {
    async function getCategorias() {
      const { url, options } = GET_ALL("categoria_servico");
      const { response, json } = await request(url, options);
      if (!response.ok) {
        console.log("Falha ao buscar Categorias");
      }
      setCategorias(json);
    }
    getCategorias();
  }, []);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  if (categorias)
    return (
      <section>
        {userAuth.status && userAuth.token ? (
          <section className={`${styles.cadastroContainer} container`}>
            <Title text="Cadastrar Serviço" fontSize="3" />
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

              <Button handleSubmit={handleSubmit}>
                {loading ? "Salvando..." : "Salvar"}
              </Button>
              {error && <Toast message={error} color="text-bg-danger" />}
              {statusCadastro.status && (
                <>
                  <ModalAlert title={statusCadastro.mensagem} mensagem='Você será avisado quando seu serviço for aprovado. Qualquer duvida entre em contato'  />
                </>
              )}
            </form>
          </section>
        ) : (
          setModal(true)
        )}
      </section>
    );
};

export default CadastroServico;
