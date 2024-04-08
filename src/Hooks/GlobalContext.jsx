import React, { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalStorage = ({ children }) => {
  const [update, setUpdate] = useState(false);
  const [admAuth, setAdmAuth] = useState(true);
  const [userAuth, setUserAuth] = useState({
    token: "",
    usuario: null,
    status: false,
    rule: ''
  });
  const [modal, setModal] = useState(false);
  const [dataUpdate, setDataUpdate] = useState(null);

  return (
    <GlobalContext.Provider
      value={{
        update,
        setUpdate,
        setAdmAuth,
        admAuth,
        dataUpdate,
        setDataUpdate,
        userAuth,
        setUserAuth,
        modal,
        setModal
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
