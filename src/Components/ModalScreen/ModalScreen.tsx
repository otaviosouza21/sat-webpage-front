import React from "react";
import styles from "./ModalScreen.module.css";
import { useGlobalContext } from "../../Hooks/GlobalContext";

const ModalScreen = ({ children }: { children?: React.ReactNode }) => {
  const { modalScreen, setModalScreen } = useGlobalContext();
  if (modalScreen.status)
    return <div className={styles.container}>{children}</div>;
};

export default ModalScreen;
