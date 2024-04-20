import React, { useContext, useState } from "react";
import styles from "../../Cadastros/CadastroForm.module.css";
import useForm from "../../../Hooks/useForm";
import Title from "../../Titles/Title";
import Button from "../../Button/Button";
import InputText from "../../Forms/Input/InputText";
import useFetch from "../../../Hooks/useFetch";
import { RECOVER_PASSWORD } from "../../../Api/api";
import Toast from "../../Toast/Toast";
import ModalAlert from "../../Utils/ModalAlert/ModalAlert";
import { GlobalContext } from "../../../Hooks/GlobalContext";


const SendRequest = () => {
  const email = useForm("email");
  const { request, loading,error } = useFetch();
  const [alert,setAlert] = useState(false)
  const { setModal } = useContext(GlobalContext);

  setModal('')
  function handleSubmit(e) {
    e.preventDefault();


    if (email.validate()) {
      const requestEmail = { email: email.value };
      async function sendEmail() {
        
        const {url,options} = RECOVER_PASSWORD('recover-password',requestEmail)
        const {response,json} = await request(url,options)

        if(!response.ok){
            console.log('Erro ao enviar email');
            return
        }
        else{
            email.reset()
            setAlert(true)
        }
        
      }
      sendEmail();
    }
  }
if(error) return <Error error='erro' />
  return (
    <section className={`container ${styles.containerForm}`}>
      <Title text="Recuperação de senha" fontSize="3" />
      <form onSubmit={handleSubmit}>
        <div className={styles.cadastroUsuario}>
          <InputText
            {...email}
            type="email"
            id="email"
            label="Insira seu Email"
          />
          <Button handleSubmit={handleSubmit}>Recuperar Senha</Button>
        </div>
      {alert && <ModalAlert mensagem={`Um email de recuperação foi enviado para o email ${email.value}`}/>}
      </form>
    </section>
  );
};

export default SendRequest;
