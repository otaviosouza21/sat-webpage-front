import React, { useContext, useEffect, useState } from "react";
import { DELETE_DATA } from "../../Api/api";
import useFetch from "../../Hooks/useFetch";
import Toast from "../Toast/Toast";
import { GlobalContext } from "../../Hooks/GlobalContext";
import { useNavigate } from "react-router-dom";
import Confirm from "../Utils/Confirm/Confirm";


const FuncButton = ({ table, method, id, updateDate, children, style }) => {
  const { request, data } = useFetch();
  const [alert, SetAlert] = useState(false);
  const { update, setUpdate, setDataUpdate,modal,setModal } = useContext(GlobalContext);
  const navigate = useNavigate();


  function handleDelete() {
      const token = window.localStorage.getItem("token");
      async function deleteData() {
        if (token) {
          const { url, options } = DELETE_DATA(table, id, token);
          const { response } = await request(url, options);
          if (response.ok) {
            setUpdate(!update);
            SetAlert('Registro Deletado');
            setModal(false)
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

  function handleUpdate(){
    if (method === "PUT" && updateDate !== undefined) {
      setDataUpdate(updateDate);
      navigate(`/${table}/cadastro/atualiza`);
      setUpdate(true);
    }
  }



  return (
    <>
     {modal === 'deleteConfirm' && <Confirm mensagem="Deseja mesmo deletar?" setModal={setModal} handleDelete={handleDelete} id={id}/>} 
      {method === "DELETE" ? (
        <button className={style} onClick={()=>setModal('deleteConfirm')} >
          {children}
        </button>
      ) : (
        <button className={style} onClick={handleUpdate} > 
          {children}
        </button>
      )}
      {alert && <Toast />}
    </>
  );
};

export default FuncButton;
