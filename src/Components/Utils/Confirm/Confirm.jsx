import React from "react";
import modalStyle from "../../ModalLogin/ModalLogin.module.css";
import Title from "../../Titles/Title";

const Confirm = ({ mensagem, id }) => {
  return (
    <div className={modalStyle.modalContainer}>
      <div className={modalStyle.modalLogin}>
        <Title text='Deseja mesmo deletar ?'/>
        <p>Registro ID: {id}</p>
        <div>
          <button
            style={{ fontSize: "1rem", marginRight: "6px" }}
            type="button"
            className="btn btn-outline-secondary btn-sm"
          >
            Voltar
          </button>
          <button
            style={{ fontSize: "1rem" }}
            type="button"
            className="btn btn-danger btn-sm"
          >
            Deletar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
