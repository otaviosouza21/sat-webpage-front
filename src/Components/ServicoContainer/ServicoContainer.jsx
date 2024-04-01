import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import wppIcon from "../../assets/icons/wathsapp.svg";
import styles from "./ServicoContainer.module.css";
import useFetch from "../../Hooks/useFetch";
import { GET_TO_ID } from "../../Api/api";
import Loading from "../Utils/Loading/Loading";
import ModalServico from "../ModalServico/ModalServico";

const ServicoContainer = ({ servicosData }) => {
  const [categoriaData, setCategoriaData] = useState();
  const [usuarioData, setUsuarioData] = useState();
  const [modal, setModal] = useState(false);
  const { nome_negocio, categoria_id, usuario_id } = servicosData;
  const { request } = useFetch();

  useEffect(() => {
    const { url, options } = GET_TO_ID("categoria_servico", categoria_id);
    const response = request(url, options);
    async function getCategorias() {
      setCategoriaData((await response).json);
    }

    getCategorias();
  }, []);

  useEffect(() => {
    const { url, options } = GET_TO_ID("usuarios", usuario_id);
    const response = request(url, options);
    async function getUsuarios() {
      setUsuarioData((await response).json);
    }

    getUsuarios();
  }, []);

  if (categoriaData && servicosData && usuarioData)
    return (
      <div className={styles.servicosContainer}>
        {modal && <ModalServico setModal={setModal} modal={modal} servicosData={servicosData} usuario={usuarioData} />}
        <div className={styles.servico}>
          <h3>{nome_negocio}</h3>
          <span>{categoriaData.nome}</span>
          <p>{usuarioData.nome}</p>
          <Button>
            <img src={wppIcon} alt="" />
            Contato
          </Button>
        </div>
        <button onClick={() => setModal(!modal)} className={styles.showMore}>
          +Ver Mais
        </button>
      </div>
    );
};

export default ServicoContainer;