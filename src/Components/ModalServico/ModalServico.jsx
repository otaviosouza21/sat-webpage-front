import React, { useRef } from "react";
import Title from "../Titles/Title";
import styles from "../ModalServico/ModalServico.module.css";
import Button from "../Button/Button";
import wppIcon from "../../assets/icons/wathsapp.svg";
import workserIcon from "../../assets/icons/person.svg";
import toolsIcon from "../../assets/icons/tools.svg";
import starIcon from "../../assets/icons/star.svg";
import ModalContato from "../ServicoContainer/ModalContato/ModalContato";
import phone from '../../assets/icons/phone2.svg'

const ModalServico = ({
  modal,
  setModal,
  servicosData,
  contato,
  usuario,
  setShowContatos,
  showContatos,
}) => {
  const modalContainerPost = useRef(null);
  const CloseContainerPost = useRef(null);
  const { nome } = servicosData.Usuario;

  function closeModal(event) {
    event.preventDefault();
    if (
      event.target === modalContainerPost.current ||
      event.target === CloseContainerPost.current
    ) {
      setModal(!modal);
    }
  }

  return (
    <div
      className={styles.containerModal}
      ref={modalContainerPost}
      onClick={closeModal}
    >
      <section
        className={`${styles.modalServico} container animation-opacity `}
      >
        <button
          ref={CloseContainerPost}
          onClick={closeModal}
          className={styles.close}
        >
          X
        </button>
        <div>
          <div className={styles.containerTitle}>
            <Title text="Prestador" fontSize="2" />
            <img src={workserIcon} alt="" />
          </div>
          <p>{nome}</p>
        </div>
        <div>
          <div className={styles.containerTitle}>
            <Title text="Serviço" fontSize="2" />
            <img src={toolsIcon} alt="" />
          </div>
          <p>{servicosData.nome_negocio}</p>
          <span>{servicosData.descricao_servico}</span>
        </div>
        <div>
          <div className={styles.containerTitle}>
            <Title text="Contatos" fontSize="2" />
            <img src={phone} alt="" />
          </div>
          <ModalContato contato={contato}/>
        </div>
        <div className={styles.avaliacao}>
          <div className={styles.containerTitle}>
            <Title text="O Que Dizem os Clientes" fontSize="2" />
            <img src={starIcon} alt="" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ModalServico;
