import React, { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalStorage = ({ children }) => {
  const [update, setUpdate] = useState(false);
  const [userAuth, setUserAuth] = useState({
    token: "",
    usuario: null,
    status: false,
    rule: ''
  });
  
  const [modal,setModal] = useState('')
  const [dataUpdate, setDataUpdate] = useState(null);


  function logout() {
    window.localStorage.removeItem('token')
    window.location.reload();
    navigate('/')
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
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
