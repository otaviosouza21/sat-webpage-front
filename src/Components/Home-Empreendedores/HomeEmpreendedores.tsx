import React, { useEffect, useRef } from "react";
import styles from "./HomeEmpreendedores.module.css";
import Title from "../Titles/Title";
import LogoSat from "../../assets/icons/sat_logo.svg";
import LinkHomeContainer from "../LinkHomeContainer/LinkHomeContainer.tsx";
import contratarIcon from "../../assets/icons/worker.svg";
import toolsIcons from "../../assets/icons/tools.svg";
import figuras1 from "../../assets/img/figure1.svg";
import figuras2 from "../../assets/img/figure2.svg";
import { useGlobalContext } from "../../Hooks/GlobalContext.tsx";
import useTokenValidate from "../../Hooks/useTokenValidate";


const HomeEmpreendedores = () => {
  const { setModal }  = useGlobalContext();
  const { fetchValidaToken } = useTokenValidate();
  const gridLinks = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = 'SAT | Portal do Empreendedor'
    const overflow = document.querySelector("body");
    overflow && overflow.classList.remove("overFlow");
    const token = window.localStorage.getItem("token");
    if(token) fetchValidaToken();
  }, []);

  return (
    <main className={`${styles.main}`}>
      <section className={`${styles.section} container`}>
        <div className={`${styles.titulo} animeDown`}>
          <img src={LogoSat} alt="" />
          <Title text="Portal do Empreendedor" fontSize="1" />
        </div>
        <div className={`${styles.gridLinks} animeUp`} ref={gridLinks}>
          <LinkHomeContainer
            title="Preciso contratar um serviço"
            subtitle="Encontre os melhores prestadores de serviços na região de Taiaçupeba, de qulquer seguimento."
            button="Procurar Profissional"
            icon={contratarIcon}
            patch="/servicos"
          />
          <img className={styles.figuras} src={figuras2} alt="" />
          <img className={styles.figuras} src={figuras1} alt="" />
          <LinkHomeContainer
            title="Sou prestador de serviços"
            subtitle="Cadastre-se e aumente a visibilidade do seu trabalho no bairro de Taiaçupeba"
            button="Quero me cadastrar"
            icon={toolsIcons}
            setModal={setModal}
            patch="/servico/cadastro"
          />
        </div>
      
      </section>
    </main>
  );
};

export default HomeEmpreendedores;
