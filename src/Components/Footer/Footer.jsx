import React from "react";
import styles from "./Footer.module.css";
import logo from "../../assets/icons/sat_logo.svg";
import whatsapp from "../../assets/icons/whatsapp-footer.svg";
import instagram from "../../assets/icons/instagram.svg";
import facebook from "../../assets/icons/facebook.svg";
import phone from "../../assets/icons/phone-footer.svg";
import email from "../../assets/icons/email.svg";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.left}>
          <div className={styles.logotipo}>
            <img src={logo} alt="logotipo" />
            <h1>SAT</h1>
          </div>
          <div className={styles.redes}>
            <p>Siga nas redes</p>
            <div>
              <img src={whatsapp} alt="logo-whatsapp" />
              <img src={facebook} alt="logo-facebook" />
              <img src={instagram} alt="logo-instagram" />
            </div>
          </div>
        </div>
        <div className={styles.listas}>
          <ul className={styles.lista}>
            <li>Empresa</li>
            <li><NavLink to='/sobre'>Sobre</NavLink></li>
            <li><NavLink>SAT</NavLink></li>
            <li><NavLink>Ajuda</NavLink></li>
          </ul>
          <ul className={styles.lista}>
            <li>Serviços</li>
            <li><NavLink to='/servicos'>Serviços</NavLink></li>
            <li><NavLink>Cadastre-se</NavLink></li>
          </ul>
          <ul className={styles.lista}>
            <li>Usuario</li>
            <li><NavLink>Meu Perfil</NavLink></li>
            <li><NavLink to='/'>Inicio</NavLink></li>
          </ul>
          <ul className={styles.lista}>
            <li>
              <img src={phone} alt="" />
              <NavLink>11 99828-9779</NavLink>
            </li>
            <li>
              <img src={email} alt="" />
              <NavLink>contato@sat.com.br</NavLink>
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
