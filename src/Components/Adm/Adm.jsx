import React, { useContext, useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import ListServicos from "../Listagens/ListServicos";
import ListUsuarios from "../Listagens/ListUsuarios";
import ListCategoriasServicos from "../Listagens/ListCategoriasServicos";
import ListRules from "../Listagens/ListRules";
import styles from "../Adm/Adm.module.css";
import { jwtDecode } from "jwt-decode";
import { GET_AUTH_USER } from "../../Api/api";
import { GlobalContext } from "../../Hooks/GlobalContext";
import useFetch from "../../Hooks/useFetch";
import Loading from "../Utils/Loading/Loading";
import AcessDenied from '../Utils/AcessDenied/AcessDenied'
import Confirm from "../Utils/Confirm/Confirm";
import { useNavigate } from "react-router-dom";


const Adm = () => {
  const [activeView, setActiveView] = useState("servicos");
  const { userAuth, setUserAuth, logout } = useContext(GlobalContext);
  const { request,loading } = useFetch();
  const navigate = useNavigate()

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
          setCurrentUser({})
          logout();
        }
      }else{
        navigate('/')

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
          <ul className={styles.nav}>
            <li
              style={
                activeView === "servicos" ? { background: "#C9C9C9" } : null
              }
              onClick={() => handleView("servicos")}
            >
              Serviços
            </li>
            <li
              style={
                activeView === "usuarios" ? { background: "#C9C9C9" } : null
              }
              onClick={() => handleView("usuarios")}
            >
              Usuários
            </li>
            <li
              style={
                activeView === "categorias" ? { background: "#C9C9C9" } : null
              }
              onClick={() => handleView("categorias")}
            >
              Categorias
            </li>
            <li
              style={activeView === "rules" ? { background: "#C9C9C9" } : null}
              onClick={() => handleView("rules")}
            >
              Rules
            </li>
          </ul>
          <div className={styles.containerListas}>
            {activeView === "servicos" && <ListServicos />}
            {activeView === "usuarios" && <ListUsuarios />}
            {activeView === "categorias" && <ListCategoriasServicos />}
            {activeView === "rules" && <ListRules />}
          </div>
        </main>
      )}
    </>
  );
};

export default Adm;
