import React, { useEffect, useState } from "react";
import modalStyle from "../../ModalLogin/ModalLogin.module.css";
import Title from "../../Titles/Title";

const Confirm = ({ mensagem, id, handleDelete,setModal }) => {

  return (
    <div className={modalStyle.modalContainer}>
      <div className={modalStyle.modalLogin}>
        <Title text={mensagem}/>
        <p>Registro ID: {id}</p>
        <div>
          <button
            style={{ fontSize: "1rem", marginRight: "6px" }}
            type="button"
            className="btn btn-outline-secondary btn-sm"
            onClick={()=>setModal(false)}
          >
            Voltar
          </button>
          <button
            style={{ fontSize: "1rem" }}
            type="button"
            className="btn btn-danger btn-sm"
            onClick={handleDelete}
          >
            Deletar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
