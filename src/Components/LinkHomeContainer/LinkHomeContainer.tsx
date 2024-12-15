import React from "react";
import Button from "../Button/Button";
import styles from "./LinkHomeContainer.module.css";
import { useGlobalContext } from "../../Hooks/GlobalContext.tsx";

interface LinkHomeContainerProps {
  icon: string;
  title: string;
  subtitle: string;
  button: string;
  patch: string;
  setModal?: React.Dispatch<React.SetStateAction<string>>;
}

const LinkHomeContainer = ({
  icon,
  title,
  subtitle,
  button,
  patch,
  setModal
}: LinkHomeContainerProps) => {
  const { userAuth } = useGlobalContext();
  return (
    <div className={styles.containerLinkHome}>
      <img src={icon} alt="" />
      <div className={styles.titulos}>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      {patch === "/servicos" ? (
        <Button path={patch}>{button}</Button>
      ) : (
        <Button
          path={`${userAuth.status ? patch : ""}`}
          modalParam={`${!userAuth.status ? "cadUsuario" : "false"}`}
        >
          {button}
        </Button>
      )}
    </div>
  );
};

export default LinkHomeContainer;
