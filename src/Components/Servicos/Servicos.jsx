import React, { useEffect, useState } from "react";
import { Header } from "../Header/Header";
import Footer from "../Footer/Footer";
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

const Servicos = () => {
  const [visibleItens, setVisibleItens] = useState(null);
  const { error, loading, request } = useFetch();

  useEffect(() => {
 
    const { url, options } = GET_INNER("servico","usuario");
    async function getServicoUsuario() {
      const response = await request(url, options);
      setVisibleItens(response.json);
    }

    getServicoUsuario();
  }, []);

  useEffect(() => {
    new SimpleAnime();
  }, []);
  if (loading) return <Loading />;
  if (error) return <Error error={error} />;
  return (
    <main>
      <Header />
      <section className={`container ${styles.servicosContainer}`}>
        <Title text="Buscar Profissionais" fontSize="3" />
        <InputSearch
          visibleItens={visibleItens}
          setVisibleItens={setVisibleItens}
          placeholder="Busque um serviço"
        />
        <div className={styles.servicosGrid}>
          {visibleItens &&
            visibleItens.map((servico) => {
              return (
                servico.status ? <ServicoContainer key={servico.id} servicosData={servico} /> : null
              );
            })}
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Servicos;
