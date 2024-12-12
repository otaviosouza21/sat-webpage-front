import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./HomeEmpreendedores.module.css";
import Title from "../Titles/Title";
import LogoSat from "../../assets/icons/sat_logo.svg";
import LinkHomeContainer from "../LinkHomeContainer/LinkHomeContainer";
import contratarIcon from "../../assets/icons/worker.svg";
import toolsIcons from "../../assets/icons/tools.svg";
import figuras1 from "../../assets/img/figure1.svg";
import figuras2 from "../../assets/img/figure2.svg";
import { GlobalContext } from "../../Hooks/GlobalContext";
import { GET_AUTH_USER } from "../../Api/api";
import useFetch from "../../Hooks/useFetch";
import { jwtDecode } from "jwt-decode";
import SendEmailForm from "../SendEmailForm/SendEmailForm";
import QuestionariosCadastro from "../../Pages/PainelAdm/Questionarios/QuestionariosCadastro/QuestionariosCadastro";

const HomeEmpreendedores = () => {
  const { setUserAuth, logout, setModal } = useContext(GlobalContext);
  const { request } = useFetch();
  const gridLinks = useRef();

  useEffect(() => {
    document.title = 'SAT | Portal do Empreendedor'
    const overflow = document.querySelector("body");
    overflow.classList.remove("overFlow");
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
