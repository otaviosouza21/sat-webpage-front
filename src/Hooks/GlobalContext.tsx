import React, {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import {
  UserAuth,
  CurrentUser,
  defaultCurrentUser,
  defaultUserAuth,
  Servicos,
  defaultServicos,
  defaultCategoriaInnerServicos,
  CategoriaInnerServico,
} from "../types/apiTypes";

interface modalScreenProps {
  nomeModal: "Questionario Config" | "Questionario Servico" | "" ;
  status: boolean;
  data?: object;
}

interface GlobalContextProps {
  update: boolean;
  setUpdate: Dispatch<SetStateAction<boolean>>;
  dataUpdate: any; // Substituir 'any' por um tipo específico, se disponível
  setDataUpdate: Dispatch<SetStateAction<any>>; // Substituir 'any' por um tipo específico, se disponível
  userAuth: UserAuth;
  setUserAuth: Dispatch<SetStateAction<UserAuth>>;
  modal: string;
  setModal: Dispatch<SetStateAction<string>>;
  modalScreen: modalScreenProps;
  setModalScreen: Dispatch<SetStateAction<modalScreenProps>>;
  logout: () => void;
  servicos: Servicos[];
  setServicos: Dispatch<SetStateAction<Servicos[]>>;
  categoriaInnerServico: CategoriaInnerServico[];
  setCategoriaInnerServico: Dispatch<SetStateAction<CategoriaInnerServico[]>>;
  lastPage: number;
  setLastPage: Dispatch<SetStateAction<number>>;
  notFind: any; // Substituir 'any' por um tipo específico, se disponível
  setNotFind: Dispatch<SetStateAction<any>>; // Substituir 'any' por um tipo específico, se disponível
  listaFiltrada: any; // Substituir 'any' por um tipo específico, se disponível
  setListaFiltrada: Dispatch<SetStateAction<any>>; // Substituir 'any' por um tipo específico, se disponível
  inputPesquisa: string;
  setInputPesquisa: Dispatch<SetStateAction<string>>;
  currentUser: CurrentUser;
  setCurrentUser: Dispatch<SetStateAction<CurrentUser>>;
}

interface GlobalStorageProps {
  children: ReactNode;
}

export const GlobalContext = createContext<GlobalContextProps | null>(null);

export const useGlobalContext = () => {
  const context = React.useContext(GlobalContext);
  if (!context) {
    throw new Error(
      "useGlobalContext deve ser usado dentro de um GlobalStorage."
    );
  }
  return context;
};

export const GlobalStorage: React.FC<GlobalStorageProps> = ({ children }) => {
  const [update, setUpdate] = useState(false);
  const [dataUpdate, setDataUpdate] = useState<any>({}); // Tipar adequadamente
  const [userAuth, setUserAuth] = useState<UserAuth>(defaultUserAuth);
  const [currentUser, setCurrentUser] =
    useState<CurrentUser>(defaultCurrentUser);
  const [servicos, setServicos] = useState<Servicos[]>(defaultServicos);
  const [categoriaInnerServico, setCategoriaInnerServico] = useState<
    CategoriaInnerServico[]
  >(defaultCategoriaInnerServicos);
  const [lastPage, setLastPage] = useState(0);
  const [notFind, setNotFind] = useState<any>(null); // Tipar adequadamente
  const [modal, setModal] = useState<string>("");
  const [modalScreen, setModalScreen] = useState<modalScreenProps>({
    nomeModal: "",
    status: false,
    data: {},
  });
  const [listaFiltrada, setListaFiltrada] = useState<any>(null); // Tipar adequadamente
  const [inputPesquisa, setInputPesquisa] = useState<string>("");

  // Função de logout
  const logout = () => {
    window.localStorage.removeItem("token");
    setUserAuth(defaultUserAuth);
    setCurrentUser(defaultCurrentUser);
  };

  const globalState = {
    update,
    setUpdate,
    dataUpdate,
    setDataUpdate,
    userAuth,
    setUserAuth,
    currentUser,
    setCurrentUser,
    servicos,
    setServicos,
    categoriaInnerServico,
    setCategoriaInnerServico,
    lastPage,
    setLastPage,
    notFind,
    setNotFind,
    modal,
    setModal,
    modalScreen,
    setModalScreen,
    listaFiltrada,
    setListaFiltrada,
    inputPesquisa,
    setInputPesquisa,
    logout,
  };

  return (
    <GlobalContext.Provider value={globalState}>
      {children}
    </GlobalContext.Provider>
  );
};
