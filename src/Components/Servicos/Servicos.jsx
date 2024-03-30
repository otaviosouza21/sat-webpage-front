import React from "react";
import { Header } from "../Header/Header";
import Footer from "../Footer/Footer";
import Title from "../Titles/Title";
import InputSearch from "../Forms/Inputs/InputSearch";
import ServicoContainer from "../ServicoContainer/ServicoContainer";
import styles from './Servicos.module.css'

const Servicos = () => {
  return (
    <main>
      <Header />
      <section className={`container ${styles.servicosContainer}`}>
        <Title text="Buscar Profissionais" fontSize="3" />
        <InputSearch placeholder="Busque por nome, categoria ou descrição do serviço..." />
        <div className={styles.servicosGrid}>
          <ServicoContainer />
          <ServicoContainer />
          <ServicoContainer />
          <ServicoContainer />
          <ServicoContainer />
          <ServicoContainer />
          <ServicoContainer />
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Servicos;
