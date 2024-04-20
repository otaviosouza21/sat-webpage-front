import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import InputText from "../../Forms/Input/InputText";
import Title from "../../Titles/Title";
import Button from "../../Button/Button";
import useForm from "../../../Hooks/useForm";
import styles from "../../Cadastros/CadastroForm.module.css";
import { UPDATE_PASSWORD } from "../../../Api/api";
import useFetch from "../../../Hooks/useFetch";

const ResetPassword = () => {
  const location = useLocation();
  const [isToken, setIsToken] = useState(false);
  const [updateOK,setUpdateOK]= useState(false)
  const {request,loading} = useFetch()
  const navigate = useNavigate('/')
  const senha = useForm("senha");
  const confirmSenha = useForm("senha");

  useEffect(() => {
    const token = new URLSearchParams(location.search).get("token");
    if (token) {
      window.localStorage.setItem("token", token);
      setIsToken(true);
    } else {
      setIsToken(null);
      window.localStorage.removeItem('token')
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    if (senha.value !== confirmSenha.value) {
      console.log("senhas diferentes");
      return;
    }

    if (senha.validate()) {
      const newPassword = {newPassword: senha.value};
      async function updatePassword() {
        const token = window.localStorage.getItem("token")
        const { url, options } = UPDATE_PASSWORD("reset-password",newPassword,token);
        const {response,json} = await request(url,options)
        if(!response.ok){
            throw new Error('Ocorreu um erro ao cadastrar')
        } 
        else{
           window.localStorage.removeItem('token')
           senha.reset()
           confirmSenha.reset()
           setUpdateOK(true)
        }
      }
      updatePassword();
    }
    else{
        console.log('Verifique se todos os campos estão preenchidos')
    }
  }

  return (
    <section className={`container ${styles.containerForm}`}>
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
            />
            <Button handleSubmit={handleSubmit}>Salvar</Button>
          </div>
        </form>
      ) : (
        <Title text="Token invalido ou inspirado" fontSize="4" />
      )}
    </section>
  );
};

export default ResetPassword;
