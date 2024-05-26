import React, { useState } from "react";
import InputText from "../Forms/Input/InputText";
import styles from "./SendEmailForm.module.css";
import Button from "../Button/Button";
import useForm from "../../Hooks/useForm";
import useFetch from "../../Hooks/useFetch";
import { SEND_EMAIL } from "../../Api/api";
import Toast from "../Toast/Toast";

const SendEmailForm = () => {
  const nomeForm = useForm();
  const emailForm = useForm("email");
  const mensagemForm = useForm();
  const { data, request, loading, error } = useFetch();
  const [alert, setAlert] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (
      nomeForm.validate() &&
      emailForm.validate() &&
      mensagemForm.validate()
    ) {
      const emailBody = {
        to: "otaviosouzalu@gmail.com",
        subject: `Mensagem de ${nomeForm.value} pelo portal do empreendedor SAT`,
        text: `
        Ola! 
        Nome: ${nomeForm.value}
        Email: ${emailForm.value}
        Mensagem: ${mensagemForm.value}
        `,
      };

      async function sendEmail() {
        const { url, options } = SEND_EMAIL(emailBody);
        const { response } = await request(url, options);
        if (response.ok) {
          nomeForm.reset();
          emailForm.reset();
          mensagemForm.reset();
          setAlert({ message: "Mensagem Enviada com sucesso", color: "green" });
        } else
          setAlert({ message: "Ocorreu um erro ao enviar", color: "tomato" });
      }
      sendEmail();
    } else {
      setAlert({ message: "Preencha todos os campos", color: "tomato" });
    }

    setTimeout(() => {
      setAlert(null);
    }, 4000);
  }

  return (
    <section style={{ background: "var(--primary2)" }}>
      <div className={`container ${styles.containerForm}`}>
        <div className={styles.title}>
          <h1>Envie uma mensagem.</h1>
          <p>Responderemos o mais rapido possivel</p>
        </div>
        <form onSubmit={handleSubmit} className={styles.form} action="">
          <InputText {...nomeForm} type="text" placeholder="Seu Nome" />
          <InputText {...emailForm} type="email" placeholder="Seu Email" />
          <InputText {...mensagemForm} type="text" placeholder="Mensagem" />
          <button>{loading ? "Enviando..." : "Enviar"}</button>
          {alert && <Toast message={alert.message} color={alert.color} />}
        </form>
      </div>
    </section>
  );
};

export default SendEmailForm;
