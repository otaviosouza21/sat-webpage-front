// src/Hooks/GlobalContext.ts

import React, { createContext, useState, ReactNode } from "react";

interface UserAuth {
  token: string;
  usuario: any;
  status: boolean;
  rule: string;
}

interface GlobalContextProps {
  update: boolean;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  dataUpdate: any;
  setDataUpdate: React.Dispatch<React.SetStateAction<any>>;
  userAuth: UserAuth;
  setUserAuth: React.Dispatch<React.SetStateAction<UserAuth>>;
  modal: string;
  setModal: React.Dispatch<React.SetStateAction<string>>;
  logout: () => void;
  servicos: any;
  setServicos: React.Dispatch<React.SetStateAction<any>>;
  lastPage: number;
  setLastPage: React.Dispatch<React.SetStateAction<number>>;
  notFind: any;
  setnotFind: React.Dispatch<React.SetStateAction<any>>;
  listaFiltrada: any;
  setListaFiltrada: React.Dispatch<React.SetStateAction<any>>;
}

export const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

interface GlobalStorageProps {
  children: ReactNode;
}

export const GlobalStorage = ({ children }: GlobalStorageProps) => {
  const [update, setUpdate] = useState(false);
  const [userAuth, setUserAuth] = useState<UserAuth>({
    token: "",
    usuario: null,
    status: false,
    rule: ''
  });
  const [servicos, setServicos] = useState(null);
  const [lastPage, setLastPage] = useState(0);
  const [notFind, setnotFind] = useState(null);
  const [modal, setModal] = useState<string>('');
  const [dataUpdate, setDataUpdate] = useState(false);
  const [listaFiltrada,setListaFiltrada] = useState(null)

  function logout() {
    window.localStorage.removeItem('token');
    window.location.reload();
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
        setnotFind,
        listaFiltrada,
        setListaFiltrada
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
