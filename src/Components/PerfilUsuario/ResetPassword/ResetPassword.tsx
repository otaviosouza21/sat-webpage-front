import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import InputText from "../../Forms/Input/InputText.tsx";
import Title from "../../Titles/Title.tsx";
import Button from "../../Button/Button.tsx";
import useForm from "../../../Hooks/useForm.tsx";
import styles from "../../Cadastros/CadastroForm.module.css";
import { GET_AUTH_USER, UPDATE_PASSWORD } from "../../../Api/api.ts";
import useFetch from "../../../Hooks/useFetch.tsx";
import { jwtDecode } from "jwt-decode";
import Toast from "../../Toast/Toast.tsx";
import ModalAlert from "../../Utils/ModalAlert/ModalAlert.tsx";
import useToast from "../../../Hooks/useToast.tsx";
 
const ResetPassword = () => {
  const location = useLocation();
  const [isToken, setIsToken] = useState<string>('');
  const [updateOK, setUpdateOK] = useState(false);
  const [alert, setAlert] = useState(null);
  const { request, loading, data } = useFetch();
  const activeToast = useToast()
  const senha = useForm("senha");
  const confirmSenha = useForm("senha");
 
 
  useEffect(() => {
    const token = new URLSearchParams(location.search).get("token");
    async function fetchValidaToken() {
      if (token) {
        const { id }: any = jwtDecode(token);
        const { url, options } = GET_AUTH_USER("usuarios", token, id);
        const { response, json } = await request(url, options);
        if(response?.ok){
          setIsToken(token);
        }
      } else {
        setIsToken('');
      }
    }
    fetchValidaToken();
  }, []);
 
 
  function handleSubmit(e: React.FormEvent<HTMLFormElement> | any ) {
    e.preventDefault();
 
    if (senha.value !== confirmSenha.value) {
      confirmSenha.setError("Senha não confere");
      return false;
    }
 
    if (senha.validate() && isToken) {
      const newPassword =  senha.value;
      async function updatePassword() {
 
        const { url, options } = UPDATE_PASSWORD(
          "reset-password",
          newPassword,
          isToken
        );
        const { response, json } = await request(url, options);
        if (!response?.ok) {
          throw new Error("Ocorreu um erro ao cadastrar");
        } else {
          senha.reset();
          confirmSenha.reset();
          setUpdateOK(true);
        }
      }
      updatePassword();
    } else {
      activeToast({message:'Verifique se todos os campos estão preenchidos', type:'warning'})
 
    }
  }
 
  return (
    <section className={`container ${styles.containerForm}`}>
      {updateOK && <ModalAlert title="Notificação!" mensagem='Senha Alterada com Sucesso'/>}
      <Title text="Recuperação de senha" fontSize="3" />
      {isToken ? (
        <form onSubmit={handleSubmit}>
          <div className={styles.cadastroUsuario}>
            <InputText
              {...senha}
              type="password"
              id="senha"
              label="Nova Senha"
              gridColumn='1'
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
          {alert && <Toast message={alert} color='gold'/>}
        </form>
      ) : (
        <Title text="Link invalido ou inspirado" fontSize="4" />
      )}
    </section>
  );
};
 
export default ResetPassword;