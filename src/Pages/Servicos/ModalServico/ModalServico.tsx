import React, { useEffect, useRef } from "react";
import Title from "../../../Components/Titles/Title.tsx";
import styles from "../ModalServico/ModalServico.module.css";
import workserIcon from "../../../assets/icons/person.svg";
import toolsIcon from "../../../assets/icons/tools.svg";
import starIcon from "../../../assets/icons/star.svg";
import ModalContato from "../../../Components/ServicoContainer/ModalContato/ModalContato.tsx";
import phone from "../../../assets/icons/phone2.svg";
import CloseButton from "../../../Components/CloseButton/CloseButton.tsx";
import { ServicoUsuarioProps } from "../../../types/apiTypes";

interface ModalServicoProps {
  modal: string;
  setModal: React.Dispatch<React.SetStateAction<string>>;
  servicoUsuario: ServicoUsuarioProps;
}

const ModalServico = ({
  modal,
  setModal,
  servicoUsuario,
}: ModalServicoProps) => {
  const modalContainerPost = useRef(null);
  const CloseContainerPost = useRef(null);
  const { nome, contato_pessoal_01, contato_negocio_01 } =
    servicoUsuario.Usuario;
  const contato = { contato_pessoal_01, contato_negocio_01 };

  function closeModal(event: React.MouseEvent<HTMLDivElement>) {
    if (
      event.target === modalContainerPost.current ||
      event.target === CloseContainerPost.current
    ) {
      setModal("");
      const overflow = document.querySelector("body");
      overflow?.classList.remove("overFlow");
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
        <div>
          <div className={styles.header}>
            <div className={styles.containerTitle}>
              <Title text="Prestador" fontSize="2" />
              <img src={workserIcon} alt="" />
            </div>
            <CloseButton
              closeModal={closeModal}
              modalContainer={modalContainerPost}
              CloseContainerPost={CloseContainerPost}
            />
          </div>
          <p>{nome}</p>
        </div>
        <div>
          <div className={styles.containerTitle}>
            <Title text="Serviço" fontSize="2" />
            <img src={toolsIcon} alt="" />
          </div>
          <p>{servicoUsuario.nome_negocio}</p>
          <span>{servicoUsuario.descricao_servico}</span>
        </div>
        <div>
          <div className={styles.containerTitle}>
            <Title text="Contatos" fontSize="2" />
            <img src={phone} alt="" />
          </div>
          <ModalContato contato={contato} />
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
