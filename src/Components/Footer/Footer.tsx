import React from "react";
import styles from "./Footer.module.css";
import logo from "../../assets/icons/sat_logo.svg";
import whatsapp from "../../assets/icons/whatsapp-footer.svg";
import instagram from "../../assets/icons/instagram.svg";
import facebook from "../../assets/icons/facebook.svg";
import phone from "../../assets/icons/phone-footer.svg";
import email from "../../assets/icons/email.svg";
import { NavLink } from "react-router-dom";
import SendEmailForm from "../Formularios/SendEmailForm/SendEmailForm.tsx";
import { formataTelefone } from "../../plugins/Format";

const Footer = () => {
  const contatoSat = {
    email: "amigosdetaiacupeba@gmail.com",
    telefone: "1147244248",
    instagram: "https://www.instagram.com/sat_taiacupeba/",
    face: "https://www.facebook.com/NossaTaia/",
  };

  return (
    <footer className={styles.footer}>
      <SendEmailForm />
      <div className={styles.top}>
        <div className={styles.left}>
          <NavLink to="/" className={styles.logotipo}>
            <img src={logo} alt="logotipo" />
            <h1>SAT</h1>
          </NavLink>
          <div className={styles.redes}>
            <p>Siga nas redes</p>
            <div>
              <NavLink
                to={`https://api.whatsapp.com/send?phone=55${contatoSat.telefone}`}
              >
                <img src={whatsapp} alt="logo-whatsapp" />
              </NavLink>
              <NavLink to={contatoSat.face}>
                <img src={facebook} alt="logo-facebook" />
              </NavLink>
              <NavLink to={contatoSat.instagram}>
                <img src={instagram} alt="logo-instagram" />
              </NavLink>
            </div>
          </div>
        </div>
        <div className={styles.listas}>
          <ul className={styles.lista}>
            <li>Empresa</li>
            <li>
              <NavLink to="/sobre">Sobre</NavLink>
            </li>
            <li>
              <NavLink to="taiacupeba.com.br">SAT</NavLink>
            </li>
            <li>
              <NavLink to="/">Ajuda</NavLink>
            </li>
          </ul>
          <ul className={styles.lista}>
            <li>Serviços</li>
            <li>
              <NavLink to="/servicos">Serviços</NavLink>
            </li>
            <li>
              <NavLink to="/"> Cadastre-se</NavLink>
            </li>
          </ul>
          <ul className={styles.lista}>
            <li>Usuario</li>
            <li>
              <NavLink to="/meu_perfil/perfil">Meu Perfil</NavLink>
            </li>
            <li>
              <NavLink to="/">Inicio</NavLink>
            </li>
          </ul>
          <ul className={styles.lista}>
            <li>
              <img src={phone} alt="" />
              <NavLink
                to={`https://api.whatsapp.com/send?phone=55${contatoSat.telefone}`}
              >
                {formataTelefone(contatoSat.telefone)}
              </NavLink>
            </li>
            <li>
              <img src={email} alt="" />
              <NavLink to={`mailto:${contatoSat.email}`}>
                {contatoSat.email}
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.botton}>
        <p>©2024, DevAgille. Alguns direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
