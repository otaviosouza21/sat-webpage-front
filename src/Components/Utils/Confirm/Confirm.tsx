import React, { useEffect, useState } from "react";
import modalStyle from "../../ModalLogin/ModalLogin.module.css";
import Title from "../../Titles/Title";
import { DELETE_DATA } from "../../../Api/api";
import useFetch from "../../../Hooks/useFetch";

interface ConfirmTypes{
  mensagem:string;
  id:number | null;
  setModal:React.Dispatch<React.SetStateAction<string>>;
  table:string;
  update: boolean;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>
}

const Confirm = ({ mensagem, id, setModal, table, update, setUpdate }:ConfirmTypes) => {

  const { request } = useFetch();
  const [alert, SetAlert] = useState<boolean | string>(false);

  function handleDelete() {
    const token = window.localStorage.getItem("token");
    async function deleteData() {
      if (token && id) {
        const { url, options } = DELETE_DATA(table, id, token);
        const { response } = await request(url, options);
        if (response?.ok) {
          setUpdate(!update);
          SetAlert("Registro Deletado");
          setModal("");
          setTimeout(() => {
            SetAlert(false);
          }, 3000);
        }
      } else {
        console.log("Ocoreu um erro");
      }
    }
    deleteData();
  }

  return (
    <div className={modalStyle.modalContainer}>
      <div className={modalStyle.modalLogin}>
        <Title text={mensagem} />
        <p>Registro ID: {id}</p>
        <div>
          <button
            style={{ fontSize: "1rem", marginRight: "6px" }}
            type="button"
            className="btn btn-outline-secondary btn-sm"
            onClick={() => setModal("")}
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