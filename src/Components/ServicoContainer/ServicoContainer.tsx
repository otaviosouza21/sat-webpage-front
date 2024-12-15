import React, { useState } from "react";
import wppIcon from "../../assets/icons/wathsapp.svg";
import styles from "./ServicoContainer.module.css";
import ModalServico from "../ModalServico/ModalServico";
import ModalContato from "./ModalContato/ModalContato";
import { Link } from "react-router-dom";
import { logButtonClick } from "../../plugins/logButtonClick.ts";
import { Categoria, ServicoUsuarioProps } from "../../types/apiTypes";



interface ServicoContainerProps extends React.ComponentProps<'div'>{
  servicosData: ServicoUsuarioProps
  categoria: Categoria
}

const ServicoContainer = ({ servicosData,categoria }:ServicoContainerProps) => {
  const [modal, setModal] = useState('');
  const [showContatos, setShowContatos] = useState(false);
  const { nome_negocio, categoria_id, usuario_id } = servicosData;
  const { nome, contato_pessoal_01, contato_negocio_01 } = servicosData.Usuario;
  const contatos = { contato_pessoal_01, contato_negocio_01 };
  
  function show() {
    setShowContatos(!showContatos);
  }
  function showModal() {
    setModal("servicoDetalhes");
    const overflow = document.querySelector("body");
    overflow?.classList.add("overFlow");
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
            <a>
              <img src={wppIcon} alt="" />
              Contato
            </a>
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
      
    );
};

export default ServicoContainer;
