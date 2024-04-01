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
import { GET_ALL } from "../../Api/api.js";
import Loading from "../Utils/Loading/Loading.jsx";
import Error from "../Utils/Error/Error.jsx";

const Servicos = () => {
  const [visibleItens, setVisibleItens] = useState(null);
  const { error, loading, request } = useFetch();

  useEffect(() => {
    const { url, options } = GET_ALL("servico");
    const response = request(url, options);
    async function ifFetch() {
      setVisibleItens((await response).json);
    }

    ifFetch();
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
          placeholder="Busque por nome, categoria ou descrição do serviço..."
        />
        <div className={styles.servicosGrid}>
          {visibleItens &&
            visibleItens.map((servico) => {
              return (
                <ServicoContainer key={servico.id} servicosData={servico} />
              );
            })}
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Servicos;
