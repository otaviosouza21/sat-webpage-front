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

  useEffect(() => {
    new SimpleAnime();
  }, []);


  console.log(servicosData);
  return (
    <main>
      <Header />
      <section className={`container ${styles.servicosContainer}`}>
        <Title text="Buscar Profissionais" fontSize="3" />
        <InputSearch placeholder="Busque por nome, categoria ou descrição do serviço..." />
        <div className={`${styles.servicosGrid}`}>
        {servicosData.map((servico,key)=>{
          return <ServicoContainer key={key} servicosData={servico} />
        })}

        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Servicos;
