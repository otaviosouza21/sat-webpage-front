import React, { useContext, useEffect, useState } from "react";
import styles from "./QuestionariosCadastro.module.css";
import Title from "../../../../Components/Titles/Title";
import { GET_AUTH_USER } from "../../../../Api/api";
import { jwtDecode } from "jwt-decode";
import { GlobalContext } from "../../../../Hooks/GlobalContext";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../../Hooks/useFetch";
import InputText from "../../../../Components/Forms/Input/InputText";

const QuestionariosCadastro = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const { setUserAuth, logout } = useContext(GlobalContext);
  const { request } = useFetch();
  useEffect(() => {
    document.title = "SAT | Meu Perfil";
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
          setCurrentUser(null);
          logout();
        }
      } else {
        navigate("/");
      }
    }
    fetchValidaToken();
  }, []);

  return (
    <div className={styles.container}>
      <Title text="Cadastrar Questionário" fontSize="3" />
      <form
        action=""
        className={styles.form}
       
      >
        <InputText label="Titulo" gridColumn="1/3" />
        <InputText type="date" label="Vigencia Inicio" gridColumn="3" />
        <InputText type="date" label="Vigencia Fim" gridColumn="4" />
        <InputText label="Descrição" gridColumn="1/5" />
        <InputText label="Status" />
      </form>
    </div>
  );
};

export default QuestionariosCadastro;
