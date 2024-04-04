import React, { useEffect, useRef, useState } from "react";
import { Header } from "../Header/Header";
import Footer from "../Footer/Footer";
import styles from "../CadastroUsuario.jsx/CadastroUsuario.module.css";
import EmConstrucao from "../EmConstrucao/EmConstrucao";
import InputText from "../Forms/Input/InputText";
import InputSelect from "../Forms/Input/InputSelect";
import Button from "../Button/Button";
import Title from "../Titles/Title";
import useFetch from "../../Hooks/useFetch";
import { GET_ALL, POST_DATA } from "../../Api/api";
import useForm from "../../Hooks/useForm";
import Loading from '../Utils/Loading/Loading'
import Toast from "../Toast/Toast";

const CadastroServico = () => {
  const [categorias, setCategorias] = useState();
  const { data,request, loading,error } = useFetch();
  const [statusCadastro, setStatusCadastro] = useState(null);
  const formRef = useRef();

  const nomeNegocioForm = useForm();
  const descricaoForm = useForm();
  const tempoNegocio = useForm();
  const possuiNomeNegocioForm = useForm(false);

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
          ? 'Sim'
          : 'Não',
        usuario_id: 7,
      };

      async function postServico() {
        const { url, options } = POST_DATA("servico", dataServico);
        const servicoRequest = await request(url, options);
        console.log(servicoRequest);
        if (servicoRequest.response.ok) {
          setStatusCadastro('Serviço Cadastrado com Sucesso');
          nomeNegocioForm.reset();
          descricaoForm.reset();
          tempoNegocio.reset();

          setTimeout(()=>{
            setStatusCadastro(null)
          },1000)
         
        }
      }
      postServico();
    } else {
      setStatusCadastro('Por Favor, Preencha todos os Campos')
      setTimeout(()=>{
        setStatusCadastro(null)
      },1000)
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
              {...possuiNomeNegocioForm}
            />
            <Button handleSubmit={handleSubmit}>{loading ? "Cadastrando..." : "Cadastrar"}</Button>
            {error && <Toast message={error} color="text-bg-danger" />}
            {statusCadastro && (
              <Toast message={statusCadastro} color="text-bg-success" />
            )}
          </form>
        </section>
        <Footer />
      </section>
    );
};

export default CadastroServico;
