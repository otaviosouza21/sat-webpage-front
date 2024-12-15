import React, { useEffect, useState } from "react";
import Title from "../../Titles/Title";
import style from "./MinhaConta.module.css";
import { useGlobalContext } from "../../../Hooks/GlobalContext.tsx";
import { GET_AUTH_USER, GET_INNER_ID } from "../../../Api/api";
import useFetch from "../../../Hooks/useFetch";
import { jwtDecode } from "jwt-decode";
import Button from "../../Button/Button";
import LoadingCenterComponent from "../../Utils/LoadingCenterComponent/LoadingCenterComponent";
import { Link, useNavigate } from "react-router-dom";
import styleButton from "../../Button/Button.module.css";
import useTokenValidate from "../../../Hooks/useTokenValidate";
import { defaultCurrentUser, defaultUserAuth, Servicos, ServicoUsuarioProps } from "../../../types/apiTypes";


interface MinhaContaProps extends React.ComponentProps<'div'> {

}

const MinhaConta: React.FC<MinhaContaProps>  = () => {
  const navigate = useNavigate();
  useTokenValidate()
  const { userAuth, setUserAuth, logout, setDataUpdate,currentUser, setCurrentUser, } = useGlobalContext();
  const [servicosAtivos, setServicosAtivos] = useState(0);
  const [servicosInativos, setServicosInativos] = useState(0);
  const { request, loading } = useFetch();

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    async function fetchValidaToken() {
      if (token) {
        const { id, rule } :any = jwtDecode(token);
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
        const servicos: Servicos[] = json
        if (response?.ok) {
          const ativos = servicos.filter((servico) => servico.status);
          const inativos = servicos.filter((servico) => !servico.status);
          setServicosAtivos(ativos.length)
          setServicosInativos(inativos.length)
        }
      }
    }
    fetchValidaServicos();
  }, [userAuth]);

  function handleEdit() {
    navigate("/usuarios/cadastro/atualiza");
    setDataUpdate(currentUser);
  }

  return (
    <section className={style.containerPerfil}>
      {loading ? (
        <LoadingCenterComponent />
      ) : (
        <ul className={style.infosPerfil}>
          {currentUser && (
            <>
              <li>
                <Title text="Nome" fontSize="2" />
                <p>{currentUser.nome}</p>
              </li>
              <li>
                <Title text="Email" fontSize="2" />
                <p>{currentUser.email}</p>
              </li>
              <li>
                <Title text="Contato 1" fontSize="2" />
                <p>{currentUser.contato_negocio_01}</p>
              </li>
              <li>
                <Title text="Contato 2" fontSize="2" />
                <p>{currentUser.contato_pessoal_01}</p>
              </li>
              <li>
                <Title text="Residente de Taiaçupeba há" fontSize="2" />
                <p>{currentUser.tempo_reside} Anos</p>
              </li>
              <li>
                <Title text="Sócio da SAT" fontSize="2" />
                <p>
                  {currentUser.socio_sat ? (
                    "Sim"
                  ) : (
                    <span>Não, quero me tornar</span>
                  )}
                </p>
              </li>
              <li>
                <Title text="Serviços em análise" fontSize="2" />
                <p>{servicosInativos}</p>
              </li>
              <li>
                <Title text="Serviços publicados" fontSize="2" />
                <p>{servicosAtivos}</p>
              </li>
              <button onClick={handleEdit} className={styleButton.button}>
                <a>Editar</a>
              </button>
            </>
          )}
        </ul>
      )}
    </section>
  );
};

export default MinhaConta;
