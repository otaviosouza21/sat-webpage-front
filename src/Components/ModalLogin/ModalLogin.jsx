import React, { useRef, useState } from "react";
import styles from "./ModalLogin.module.css";
import InputText from "../Forms/Input/InputText";
import Button from "../Button/Button";
import Title from "../Titles/Title";
import useForm from "../../Hooks/useForm";
import useFetch from "../../Hooks/useFetch";
import { AUTH_LOGIN, POST_LOGIN } from "../../Api/api";

const ModalLogin = ({ modal, setModal }) => {
  const modalContainerPost = useRef(null);
  const CloseContainerPost = useRef(null);
  const [token, setToken] = useState();
  const emailForm = useForm("email");
  const senhaForm = useForm("");
  const { request, error, loading, data } = useFetch();

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
          setToken(requestLogin.json.token);
          window.localStorage.setItem("token", token);
          authLogin(token, dataLogin);
        }
      }

      async function authLogin(token, data) {
        const { url, options } = AUTH_LOGIN("usuarios", token, data);

        const authLogin = await request(url, options);
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
          {loading ? "carregando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
};

export default ModalLogin;
