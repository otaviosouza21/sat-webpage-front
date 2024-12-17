import React, { useEffect, useRef, useState } from "react";
import styles from "../CadastroForm.module.css";
import InputText from "../../Forms/Input/InputText.tsx";
import InputSelect from "../../Forms/Input/InputSelect.tsx";
import Button from "../../../Button/Button.tsx";
import Title from "../../../Titles/Title.tsx";
import useFetch from "../../../../Hooks/useFetch.tsx";
import { GET_ALL, SEND_EMAIL, UPDATE_DATA } from "../../../../Api/api.ts";
import useForm from "../../../../Hooks/useForm.tsx";
import Loading from "../../../Utils/Loading/Loading.tsx";

import { useGlobalContext } from "../../../../Hooks/GlobalContext.tsx";
import { useNavigate } from "react-router-dom";
import useTokenValidate from "../../../../Hooks/useTokenValidate.tsx";
import useToast from "../../../../Hooks/useToast.tsx";
import LoadingCenterComponent from "../../../Utils/LoadingCenterComponent/LoadingCenterComponent.tsx";

const AtualizaServico = () => {
  const [categorias, setCategorias] = useState();
  const [statusCadastro, setStatusCadastro] = useState<"1" | "2">("1");
  const { request, loading, error } = useFetch();
  const [currentyCategory, setCurrentCategory] = useState("");

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
    if (dataUpdate && Object.keys(dataUpdate).length > 0) {
      setCurrentCategory(dataUpdate.categoria_id);
      setStatusCadastro(dataUpdate.status ? "1" : "2");
      nomeNegocioForm.setValue(dataUpdate.nome_negocio || "");
      descricaoForm.setValue(dataUpdate.descricao_servico || "");
      tempoNegocio.setValue(
        dataUpdate.tempo_negocio ? String(dataUpdate.tempo_negocio) : ""
      );
      if (formRef.current) {
        formRef.current["categoria"].value = String(
          dataUpdate.categoria_id || ""
        );
      }
    }
  }, []);

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
          ? formRef.current["status"].value === "1"
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

  if (loading) return <LoadingCenterComponent />;
  if (categorias)
    return (
      <section
        data-aos="fade-right"
        data-aos-easing="linear"
        data-aos-duration="500"
      >
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
                onChange={(e) => setCurrentCategory(e.target.value)}
                value={currentyCategory}
              />

              {userAuth.status &&
                userAuth.rule === 3 && ( // Acesso ADM
                  <InputSelect
                    label="Status"
                    options={[
                      { id: 1, nome: "Ativo" },
                      { id: 2, nome: "Inativo" },
                    ]}
                    id="status"
                    onChange={(e) => {
                      if (e.target.value === "1" || e.target.value === "2") {
                        setStatusCadastro(e.target.value); // Garantido que seja "1" ou "2"
                      }
                    }}
                    value={statusCadastro}
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
