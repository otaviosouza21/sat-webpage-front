import React, { useContext, useState } from "react";
import { DELETE_DATA } from "../../Api/api";
import useFetch from "../../Hooks/useFetch";
import Toast from "../Toast/Toast";
import { GlobalContext } from "../../Hooks/GlobalContext";
import { useNavigate } from "react-router-dom";
import Confirm from "../Utils/Confirm/Confirm";

const FuncButton = ({ table, method, id, updateDate, children, style }) => {
  const { request, data } = useFetch();
  const [alert, SetAlert] = useState(false);
  const [confirmDelete,setConfirmDelete] = useState(false)
  const { update, setUpdate, setDataUpdate,modal,setModal } = useContext(GlobalContext);
  const navigate = useNavigate();

  function handleClick() {
    if (method === "DELETE" && updateDate === undefined) {
      const token = window.localStorage.getItem("token");
      async function deleteData() {
        setModal('confirmDelete')
        if (token) {
          const { url, options } = DELETE_DATA(table, id, token);
          const { response, json } = await request(url, options);
          if (response.ok) {
            setUpdate(!update);
            SetAlert(true);
            setTimeout(() => {
              SetAlert(false);
            }, 3000);
          }
        } else {
          console.log("Ocoreu um erro");
        }
      }
      deleteData();
    } else if (method === "PUT" && updateDate !== undefined) {
      setDataUpdate(updateDate);
      navigate(`/${table}/cadastro/atualiza`);
      setUpdate(true);
    }
  }
  return (
    <>
      {method === "DELETE" ? (
        <button className={style} onClick={handleClick} >
        {/*   {modal === 'confirmDelete' && <Confirm mensagem="Deseja mesmo deletar?" id={id}/>} */}
          {children}
        </button>
      ) : (
        <button className={style} onClick={handleClick} > 
          {children}
        </button>
      )}
    </>
  );
};

export default FuncButton;
