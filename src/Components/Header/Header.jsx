import React, { useContext, useEffect, useState } from "react";
import Button from "../Button/Button";
import styles from "./Header.module.css";
import logoSat from "../../assets/icons/sat_logo.svg";
import menuBurguer from "../../assets/icons/menu-burgues.svg";
import NavLinks from "./NavLinks/NavLinks";
import { Link } from "react-router-dom";
import NavLinkMobile from "./NavLinksMobile/NavLinkMobile";
import ModalLogin from "../ModalLogin/ModalLogin";
import { GlobalContext } from "../../Hooks/GlobalContext";
import ModalUsuario from "../PerfilUsuario/ModalUsuario/ModalUsuario";
import CadastroUsuario from "../Cadastros/CadastroUsuario.jsx/CadastroUsuario";

export const Header = () => {
  const [isTelaPequena, setIsTelaPequena] = useState(window.innerWidth);
  const { setDataUpdate, modal, setModal, userAuth } = useContext(GlobalContext);
  const [modalUsuario, setModalUsuario] = useState(false);

  const navLinks = [
    {
      nome: "Inicio",
      patch: "/",
    },
    {
      nome: "Serviços",
      patch: "/servicos",
    },
    {
      nome: "Sobre",
      patch: "/sobre",
    },
  ];

  useEffect(() => {
    function handleResize() {
      setIsTelaPequena(window.innerWidth < 421);
    }

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function handleClick() {
    setModalUsuario(!modalUsuario);
  }

  return (
    <header className={styles.header}>
      {modal === 'modalLogin' && <ModalLogin setModal={setModal} modal={modal} />}
      {modal == 'cadUsuario' && <CadastroUsuario/>}
      <div className={styles.nav}>
        <Link to="/">
          <img className={styles.logoSat} src={logoSat} alt="logotipo" />
        </Link>

        {isTelaPequena ? (
          <NavLinkMobile isTelaPequena={isTelaPequena} links={navLinks} />
        ) : (
          <NavLinks links={navLinks} />
        )}
      </div>
      <div className={styles.buttons}>
        {userAuth.status ? (
          <div className={styles.usuarioLogado} onClick={handleClick}>
            <p className={styles.welcome}>
              {" "}
              {`Bem Vindo, ${userAuth.usuario.nome}`}
            </p>
            {modalUsuario && <ModalUsuario />}
          </div>
        ) : (
          <div className={styles.headerButtons}>
            <button>
              <Link onClick={() => setModal('cadUsuario')}>
                Cadastre-se
              </Link>
            </button>
            <button onClick={() => setModal('modalLogin')}>
              <Link>Entrar</Link>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
