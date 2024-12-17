import React, { FC, useEffect } from "react";
import Title from "../../../Components/Titles/Title.tsx";
import InputSearch from "../../../Components/Formularios/Forms/InputSearch/InputSearch.tsx";
import ServicoContainer from "../../../Components/ServicoContainer/ServicoContainer.tsx";
import styles from "./Servicos.module.css";
import useFetch from "../../../Hooks/useFetch.tsx";
import { GET_AUTH_USER, GET_INNER } from "../../../Api/api.ts";
import Loading from "../../../Components/Utils/Loading/Loading.tsx";
import Error from "../../../Components/Utils/Error/Error.tsx";
import { jwtDecode } from "jwt-decode";
import { useGlobalContext } from "../../../Hooks/GlobalContext.tsx";
import { defaultUserAuth } from "../../../types/apiTypes.ts";

const Servicos: FC<React.ComponentProps<"main">> = () => {
  const { error, loading, request } = useFetch();
  const {
    setUserAuth,
    logout,
    categoriaInnerServico,
    setCategoriaInnerServico,
    setNotFind,
  } = useGlobalContext();

  //valida login
  useEffect(() => {
    document.title = "SAT | Serviços";
    const token = window.localStorage.getItem("token");
    async function fetchValidaToken() {
      if (token) {
        const { id, rule }: any = jwtDecode(token);
        const { url, options } = GET_AUTH_USER("usuarios", token, id);
        const { response, json } = await request(url, options);
        if (response?.ok) {
          setUserAuth({ token, usuario: json, status: true, rule });
        } else {
          setUserAuth(defaultUserAuth);
          logout();
        }
      }
    }
    fetchValidaToken();
  }, []);

  useEffect(() => {
    const { url, options } = GET_INNER("categoria", "servicos", 1);
    // const { url, options } = GET_INNER("servico", "usuario", pageServicos);
    async function getServicoUsuario() {
      const { json, response } = await request(url, options);
      if (response?.ok) {
        setCategoriaInnerServico(json);
        // setLastPage(json.paginacao.total_Pages);
        setNotFind(null);
      }
    }
    getServicoUsuario();
  }, []);

  useEffect(() => {
    console.log(categoriaInnerServico);
  }, [categoriaInnerServico]);

  // async function paginacao(page) {
  //   setPageServicos(page);
  //   const { url, options } = GET_INNER("servico", "usuario", page);
  //   const { response, json } = await request(url, options);
  //   if (response.ok) {
  //     setCategoriaInnerServico(json.servicos.retorno);
  //     setLastPage(json.paginacao.total_Pages);
  //     setNotFind(null);
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
  //   setCategoriaInnerServico(json.servicos.retorno);
  //   setLastPage(json.paginacao.total_Pages);
  //   setNotFind(null);
  // }

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;
  return (
    <main>
      <section className={`container ${styles.servicosContainer}`}>
        <div className="animeDown">
          <Title text="Buscar Profissionais" fontSize="3" />
          <InputSearch
            id="busca"
            placeholder="Busque um serviço"
            option="nome_negocio"
          />
        </div>
        <div className={""}>
          {categoriaInnerServico &&
            categoriaInnerServico.map((servico) => {
              let categoria = {
                nome: servico.nome,
                cor: servico.cor_categoria,
              };

              return servico.Servicos.length &&
                servico.Servicos.find((servico) => servico.status) ? (
                <div
                  key={servico.id}
                  className={`${styles.rowCategoriaServicos} animeLeft`}
                >
                  <div className={styles.infoRowCategoria}>
                    <span
                      className={styles.categoriaName}
                      style={{ background: servico.cor_categoria }}
                    >
                      {servico.nome}
                    </span>
                    <span className={styles.verMais}>Ver mais</span>
                  </div>
                  <div className={`${styles.containerServicosArray} `}>
                    {servico.Servicos.map((servico) => {
                      return servico.status ? (
                        <ServicoContainer
                          key={servico.id}
                          servicosData={servico}
                          categoria={categoria}
                        />
                      ) : null;
                    })}
                  </div>
                </div>
              ) : null;
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
