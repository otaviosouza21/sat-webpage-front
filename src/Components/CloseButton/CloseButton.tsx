import React, { LegacyRef, useContext, useRef } from "react";
import styles from "../CloseButton/CloseButton.module.css";
import { GlobalContext } from "../../Hooks/GlobalContext";

interface CloseButtonProps {
  closeModal: (e: any) => void;
  CloseContainerPost: LegacyRef<HTMLButtonElement> | undefined;
}

const CloseButton = ({ closeModal, CloseContainerPost }: CloseButtonProps) => {
  const overflow = document.querySelector("body");
  overflow?.classList.add("overFlow");
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
