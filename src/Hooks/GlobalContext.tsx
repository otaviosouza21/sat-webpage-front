// src/Hooks/GlobalContext.ts

import React, { createContext, useState, ReactNode } from "react";
import { UserAuth, CurrentUser,defaultCurrentUser, defaultUserAuth } from "../types/apiTypes";

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
  
  inputPesquisa: string;
  setInputPesquisa: React.Dispatch<React.SetStateAction<any>>;

  currentUser: CurrentUser;
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser>>
}

interface GlobalStorageProps {
  children: ReactNode;
}

export const GlobalContext = createContext<GlobalContextProps | null>(null);

export const useGlobalContext = ()=>{
  const context = React.useContext(GlobalContext)
  if(!context) throw new Error('useContext deve estar dentro do Provider');
  return context;
}

export const GlobalStorage = ({ children }: GlobalStorageProps) => {
  const [update, setUpdate] = useState(false);
  const [userAuth, setUserAuth] = useState<UserAuth>(defaultUserAuth);

  const [currentUser, setCurrentUser] = useState<CurrentUser>(defaultCurrentUser)
  const [servicos, setServicos] = useState(null);
  const [lastPage, setLastPage] = useState(0);
  const [notFind, setnotFind] = useState(null);
  const [modal, setModal] = useState<string>('');
  const [dataUpdate, setDataUpdate] = useState({});
  const [listaFiltrada,setListaFiltrada] = useState(null)
  const [inputPesquisa, setInputPesquisa] = useState("");


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
        setListaFiltrada,
        inputPesquisa, setInputPesquisa,
        currentUser, setCurrentUser,

      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
