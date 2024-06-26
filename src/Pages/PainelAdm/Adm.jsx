import React, { useContext, useEffect, useState } from "react";
import CategoriasLista from "./Listas/CategoriasLista";
import ListRules from "./Listas/ListRules";
import styles from "./Adm.module.css";
import { jwtDecode } from "jwt-decode";
import { GET_AUTH_USER } from "../../Api/api";
import { GlobalContext } from "../../Hooks/GlobalContext";
import useFetch from "../../Hooks/useFetch";
import Loading from "../../Components/Utils/Loading/Loading";
import { useNavigate } from "react-router-dom";
import HeadNav from "./HeadNav/HeadNav";
import Usuarios from './Listas/UsuariosLista'
import ServicosLista from './Listas/ServicosLista'


const Adm = () => {
  const [activeView, setActiveView] = useState("servicos");
  const { userAuth, setUserAuth, logout } = useContext(GlobalContext);
  const { request, loading } = useFetch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    async function fetchValidaToken() {
      if (token) {
        const { id, rule } = jwtDecode(token);
        const { url, options } = GET_AUTH_USER("usuarios", token, id);
        const { response, json } = await request(url, options);
        if (response.ok) {
          setUserAuth({ token, usuario: json, status: true, rule });
        } else {
          setUserAuth({});
          setCurrentUser({});
          logout();
        }
      } else {
        navigate("/");
      }
    }
    fetchValidaToken();
  }, [userAuth.rule]);

  const handleView = (view) => {
    setActiveView(view);
  };

  return (
    <>
      {userAuth.status && userAuth.rule === 3 && (
        <main className={`${styles.containerAdm}`}>
          <HeadNav activeView={activeView} handleView={handleView} />
          <div className={styles.containerListas}>
            
            {activeView === "servicos" && <ServicosLista />}
            {activeView === "usuarios" && <Usuarios/>}
            {activeView === "categorias" && <CategoriasLista />}
            {activeView === "rules" && <ListRules />} 
          </div>
        </main>
      )}
    </>
  );
};

export default Adm;
