import React, {  useEffect, useState } from "react";
import style from "./ServicoUsuario.module.css";
import { jwtDecode } from "jwt-decode";
import { GET_AUTH_USER, GET_INNER_ID } from "../../../Api/api.ts";
import useFetch from "../../../Hooks/useFetch.js";

import LoadingCenterComponent from "../../Utils/LoadingCenterComponent/LoadingCenterComponent.tsx";
import { Link, useNavigate } from "react-router-dom";
import ServicoUsuario from "./ServicoUsuario.js";
import { defaultCurrentUser, defaultServicosInnerUsuario, defaultUserAuth, ServicoUsuarioProps } from "../../../types/apiTypes.js";
import { useGlobalContext } from "../../../Hooks/GlobalContext.tsx";

const ServicosUsuario = () => {
  const { userAuth, setUserAuth, logout, modal, setModal,update,currentUser, setCurrentUser} = useGlobalContext();
  const { request, loading, error } = useFetch();
  const [servicosUser, setServicoUser] = useState<ServicoUsuarioProps[]>([defaultServicosInnerUsuario]);
  const navigate = useNavigate();


  useEffect(() => {
    const token = window.localStorage.getItem("token");
    async function fetchValidaToken() {
      if (token) {
        const { id, rule }:any = jwtDecode(token);
        const { url, options } = GET_AUTH_USER("usuarios", token, id);
        const { response, json } = await request(url, options);
        if (response?.ok) {
          setUserAuth({ token, usuario: json, status: true, rule });
          setCurrentUser(json);
        } else {
          setUserAuth(defaultUserAuth);
          setCurrentUser(defaultCurrentUser);
          logout();
        }
      } else {
        navigate("/");
      }
    }
    fetchValidaToken();
  }, []);

  useEffect(() => {
    async function fetchValidaServicos() {
      if (userAuth.status) {
        const { id } = userAuth.usuario;
        const { url, options } = GET_INNER_ID("servico", "usuario", id);
        const { response, json } = await request(url, options);
        if (response?.ok) {
          setServicoUser(json.Servicos);
        }
      }
    }
    fetchValidaServicos();
  }, [userAuth,update]);

  return (
    <>
      <ul className={style.containerServico}>
        {loading && <LoadingCenterComponent />}
        {!loading && (
          <div className={style.tituloModal}>
            <Link to={"/servico/cadastro"} className={style.button}>
              +Novo Serviço
            </Link>
          </div>
        )}
        {currentUser &&
          userAuth &&
          servicosUser &&
          !loading &&
          (servicosUser.length == 0 ? (
            <li className={style.modalServico}>
              <h2 className={style.notServico}>
                Não existem Serviços cadastrados
              </h2>
            </li>
          ) : (
            servicosUser && servicosUser.map((servico) => (
              <ServicoUsuario key={servico.id} servico={servico}/>
            ))
          ))}
      </ul>
    </>
  );
};

export default ServicosUsuario;
