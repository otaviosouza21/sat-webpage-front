import React from "react";
import styles from "./HeadNav.module.css";

interface HeadProps {
  activeView: string;
  handleView: (view: string) => void;
}

const HeadNav = ({ activeView, handleView }: HeadProps) => {
  return (
    <ul className={styles.nav}>
      <li
        style={
          activeView === "servicos" ? { background: "#C9C9C9" } : undefined
        }
        onClick={() => handleView("servicos")}
      >
        Serviços
      </li>
      <li
        style={
          activeView === "usuarios" ? { background: "#C9C9C9" } : undefined
        }
        onClick={() => handleView("usuarios")}
      >
        Usuários
      </li>
      <li
        style={
          activeView === "categorias" ? { background: "#C9C9C9" } : undefined
        }
        onClick={() => handleView("categorias")}
      >
        Categorias
      </li>
      <li
        style={activeView === "rules" ? { background: "#C9C9C9" } : undefined}
        onClick={() => handleView("rules")}
      >
        Rules
      </li>
      <li
        style={activeView === "questionarios" ? { background: "#C9C9C9" } : undefined}
        onClick={() => handleView("questionarios")}
      >
        Questionários
      </li>
    </ul>
  );
};

export default HeadNav;
