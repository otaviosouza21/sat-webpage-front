import React, { useContext, useEffect, useState } from "react";
import Title from "../Titles/Title";
import InputSearch from "../Forms/InputSearch/InputSearch.jsx";
import ServicoContainer from "../ServicoContainer/ServicoContainer";
import styles from "./Servicos.module.css";
import { SimpleAnime } from "../../plugins/simple-anime";
import ModalServico from "../ModalServico/ModalServico";
import useFetch from "../../Hooks/useFetch";
import { GET_ALL, GET_AUTH_USER, GET_INNER } from "../../Api/api.js";
import Loading from "../Utils/Loading/Loading.jsx";
import Error from "../Utils/Error/Error.jsx";
import { jwtDecode } from "jwt-decode";
import { GlobalContext } from "../../Hooks/GlobalContext.jsx";
import Paginacao from '../Paginação/Paginacao.jsx'

const Servicos = () => {
  const [servicos, setServicos] = useState(null);
  const { error, loading, request } = useFetch();
  const { userAuth, setUserAuth,logout } = useContext(GlobalContext);
  const [page, setPage] = useState(1)
  const [lastPage,setLastPage] = useState(0)
  

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
    const { url, options } = GET_INNER("servico", "usuario",page);
    async function getServicoUsuario() {
      const {json,response} = await request(url, options);
      console.log(json);
      setServicos(json.servicos.retorno);
      setLastPage(json.paginacao.total_Pages)
    }
    getServicoUsuario();
  }, []);

  
  async function paginacao(page){
    //setLoading(true)
    setPage(page)
    const { url, options } = GET_INNER("servico", "usuario",page);
    const { response, json } = await request(url, options);
    console.log(json.servicos);
    setServicos(json.servicos.retorno);
    setLastPage(json.paginacao.total_Pages)
  }


  if (loading) return <Loading />;
  if (error) return <Error error={error} />;
  if(servicos)
  return (
    <main>
      <section className={`container ${styles.servicosContainer}`}>
        <div className="animeDown">
          <Title text="Buscar Profissionais" fontSize="3" />
         {/*  <InputSearch
            visibleItens={visibleItens}
            setVisibleItens={setVisibleItens}
            placeholder="Busque um serviço"
            option='nome_negocio'
  /> */}
        </div>
        <div className={styles.servicosGrid}>
          {servicos &&
            servicos.map((servico) => {
              return servico.status ? (
                <ServicoContainer key={servico.id} servicosData={servico} />
              ) : null;
            })}
        </div>

        <Paginacao paginacao={paginacao} page={page} lastPage={lastPage}/>

      </section>
    </main>
  );
};

export default Servicos;
