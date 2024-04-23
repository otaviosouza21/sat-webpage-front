import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import InputText from "../../Forms/Input/InputText";
import Title from "../../Titles/Title";
import Button from "../../Button/Button";
import useForm from "../../../Hooks/useForm";
import styles from "../../Cadastros/CadastroForm.module.css";
import { GET_AUTH_USER, UPDATE_PASSWORD } from "../../../Api/api";
import useFetch from "../../../Hooks/useFetch";
import { jwtDecode } from "jwt-decode";
import Toast from "../../Toast/Toast";
import ModalAlert from "../../Utils/ModalAlert/ModalAlert";

const ResetPassword = () => {
  const location = useLocation();
  const [isToken, setIsToken] = useState(null);
  const [updateOK, setUpdateOK] = useState(false);
  const [alert, setAlert] = useState(null);
  const { request, loading, data } = useFetch();
  const navigate = useNavigate("/");
  const senha = useForm("senha");
  const confirmSenha = useForm("senha");

  

  useEffect(() => {
    const token = new URLSearchParams(location.search).get("token");
    async function fetchValidaToken() {
      if (token) {
        const { id } = jwtDecode(token);
        const { url, options } = GET_AUTH_USER("usuarios", token, id);
        const { response, json } = await request(url, options);
        if(response.ok){
          setIsToken(token);
        }
      } else {
        setIsToken(null);
      }
    }
    fetchValidaToken();
  }, []);


  function handleSubmit(e) {
    e.preventDefault();

    if (senha.value !== confirmSenha.value) {
      confirmSenha.setError("Senha não confere");
      return false;
    }

    if (senha.validate() && isToken) {
      const newPassword = { newPassword: senha.value };
      async function updatePassword() {
        const { url, options } = UPDATE_PASSWORD(
          "reset-password",
          newPassword,
          isToken
        );
        const { response, json } = await request(url, options);
        if (!response.ok) {
          throw new Error("Ocorreu um erro ao cadastrar");
        } else {
          senha.reset();
          confirmSenha.reset();
          setUpdateOK(true);
        }
      }
      updatePassword();
    } else {
      setAlert("Verifique se todos os campos estão preenchidos");
    }
  }

  return (
    <section className={`container ${styles.containerForm}`}>
      {updateOK && <ModalAlert mensagem='Senha Alterada com Sucesso'/>}
      <Title text="Recuperação de senha" fontSize="3" />
      {isToken ? (
        <form onSubmit={handleSubmit}>
          <div className={styles.cadastroUsuario}>
            <InputText
              {...senha}
              type="password"
              id="senha"
              label="Nova Senha"
            />
            <InputText
              {...confirmSenha}
              type="password"
              id="confirmSenha"
              label="Confirme a senha"
              errorConfere={confirmSenha.error}
            />
            <Button handleSubmit={handleSubmit}>Salvar</Button>
          </div>
          {alert && <Toast message={alert}/>}
        </form>
      ) : (
        <Title text="Link invalido ou inspirado" fontSize="4" />
      )}
    </section>
  );
};

export default ResetPassword;
