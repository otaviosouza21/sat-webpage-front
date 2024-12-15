import React, { useEffect, useRef, useState } from "react";
import styles from "./ModalLogin.module.css";
import InputText from "../Forms/Input/InputText";
import Title from "../Titles/Title";
import useForm from "../../Hooks/useForm";
import useFetch from "../../Hooks/useFetch";
import { GET_AUTH_USER, POST_LOGIN } from "../../Api/api";
import { useGlobalContext } from "../../Hooks/GlobalContext.tsx";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { defaultUserAuth } from "../../types/apiTypes.ts";

interface ModalLoginProps {
  modal: string;
  setModal: React.Dispatch<React.SetStateAction<string>>;
}

const ModalLogin = ({ modal, setModal }: ModalLoginProps) => {
  const modalContainerPost = useRef(null);
  const CloseContainerPost = useRef(null);
  const [token, setToken] = useState(null);
  const [buttonState, setButtonState] = useState("Entrar");
  const { request, error, loading, data } = useFetch();
  const { setUserAuth } = useGlobalContext();
  const navigate = useNavigate();
  const emailForm = useForm("email");
  const senhaForm = useForm("senha");

  function handleSubmit(e: React.FormEvent<HTMLFormElement> | any) {
    e.preventDefault();
    if (emailForm.validate() && senhaForm.validate()) {
      const dataLogin = {
        email: emailForm.value,
        senha: senhaForm.value,
      };

      async function postLogin() {
        const { url, options } = POST_LOGIN("usuarios", dataLogin);
        const requestLogin = await request(url, options);
        if (requestLogin.response?.ok) {
          const token = requestLogin.json.token;
          setToken(token);
          window.localStorage.setItem("token", token);
          authLogin(token);
          navigate("/meu_perfil/perfil");
        } else {
          setToken(null);
        }
      }

      async function authLogin(token: string) {
        const { id }: any = jwtDecode(token);
        const { url, options } = GET_AUTH_USER("usuarios", token, id);
        const { response, json } = await request(url, options);

        if (!response?.ok) {
          console.log("Erro ao realizar Login");
          setUserAuth(defaultUserAuth);
        } else {
          setUserAuth(defaultUserAuth);
          setButtonState("Bem Vindo");
          setModal("");
        }
      }

      postLogin();
    }
  }

  function closeModal(e: React.MouseEvent | any) {
    e.preventDefault();
    if (
      e.target === modalContainerPost.current ||
      e.target === CloseContainerPost.current
    ) {
      setModal("");
      const overflow = document.querySelector("body");
      overflow?.classList.remove("overFlow");
    }
  }

  return (
    <div ref={modalContainerPost} className={styles.modalContainer}>
      <form className={`${styles.modalLogin} animation-opacity`}>
        <button
          ref={CloseContainerPost}
          onClick={closeModal}
          className={styles.close}
          type="button"
        >
          X
        </button>
        <Title text="Faça Login" fontSize="3" />
        <InputText {...emailForm} label="Email" id="email" type="email" />
        <InputText {...senhaForm} label="Senha" id="password" type="password" />
        <div>
          <p className={data && !loading ? styles.error : ""}>
            {data && !loading ? data.message : ""}
          </p>
        </div>
        <div className={styles.options}>
          <span onClick={() => navigate("/send-request")}>Esqueci a Senha</span>
          <span
            onClick={() => {
              setModal("");
              setModal("cadUsuario");
            }}
          >
            Me Cadastrar
          </span>
        </div>
        <button onClick={handleSubmit}>
          {loading ? "Entrando..." : buttonState}
        </button>
      </form>
    </div>
  );
};

export default ModalLogin;
