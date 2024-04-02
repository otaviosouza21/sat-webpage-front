import React, { useEffect, useRef, useState } from "react";
import { Header } from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import styles from "../Components/CadastroUsuario.jsx/CadastroUsuario.module.css";
import EmConstrucao from "../Components/EmConstrucao/EmConstrucao";
import InputText from "../Components/Forms/Input/InputText";
import InputSelect from "../Components/Forms/Input/InputSelect";
import Button from "../Components/Button/Button";
import Title from "../Components/Titles/Title";
import useFetch from "../Hooks/useFetch";
import { GET_ALL, POST_DATA } from "../Api/api";
import useForm from "../Hooks/useForm";
import Loading from '../Components/Utils/Loading/Loading'

const CadastroServico = () => {
  const [categorias, setCategorias] = useState();
  const { request, loading } = useFetch();
  const formRef = useRef();

  const nomeNegocioForm = useForm();
  const descricaoForm = useForm();
  const tempoNegocio = useForm();
  const possuiNomeNegocioForm = useForm();

  function handleSubmit(e) {
    e.preventDefault();
    if (
      nomeNegocioForm.validate() &&
      descricaoForm.validate() &&
      tempoNegocio.validate()
    ) {
      const dataServico = {
        nome_negocio: nomeNegocioForm.value,
        descricao_servico: descricaoForm.value,
        tempo_negocio: +tempoNegocio.value,
        status: formRef.current["status"].value === "Ativo" ? true : false,
        categoria_id: +formRef.current["categoria"].value,
        possui_nome_negocio: formRef.current["possui_nome_negocio"].checked
          ? true
          : false,
        usuario_id: 7,
      };

      async function postServico() {
        const { url, options } = POST_DATA("servico", dataServico);
        const servicoRequest = await request(url, options);
    
      }
      postServico();
    }
  }

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
  if (loading) return <Loading />;
  if (categorias)
    return (
      <section>
        <Header />
        <section className={`${styles.cadastroContainer} container`}>
          <Title text="Cadastro de Serviço" fontSize="3" />
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
            <InputSelect
              label="Status"
              options={[{ nome: "Ativo" }, { nome: "Inativo" }]}
              id="status"
            />
            <InputText
              label="Possui nome do Negócio?"
              type="checkbox"
              id="possui_nome_negocio"
            />
            <Button handleSubmit={handleSubmit}>Cadastrar</Button>
          </form>
        </section>
        <Footer />
      </section>
    );
};

export default CadastroServico;
