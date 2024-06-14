import React, { useContext, useEffect, useState } from "react";
import Title from "../Titles/Title";
import InputSearch from "../Forms/InputSearch/InputSearch.jsx";
import ServicoContainer from "../ServicoContainer/ServicoContainer";
import styles from "./Servicos.module.css";
import { SimpleAnime } from "../../plugins/simple-anime";
import ModalServico from "../ModalServico/ModalServico";
import useFetch from "../../Hooks/useFetch";
import { GET_ALL, GET_AUTH_USER, GET_INNER, GET_INNER_SEARCH } from "../../Api/api.js";
import Loading from "../Utils/Loading/Loading.jsx";
import Error from "../Utils/Error/Error.jsx";
import { jwtDecode } from "jwt-decode";
import { GlobalContext } from "../../Hooks/GlobalContext.jsx";
import Paginacao from '../Paginação/Paginacao.jsx'

const Servicos = () => {
  const { error, loading, request } = useFetch();
  const { userAuth, setUserAuth,logout,servicos, setServicos,lastPage,setLastPage,notFind, setnotFind, pageServicos, setPageServicos,pesquisaPaginacao, inputPesquisa, setInputPesquisa  } = useContext(GlobalContext);
  

  useEffect(() => {
    document.title = 'SAT | Serviços'
    const token = window.localStorage.getItem("token");
    async function fetchValidaToken() {
      if (token) {
        const { id, rule } = jwtDecode(token);
        const { url, options } = GET_AUTH_USER("usuarios", token, id);
        const { response, json } = await request(url, options);
        if (response.ok) {
          setUserAuth({ token, usuario: json, status: true, rule });
        } else {
          setUserAuth({});
          logout();
        }
      }
    }
    fetchValidaToken();
  }, []);

  useEffect(() => {
    const { url, options } = GET_INNER("servico", "usuario",pageServicos);
    async function getServicoUsuario() {
      const {json,response, error} = await request(url, options);
      if(response.ok){
        setServicos(json.servicos.retorno);
        setLastPage(json.paginacao.total_Pages)
        setnotFind(null)
      } 
    }
    getServicoUsuario();
  }, []);

  
  async function paginacao(page){
    setPageServicos(page)
    const { url, options } = GET_INNER("servico", "usuario",page);
    const { response, json } = await request(url, options);
    if(response.ok){
      setServicos(json.servicos.retorno);
      setLastPage(json.paginacao.total_Pages)
      setnotFind(null)
    }
  }
  async function paginacao2(page){
    setPageServicos(page)
    const { url, options } = GET_INNER_SEARCH("servico", "usuario",page,inputPesquisa);
    const {json,response} = await request(url, options);
    setServicos(json.servicos.retorno);
    setLastPage(json.paginacao.total_Pages)
    setnotFind(null)
  }

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;
  return (
    <main>
      <section className={`container ${styles.servicosContainer}`}>
        <div className="animeDown">
          <Title text="Buscar Profissionais" fontSize="3" />
         <InputSearch
            placeholder="Busque um serviço"
            option='nome_negocio'
          />
        </div>
        <div className={styles.servicosGrid}>
          {servicos &&
            servicos.map((servico) => {
              return servico.status ? (
                <ServicoContainer key={servico.id} servicosData={servico} />
              ) : null;
            })}
        </div>
        {inputPesquisa.length === 0 && <Paginacao paginacao={paginacao} page={pageServicos} lastPage={lastPage}/>}
        {inputPesquisa.length > 0 && <Paginacao paginacao={paginacao2} page={pageServicos} lastPage={lastPage}/>}
      </section>
    </main>
  );
};

export default Servicos;
