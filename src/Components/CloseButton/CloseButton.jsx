import React, { useContext, useRef } from "react";
import styles from "../CloseButton/CloseButton.module.css";
import { GlobalContext } from "../../Hooks/GlobalContext";

const CloseButton = ({ closeModal,CloseContainerPost }) => {
  const overflow = document.querySelector("body");
  overflow.classList.add("overFlow");
  return (
    <button
      ref={CloseContainerPost}
      onClick={closeModal}
      className={styles.close}
    >
      x
    </button>
  );
};

export default CloseButton;
