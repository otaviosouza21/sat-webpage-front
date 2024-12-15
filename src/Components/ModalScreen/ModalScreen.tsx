import React from "react";
import styles from "./ModalScreen.module.css";


const ModalScreen = ({ children } : {children: React.ReactNode}) => {
  return <div className={styles.container}>{children}</div>;
};

export default ModalScreen;
