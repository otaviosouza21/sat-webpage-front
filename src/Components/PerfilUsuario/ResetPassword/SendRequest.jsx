import React, { useContext, useEffect, useState } from "react";
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
import LoadingCenterComponent from "../../Utils/LoadingCenterComponent/LoadingCenterComponent";

const SendRequest = () => {
  const email = useForm("email");
  const { data,request, loading,error } = useFetch();
  const [alert, setAlert] = useState(null);
  const [errorAlert,setErrorAlert] = useState(null)
  const { setModal } = useContext(GlobalContext);


  useEffect(()=>{
    setModal('')
    setAlert(null)
    setErrorAlert(null)
  },[])

  function handleSubmit(e) {
    e.preventDefault();

    if (email.validate()) {
      const requestEmail = { email: email.value };
      async function sendEmail() {
        const { url, options } = RECOVER_PASSWORD("recover-password", requestEmail);
        const { response, json } = await request(url, options);
        if (!response.ok) {
          return;
        } else {
          setAlert(`${json.mensagem} para ${json.email}`);
          email.reset();
        }
      }
      sendEmail();
    }
  }
  return (
    <section className={`container ${styles.containerForm}`}>
      {loading ? (
        <LoadingCenterComponent />
      ) : (
        <>
          <Title text="Recuperação de senha" fontSize="3" />
          <form onSubmit={handleSubmit} className={styles.cadastroUsuario}>
            <InputText
              {...email}
              type="email"
              id="email"
              label="Insira seu Email"
              gridColumn='1/4'
            />
            <Button handleSubmit={handleSubmit}>Recuperar Senha</Button>
            {alert && (<ModalAlert  mensagem={`${alert}`} />)} 
            {data && !data.status && <Toast color="text-bg-danger" message={data.mensagem}/>}
          </form>
        </>
      )}
    </section>
  );
};

export default SendRequest;
