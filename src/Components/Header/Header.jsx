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

export const Header = () => {
  const [isTelaPequena, setIsTelaPequena] = useState(window.innerWidth);
  const { setDataUpdate,modal, setModal } = useContext(GlobalContext);
  const { userAuth } = useContext(GlobalContext);

  useEffect(() => {
    function handleResize() {
      setIsTelaPequena(window.innerWidth < 421);
    }

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className={styles.header}>
      {modal && <ModalLogin setModal={setModal} modal={modal} />}
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
          `Bem Vindo, ${userAuth.usuario.nome}`
        ) : (
          <>
            <button>
              <Link to="/cadastro-usuarios" onClick={() => setDataUpdate(null)}>
                Cadastre-se
              </Link>
            </button>
            <button onClick={() => setModal(!modal)}>
              <Link>Entrar</Link>
            </button>
          </>
        )}
      </div>
    </header>
  );
};
