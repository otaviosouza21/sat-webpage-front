import React, { useContext, useEffect, useState } from "react";
import style from "./ServicoUsuario.module.css";
import { jwtDecode } from "jwt-decode";
import { GET_AUTH_USER, GET_INNER_ID } from "../../../Api/api";
import useFetch from "../../../Hooks/useFetch";
import { GlobalContext } from "../../../Hooks/GlobalContext";
import Loading from "../../Utils/Loading/Loading.jsx";
import Error from "../../Utils/Error/Error.jsx";
import LoadingCenterComponent from "../../Utils/LoadingCenterComponent/LoadingCenterComponent.jsx";
import { Link } from "react-router-dom";
import Title from "../../Titles/Title.jsx";
import trash from "../../../assets/icons/trash2.svg";
import pen from "../../../assets/icons/pen.svg";
import view from "../../../assets/icons/view.svg";

const ServicosUsuario = () => {
  const { userAuth, setUserAuth, logout } = useContext(GlobalContext);
  const [currentUser, setCurrentUser] = useState(null);
  const { request, loading, error } = useFetch();
  const [servicosUser, setServicoUser] = useState(null);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    async function fetchValidaToken() {
      if (token) {
        const { id, rule } = jwtDecode(token);
        const { url, options } = GET_AUTH_USER("usuarios", token, id);
        const { response, json } = await request(url, options);
        if (response.ok) {
          setUserAuth({ token, usuario: json, status: true, rule });
          setCurrentUser(json);
        } else {
          setUserAuth({});
          setCurrentUser({});
          logout();
        }
      }
    }
    fetchValidaToken();
  }, []);

  useEffect(() => {
    async function fetchValidaServicos() {
      if (userAuth.status) {
        const { id } = userAuth.usuario;
        const { url, options } = GET_INNER_ID("servico", "usuario", id);
        const { response, json, loading } = await request(url, options);
        if (response.ok) {
          setServicoUser(json.Servicos);
        }
      }
    }
    fetchValidaServicos();
  }, [userAuth]);

  return (
    <>
      <ul className={style.containerServico}>
        {loading && <LoadingCenterComponent />}
        {!loading && (
          <div className={style.tituloModal}>
            <Title text="Meus serviços" fontSize="2" />
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
            servicosUser.map((servico) => (
              <li key={servico.id} className={style.modalServico}>
                <div>
                  <h3>Serviço</h3>
                  <h2>{servico.nome_negocio}</h2>
                </div>
                <div>
                  <h3>Situação</h3>
                  <h2>
                    {servico.status ? (
                      <span>
                        Publicado<span className={style.status_on}></span>
                      </span>
                    ) : (
                      <span>
                        Aguardando Aprovação
                        <span className={style.status_aguardando}></span>
                      </span>
                    )}
                  </h2>
                </div>
                <div className={style.options}>
                  <img src={view} alt="" />
                  <img src={pen} alt="" />
                  <img src={trash} alt="" />
                </div>
                <div>
                  <h3>Descrição</h3>
                  <h2>{servico.descricao_servico}</h2>
                </div>
              </li>
            ))
          ))}
      </ul>
    </>
  );
};

export default ServicosUsuario;
