import { LegacyRef } from "react";
import styles from "../CloseButton/CloseButton.module.css";


interface CloseButtonProps {
  closeModal: (e: any) => void;
  CloseContainerPost?: LegacyRef<HTMLButtonElement> | undefined;
  modalContainer?: LegacyRef<HTMLDivElement> | undefined
}

const CloseButton = ({ closeModal, CloseContainerPost,modalContainer }: CloseButtonProps) => {
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
