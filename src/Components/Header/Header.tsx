import { useEffect, useState } from "react";

import styles from "./Header.module.css";
import logoSat from "../../assets/icons/sat_logo.svg";
import NavLinks from "./NavLinks/NavLinks";
import { Link } from "react-router-dom";
import NavLinkMobile from "./NavLinksMobile/NavLinkMobile";
import ModalLogin from "../ModalLogin/ModalLogin.tsx";
import { useGlobalContext } from "../../Hooks/GlobalContext";
import ModalUsuario from "../PerfilUsuario/ModalUsuario/ModalUsuario.tsx";
import CadastroUsuario from "../Cadastros/CadastroUsuario.jsx/CadastroUsuario";
import LoadingDots from "../Utils/LoadingDots/LoadingDots.tsx";

export const Header = () => {
  const [isTelaPequena, setIsTelaPequena] = useState(false);
  const { modal, setModal, userAuth } = useGlobalContext();
  const [modalUsuario, setModalUsuario] = useState(false);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    function handleResize() {
      setIsTelaPequena(window.innerWidth < 421);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [loading]);

  function handleClick() {
    setModalUsuario(!modalUsuario);
  }

  return (
    <header className={styles.header}>
      {modal === "modalLogin" && (
        <ModalLogin setModal={setModal} modal={modal} />
      )}
      {modal == "cadUsuario" && <CadastroUsuario />}
      <div className={styles.nav}>
        <Link to="/">
          <img className={styles.logoSat} src={logoSat} alt="logotipo" />
        </Link>

        {isTelaPequena ? (
          <NavLinkMobile links={navLinks} />
        ) : (
          <NavLinks links={navLinks} />
        )}
      </div>
      <div className={styles.buttons}>
        {loading && (
          <div className={styles.loading}>
            <LoadingDots />
          </div>
        )}
        {userAuth.status && !loading && (
          <>
            <div className={styles.usuarioLogado} onClick={handleClick}>
              <p className={styles.welcome}>
                {`Bem Vindo, ${userAuth.usuario.nome.split(" ")[0]}`}
              </p>
              {modalUsuario && <ModalUsuario />}
            </div>
          </>
        )}
        {!userAuth.status && !modalUsuario && !loading && (
          <div className={styles.headerButtons}>
            <button onClick={() => setModal("cadUsuario")}>
              <a>Cadastre-se</a>
            </button>
            <button onClick={() => setModal("modalLogin")}>
              <a>Entrar</a>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
