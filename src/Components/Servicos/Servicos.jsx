import React, { useEffect, useState } from "react";
import { Header } from "../Header/Header";
import Footer from "../Footer/Footer";
import Title from "../Titles/Title";
import InputSearch from "../Forms/Inputs/InputSearch";
import ServicoContainer from "../ServicoContainer/ServicoContainer";
import styles from "./Servicos.module.css";
import { SimpleAnime } from "../../plugins/simple-anime";
import servicosData from '../../jsons/servicos.json'

const Servicos = () => {
  const [visibleItens,setVisibleItens] = useState(servicosData)

  useEffect(() => {
    new SimpleAnime();
  }, []);


  return (
    <main>
      <Header />
      <section className={`container ${styles.servicosContainer}`}>
        <Title text="Buscar Profissionais" fontSize="3" />
        <InputSearch visibleItens={visibleItens} setVisibleItens={setVisibleItens} placeholder="Busque por nome, categoria ou descrição do serviço..." />
        <div className={`${styles.servicosGrid}`}>
        {visibleItens.map((servico,key)=>{
          return <ServicoContainer key={key} servicosData={servico} />
        })}

        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Servicos;
