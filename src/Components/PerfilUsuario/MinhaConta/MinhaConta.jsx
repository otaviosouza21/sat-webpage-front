import React, { useContext, useEffect, useState } from "react";
import Title from "../../Titles/Title";
import style from "./MinhaConta.module.css";
import { Header } from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { GlobalContext } from "../../../Hooks/GlobalContext";
import { GET_AUTH_USER, GET_INNER_ID } from "../../../Api/api";
import useFetch from "../../../Hooks/useFetch";
import { jwtDecode } from "jwt-decode";
import Button from "../../Button/Button";

const MinhaConta = () => {
  const { userAuth, setUserAuth } = useContext(GlobalContext);
  const [currentUser, setCurrentUser] = useState(null);
  const { request } = useFetch();

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
        }
      }
    }
    fetchValidaToken();
  }, []);


  if (currentUser)
    return (
      <>
        <Header />
        <section className={`container ${style.containerPerfil}`}>
          <Title text="Meu Perfil" fontSize="3" />
          <ul className={style.infosPerfil}>
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
              <Title text="Serviços Publicados" fontSize="2" />
              <p>2</p>
            </li>
            <li></li>
            <li>
              <Button>Editar</Button>
            </li>
          </ul>
        </section>
        <Footer />
      </>
    );
};

export default MinhaConta;