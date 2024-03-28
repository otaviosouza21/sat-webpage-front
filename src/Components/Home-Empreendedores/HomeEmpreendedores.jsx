import React from "react";
import styles from "./HomeEmpreendedores.module.css";
import { Header } from "../Header/Header";
import Title from "../Titles/Title";
import LogoSat from "../../assets/icons/sat_logo_trans.svg";
import LinkHomeContainer from "../LinkHomeContainer/LinkHomeContainer";
import contratarIcon from "../../assets/icons/worker.svg";
import toolsIcons from "../../assets/icons/tools.svg";
import figuras1 from "../../assets/img/figure1.svg";
import figuras2 from "../../assets/img/figure2.svg";
import Footer from "../Footer/Footer";

const HomeEmpreendedores = () => {
  return (
    <main className={`${styles.main}`}>
      <Header />

      <section className={`${styles.section} container`}>
        <div className={styles.titulo}>
          <img src={LogoSat} alt="" />
          <Title text="Portal do Empreendedor" fontSize="1" />
        </div>

        <div className={styles.gridLinks}>
          <LinkHomeContainer
            title="Preciso contratar um serviço"
            subtitle="Encontre os melhores prestadores de serviços na região de Taiaçupeba, de qulquer seguimento."
            button="Procurar Profissional"
            icon={contratarIcon}
          />
          <img className={styles.figuras} src={figuras2} alt="" srcset="" />
          <img className={styles.figuras} src={figuras1} alt="" srcset="" />
          <LinkHomeContainer
            title="Sou prestador de serviços"
            subtitle="Cadastre-se e aumente a visibilidade do seu trabalho no bairro de Taiaçupeba"
            button="Quero me cadastrar"
            icon={toolsIcons}
          />
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default HomeEmpreendedores;
