import React, { useContext, useEffect, useState } from "react";
import Title from "../Titles/Title";
import InputSearch from "../Forms/InputSearch/InputSearch.jsx";
import ServicoContainer from "../ServicoContainer/ServicoContainer";
import styles from "./Servicos.module.css";
import useFetch from "../../Hooks/useFetch";
import {
  GET_AUTH_USER,
  GET_INNER,
} from "../../Api/api";
import Loading from "../Utils/Loading/Loading.jsx";
import Error from "../Utils/Error/Error.jsx";
import { jwtDecode } from "jwt-decode";
import { GlobalContext } from "../../Hooks/GlobalContext";

const Servicos = () => {
  const { error, loading, request } = useFetch();
  const {
    userAuth,
    setUserAuth,
    logout,
    servicos,
    setServicos,
    lastPage,
    setLastPage,
    notFind,
    setnotFind,
    pageServicos,
    setPageServicos,
    pesquisaPaginacao,
    inputPesquisa,
    setInputPesquisa,
  } = useContext(GlobalContext);

  //valida login
  useEffect(() => {
    document.title = "SAT | Serviços";
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
    const { url, options } = GET_INNER("categoria", "servicos");
    // const { url, options } = GET_INNER("servico", "usuario", pageServicos);
    async function getServicoUsuario() {
      const { json, response } = await request(url, options);
      if (response.ok) {        
        setServicos(json);
        // setLastPage(json.paginacao.total_Pages);
        setnotFind(null);
      }
    }
    getServicoUsuario();
  }, []);

  useEffect(()=>{
    console.log(servicos);
    
  },[servicos])

  // async function paginacao(page) {
  //   setPageServicos(page);
  //   const { url, options } = GET_INNER("servico", "usuario", page);
  //   const { response, json } = await request(url, options);
  //   if (response.ok) {
  //     setServicos(json.servicos.retorno);
  //     setLastPage(json.paginacao.total_Pages);
  //     setnotFind(null);
  //   }
  // }
  // async function paginacao2(page) {
  //   setPageServicos(page);
  //   const { url, options } = GET_INNER_SEARCH(
  //     "servico",
  //     "usuario",
  //     page,
  //     inputPesquisa
  //   );
  //   const { json, response } = await request(url, options);
  //   setServicos(json.servicos.retorno);
  //   setLastPage(json.paginacao.total_Pages);
  //   setnotFind(null);
  // }

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;
  return (
    <main>
      <section className={`container ${styles.servicosContainer}`}>
        <div className="animeDown">
          <Title text="Buscar Profissionais" fontSize="3" />
          <InputSearch placeholder="Busque um serviço" option="nome_negocio" />
        </div>
        <div className={''}>
        {servicos &&
            servicos.map((servico) =>{

              let categoria = {nome: servico.nome, cor:servico.cor_categoria}

              return servico.Servicos.length && servico.Servicos.find(servico => servico.status)?
              (
                <div key={servico.id} className={`${styles.rowCategoriaServicos} animeLeft`}>
                <div className={styles.infoRowCategoria}>
                  <span 
                    className={styles.categoriaName}
                    style={{ background: servico.cor_categoria }}
                    >{servico.nome}</span>
                  <span className={styles.verMais}>Ver mais</span>
                </div>
                <div className={`${styles.containerServicosArray} `}>
                  {servico.Servicos.map((servico)=>{
                    return servico.status ? <ServicoContainer key={servico.id} servicosData={servico} categoria={categoria}/>
                    :null
                  }
            )}
                </div>
              </div>
            ):null;
          })}
        </div>
        {/* {inputPesquisa.length === 0 && (
          <Paginacao
            paginacao={paginacao}
            page={pageServicos}
            lastPage={lastPage}
          />
        )}
        {inputPesquisa.length > 0 && (
          <Paginacao
            paginacao={paginacao2}
            page={pageServicos}
            lastPage={lastPage}
          />
        )} */}
      </section>
    </main>
  );
};

export default Servicos;
