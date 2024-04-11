import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import wppIcon from "../../assets/icons/wathsapp.svg";
import styles from "./ServicoContainer.module.css";
import useFetch from "../../Hooks/useFetch";
import { GET_TO_ID } from "../../Api/api";
import Loading from "../Utils/Loading/Loading";
import ModalServico from "../ModalServico/ModalServico";
import ModalContato from "./ModalContato/ModalContato";
import btn from "../Button/Button.module.css";
import { Link } from "react-router-dom";

const ServicoContainer = ({ servicosData }) => {
  const [categoriaData, setCategoriaData] = useState();
  const [usuarioData, setUsuarioData] = useState();
  const [modal, setModal] = useState(false);
  const [wppAPI, setWppApi] = useState(null);
  const [showContatos, setShowContatos] = useState(false);
  const { nome_negocio, categoria_id, usuario_id } = servicosData;
  const { request } = useFetch();
  const { nome, contato_pessoal_01, contato_negocio_01 } = servicosData.Usuario;
  const contatos = { contato_pessoal_01, contato_negocio_01 };

  //busca categorias na API
  useEffect(() => {
    const { url, options } = GET_TO_ID("categoria_servico", categoria_id);
    const response = request(url, options);
    async function getCategorias() {
      setCategoriaData((await response).json);
    }

    getCategorias();
  }, []);

  function show() {
    setShowContatos(!showContatos);
  }

  if (categoriaData && servicosData /*  && usuarioData */)
    return (
      <div className={styles.servicosContainer}>
        {modal && (
          <ModalServico
            setModal={setModal}
            modal={modal}
            servicosData={servicosData}
            usuario={usuarioData}
          />
        )}
        <div className={styles.servico}>
          <h3>{nome_negocio}</h3>
          <span style={{ background: categoriaData.cor_categoria }}>
            {categoriaData.nome}
          </span>
          <p>{nome}</p>
          <button className={btn.button} onClick={show}>
            <Link>
              <img src={wppIcon} alt="" />
              Contato
            </Link>
          </button>

          {showContatos && <ModalContato contato={contatos} />}
        </div>
        <button onClick={() => setModal(!modal)} className={styles.showMore}>
          +Ver Mais
        </button>
      </div>
    );
};

export default ServicoContainer;
