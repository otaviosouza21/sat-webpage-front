import React from "react";
import styles from "./ModalContato.module.css";
import { useNavigate } from "react-router-dom";
import phone from "../../../assets/icons/phone.svg";

const ModalContato = ({ contato }) => {
  const navigate = useNavigate();

  function whatsAPI(number) {
    const cleanedNumber = number.replace(/\D/g, "");
    const whatsappLink = `https://api.whatsapp.com/send?phone=55${cleanedNumber}`;
    window.location.href = whatsappLink;
  }

  return (
    <ul className={styles.modalContato}>
      <li onClick={() => whatsAPI(contato.contato_negocio_01)}>
        {contato.contato_negocio_01}
        <img src={phone} alt="" />
      </li>
      <li onClick={() => whatsAPI(contato.contato_pessoal_01)}>
        {contato.contato_pessoal_01}
        <img src={phone} alt="" />
      </li>
    </ul>
  );
};

export default ModalContato;
