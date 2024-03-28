import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import styles from "./Header.module.css";
import logoSat from "../../assets/icons/sat_logo.svg";
import menuBurguer from "../../assets/icons/menu-burgues.svg";
import NavLinks from "./NavLinks/NavLinks";

export const Header = () => {
  const [isTelaPequena, setIsTelaPequena] = useState(window.innerWidth);
  useEffect(() => {
    // Função para atualizar o estado baseado na largura da tela
    function handleResize() {
      setIsTelaPequena(window.innerWidth < 421);
    }

    // Adiciona o event listener
    window.addEventListener("resize", handleResize);

    // Chama a função handleResize inicialmente para definir o estado inicial corretamente
    handleResize();

    // Remove o event listener quando o componente for desmontado
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  console.log(isTelaPequena);
  return (
    <header className={styles.header}>
      <div className={styles.nav}>
        {isTelaPequena ? (
          <img
            className={styles.menuBurguer}
            src={menuBurguer}
            alt="logotipo"
          />
        ) : (
          <img className={styles.logoSat} src={logoSat} alt="logotipo" />
        )}
        <NavLinks />
      </div>
      <button>Cadastre-se</button>
    </header>
  );
};
