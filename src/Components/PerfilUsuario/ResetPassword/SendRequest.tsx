import { useEffect, useState } from "react";
import styles from "../../Cadastros/CadastroForm.module.css";
import useForm from "../../../Hooks/useForm";
import Title from "../../Titles/Title";
import Button from "../../Button/Button";
import InputText from "../../Forms/Input/InputText";
import useFetch from "../../../Hooks/useFetch";
import { RECOVER_PASSWORD } from "../../../Api/api";
 
import { useGlobalContext } from "../../../Hooks/GlobalContext.tsx";
import LoadingCenterComponent from "../../Utils/LoadingCenterComponent/LoadingCenterComponent";
import useToast from "../../../Hooks/useToast";
 
const SendRequest = () => {
  const email = useForm("email");
  const { data,request, loading,error } = useFetch();
  const [alert, setAlert] = useState(null);
  const [errorAlert,setErrorAlert] = useState(null)
  const { setModal } = useGlobalContext();
  const activeToast = useToast()
 
 
  useEffect(()=>{
    setModal('')
    setAlert(null)
    setErrorAlert(null)
  },[])
 
  function handleSubmit(e: React.FormEvent<HTMLFormElement> | any ) {
    e.preventDefault();
 
    if (email.validate()) {
      const requestEmail = { email: email.value };
      async function sendEmail() {
        const { url, options } = RECOVER_PASSWORD("recover-password", requestEmail.email);
        const { response, json } = await request(url, options);
        if (!response?.ok) {
          return;
        } else {
          activeToast({message: `${json.mensagem} para ${json.email}`, type: 'success'});
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
          </form>
        </>
      )}
    </section>
  );
};
 
export default SendRequest;