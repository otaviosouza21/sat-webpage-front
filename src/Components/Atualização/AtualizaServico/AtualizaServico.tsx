import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "../CadastroForm.module.css";
import InputText from "../../Forms/Input/InputText";
import InputSelect from "../../Forms/Input/InputSelect";
import Button from "../../Button/Button";
import Title from "../../Titles/Title";
import useFetch from "../../../Hooks/useFetch";
import { GET_ALL, SEND_EMAIL, UPDATE_DATA } from "../../../Api/api";
import useForm from "../../../Hooks/useForm";
import Loading from "../../Utils/Loading/Loading.tsx";

import { useGlobalContext } from "../../../Hooks/GlobalContext";
import { useNavigate } from "react-router-dom";
import useTokenValidate from "../../../Hooks/useTokenValidate";
import useToast from "../../../Hooks/useToast";

const AtualizaServico = () => {
  const [categorias, setCategorias] = useState();
  const { request, loading, error } = useFetch();
  const [statusCadastro, setStatusCadastro] = useState(null);
  const { dataUpdate } = useGlobalContext();
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const nomeNegocioForm = useForm();
  const descricaoForm = useForm();
  const tempoNegocio = useForm();
  const activeToast = useToast();
  const { fetchValidaToken, userAuth } = useTokenValidate();

  useEffect(() => {
    fetchValidaToken();
  }, [userAuth.rule]);

  useEffect(() => {
    if (dataUpdate && formRef.current) {
      window.localStorage.setItem("updateData", JSON.stringify(dataUpdate));
      const dadosAtualizados = JSON.parse(
        window.localStorage.getItem("updateData") || "{}"
      );
      if (dadosAtualizados) {
        nomeNegocioForm.setValue(dadosAtualizados.nome_negocio);
        descricaoForm.setValue(dadosAtualizados.descricao_servico);
        tempoNegocio.setValue(dadosAtualizados.tempo_negocio);
      }
      formRef.current["categoria"].value = String(dataUpdate.categoria_id);
      if (formRef.current["status"]) {
        formRef.current["status"].value = dataUpdate.status
          ? "Ativo"
          : "Inativo";
      }
    }
  }, [dataUpdate]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement> | any) {
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
        status: formRef.current
          ? formRef.current["status"].value === "Ativo"
            ? true
            : false
          : false,
        categoria_id: formRef.current && +formRef.current["categoria"].value,
        possui_nome_negocio: true,
      };

      const statusDiferente = dataUpdate.status !== dataServico.status;
      async function postServico() {
        if (dataUpdate) {
          const { url, options } = UPDATE_DATA(
            "servico",
            dataServico,
            dataUpdate.id,
            userAuth.token
          );
          const servicoRequest = await request(url, options);
          if (servicoRequest.response?.ok) {
            activeToast({
              message: "Serviço Atualizado com Sucesso",
              type: "success",
            });
            nomeNegocioForm.reset(); //limpa campos
            descricaoForm.reset();
            tempoNegocio.reset();
            statusDiferente && sendEmail();
            setTimeout(() => {
              navigate(-1);
            }, 1000);
          } else {
            activeToast({ message: error ? error : "", type: "error" });
          }
        }
      }
      postServico();
    } else {
      activeToast({
        message: "Por Favor, Preencha todos os campos obrigatórios",
        type: "warning",
      });
      setTimeout(() => {
        setStatusCadastro(null);
      }, 1000);
    }
  }

  async function sendEmail() {
    const emailBody = {
      to: dataUpdate.Usuario.email,
      subject: "Alteração de status do seu Serviço",
      text: "O status do seu serviço foi atualizado no portal do Empreendedor de Taiaçupeba",
    };
    const { url, options } = SEND_EMAIL(emailBody);
    request(url, options);
  }

  // pega as categorias e salva no estado
  useEffect(() => {
    async function getCategorias() {
      const { url, options } = GET_ALL("categoria_servico");
      const { response, json } = await request(url, options);
      if (!response?.ok) {
        console.log("Falha ao buscar Categorias");
      }
      setCategorias(json);
    }
    getCategorias();
  }, []);

  if (loading) return <Loading />;
  if (categorias)
    return (
      <section>
        {userAuth.status && userAuth.token ? (
          <section className={`${styles.cadastroContainer} container`}>
            <Title text="Atualizar Serviço" fontSize="3" />
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

              {userAuth.status &&
                userAuth.rule === 3 && ( // Acesso ADM
                  <InputSelect
                    label="Status"
                    options={[
                      { id: 1, nome: "Ativo" },
                      { id: 1, nome: "Inativo" },
                    ]}
                    id="status"
                  />
                )}
              <Button handleSubmit={handleSubmit}>
                {loading ? "Salvando..." : "Salvar"}
              </Button>
            </form>
          </section>
        ) : (
          <div>Sem autorização para atualizar, contate o administrador</div>
        )}
      </section>
    );
};

export default AtualizaServico;
