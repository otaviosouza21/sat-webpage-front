import React from "react";
import styles from "./ModalContato.module.css";
import phone from "../../../assets/icons/phone.svg";

interface ModalContatoProps {
  contato: {
    contato_negocio_01: string;
    contato_pessoal_01: string;
  };
}

const ModalContato = ({ contato }: ModalContatoProps) => {
  function whatsAPI(number: string) {
    const cleanedNumber = number.replace(/\D/g, "");
    console.log(cleanedNumber);
    const whatsappLink = `https://api.whatsapp.com/send?phone=55${cleanedNumber}`;
    window.location.href = whatsappLink;
  }

  return (
    <ul className={`${styles.modalContato}`}>
      <li onClick={() => whatsAPI(contato.contato_negocio_01)}>
        <img src={phone} alt="" />
        {contato.contato_negocio_01}
      </li>
      <li onClick={() => whatsAPI(contato.contato_pessoal_01)}>
        <img src={phone} alt="" />
        {contato.contato_pessoal_01}
      </li>
    </ul>
  );
};

export default ModalContato;
