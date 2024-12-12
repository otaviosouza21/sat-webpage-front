import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import wppIcon from "../../assets/icons/wathsapp.svg";
import styles from "./ServicoContainer.module.css";
import useFetch from "../../Hooks/useFetch";
import { GET_TO_ID } from "../../Api/api";
import ModalServico from "../ModalServico/ModalServico";
import ModalContato from "./ModalContato/ModalContato";
import btn from "../Button/Button.module.css";
import { Link } from "react-router-dom";
import ReactGA from 'react-ga4';
import { logButtonClick } from "../../plugins/logButtonClick";

const ServicoContainer = ({ servicosData,categoria }) => {
  const [categoriaData, setCategoriaData] = useState();
  const [modal, setModal] = useState(false);
  const [showContatos, setShowContatos] = useState(false);
  const { nome_negocio, categoria_id, usuario_id } = servicosData;
  const { request } = useFetch();
  const { nome, contato_pessoal_01, contato_negocio_01 } = servicosData.Usuario;
  const contatos = { contato_pessoal_01, contato_negocio_01 };

  function show() {
    setShowContatos(!showContatos);
  }
  function showModal() {
    setModal("servicoDetalhes");
    const overflow = document.querySelector("body");
    overflow.classList.add("overFlow");
  }

  if ( servicosData /*  && usuarioData */)
    return (
      <div className={`${styles.servicosContainer} animeLeft`}>
        {modal === "servicoDetalhes" && (
          <ModalServico
            setModal={setModal}
            modal={modal}
            servicoUsuario={servicosData}
          />
        )}
        <div className={`${styles.servico}`}>
          <h3>{nome_negocio}</h3>
          <span style={{ background: categoria.cor }}>
            {categoria.nome}
          </span>
          <div className={styles.containerNomeEBtn}>

          <p>{nome}</p>
          <button className={styles.button} onClick={show}>
            <Link>
              <img src={wppIcon} alt="" />
              Contato
            </Link>
          </button>
          </div>
          {showContatos && <ModalContato contato={contatos} />}

        </div>
        <button onClick={()=> {
          showModal()
         logButtonClick()
        }} className={styles.showMore}>

          +Ver Mais
        </button>
        </div>
      </div>
    );
};

export default ServicoContainer;
