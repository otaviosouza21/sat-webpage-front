import React, { createContext, useState } from "react";
import {  useNavigate } from "react-router-dom";

export const GlobalContext = createContext();

export const GlobalStorage = ({ children }) => {
  const [update, setUpdate] = useState(false);
  //const navigate = useNavigate()
  const [userAuth, setUserAuth] = useState({
    token: "",
    usuario: null,
    status: false,
    rule: ''
  });
  //necessario para paginacao
  const [servicos, setServicos] = useState(null);
  const [lastPage,setLastPage] = useState(0)
  const [notFind, setnotFind] = useState(null)

  
  const [modal,setModal] = useState('')
  const [dataUpdate, setDataUpdate] = useState(null);


  function logout() {
    window.localStorage.removeItem('token')
    window.location.reload();
    //navigate('/')
  }

  return (
    <GlobalContext.Provider
      value={{
        update,
        setUpdate,
        dataUpdate,
        setDataUpdate,
        userAuth,
        setUserAuth,
        modal,
        setModal,
        logout,
        servicos,
        setServicos,
        lastPage,
        setLastPage,
        notFind,
        setnotFind
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
