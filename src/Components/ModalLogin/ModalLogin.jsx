import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./ModalLogin.module.css";
import InputText from "../Forms/Input/InputText";
import Button from "../Button/Button";
import Title from "../Titles/Title";
import useForm from "../../Hooks/useForm";
import useFetch from "../../Hooks/useFetch";
import { GET_AUTH_USER, POST_LOGIN } from "../../Api/api";
import { GlobalContext } from "../../Hooks/GlobalContext";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ModalLogin = ({ modal, setModal }) => {
  const modalContainerPost = useRef(null);
  const CloseContainerPost = useRef(null);
  const [token, setToken] = useState(null);
  const [buttonState, setButtonState] = useState("Entrar");
  const emailForm = useForm("email");
  const senhaForm = useForm("senha");
  const { request, error, loading, data } = useFetch();
  const { userAuth, setUserAuth } = useContext(GlobalContext);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (emailForm.validate() && senhaForm.validate()) {
      const dataLogin = {
        email: emailForm.value,
        senha: senhaForm.value,
      };

      async function postLogin() {
        const { url, options } = POST_LOGIN("usuarios", dataLogin);
        const requestLogin = await request(url, options);
        if (requestLogin.response.ok) {
          const token = requestLogin.json.token;
          setToken(token);
          window.localStorage.setItem("token", token);
          authLogin(token, requestLogin.json.id);
        } else {
          setToken(null);
        }
      }

      async function authLogin(token) {
        const { id } = jwtDecode(token);
        const { url, options } = GET_AUTH_USER("usuarios", token, id);
        const { response, json } = await request(url, options);

        if (!response.ok) {
          console.log("Erro ao realizar Login");
          setUserAuth({ token: "", usuario: null, status: false });
        } else {
          setUserAuth({ token: token, usuario: json, status: true });
          setButtonState("Bem Vindo");
          setTimeout(() => {
            setModal(false);
          }, 1000);
        }
      }

      postLogin();
    }
  }

  function closeModal(event) {
    event.preventDefault();
    if (
      event.target === modalContainerPost.current ||
      event.target === CloseContainerPost.current
    ) {
      setModal(!modal);
    }
  }

  return (
    <div
      onClick={closeModal}
      ref={modalContainerPost}
      className={styles.modalContainer}
    >
      <form
        onSubmit={handleSubmit}
        className={`${styles.modalLogin} animation-opacity`}
      >
        <button
          ref={CloseContainerPost}
          onClick={closeModal}
          className={styles.close}
        >
          X
        </button>
        <Title text="Faça Login" fontSize="3" />
        <InputText {...emailForm} label="Email" id="email" type="email" />
        <InputText {...senhaForm} label="Senha" id="password" type="password" />
        <div className={styles.error}>
          <p>{error}</p>
        </div>
        <div className={styles.options}>
          <span>Esqueci a Senha</span>
          <span>Me Cadastrar</span>
        </div>
        <button onClick={handleSubmit}>
          {loading ? "Entrando..." : buttonState}
        </button>
      </form>
    </div>
  );
};

export default ModalLogin;
