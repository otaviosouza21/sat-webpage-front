import React, { useEffect, useRef, useState } from "react";
import { Header } from "../Header/Header";
import Footer from "../Footer/Footer";
import EmConstrucao from "../EmConstrucao/EmConstrucao";
import InputText from "../Forms/Input/InputText";
import styles from "./CadastroUsuario.module.css";
import Button from "../Button/Button";
import Title from "../Titles/Title";
import InputSelect from "../Forms/Input/InputSelect";
import useForm from "../../Hooks/useForm";
import useFetch from "../../Hooks/useFetch";
import { GET_ALL, POST_DATA_USER } from "../../Api/api";

const CadastroUsuario = () => {
  const [rules, setRules] = useState(null);
  const formRef = useRef();

  const nameForm = useForm();
  const emailForm = useForm("email");
  const senhaForm = useForm("senha");
  const contatoP1Form = useForm();
  const contatoP2Form = useForm();
  const contatoN1Form = useForm();
  const contatoN2Form = useForm();
  const morador = useForm();
  const socioSatForm = useForm();
  const { request, data } = useFetch();

  useEffect(() => {
    const { url, options } = GET_ALL("rules");
    async function getRules() {
      const rulesData = await request(url, options);
      setRules(rulesData.json);
    }
    getRules();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    if (
      nameForm.validate() &&
      emailForm.validate() &&
      senhaForm.validate() &&
      contatoP1Form.validate() &&
      contatoN1Form.validate() &&
      morador.validate() &&
      rules
    ) {
      const dataUsuario = {
        nome: nameForm.value,
        email: emailForm.value,
        senha: senhaForm.value,
        contato_pessoal_01: contatoP1Form.value,
        contato_pessoal_02: contatoP2Form.value,
        contato_negocio_01: contatoN1Form.value,
        contato_negocio_02: contatoN2Form.value,
        tempo_reside: morador.value,
        socio_sat: formRef.current["socio_sat"].checked ? true : false,
        status: formRef.current["status"].value === "Ativo" ? true : false,
        rule_id: +formRef.current["rule"].value,
      };

      async function postUser() {
        const { url, options } = POST_DATA_USER("usuarios", dataUsuario);
        const userRequest = await request(url, options);
      }
      postUser();
    }
  }
  if (rules)
    return (
      <section>
        <Header />
        <section className={`${styles.cadastroContainer} container`}>
          <Title text="Novo Cadastro" fontSize="3" />
          <form
            onSubmit={handleSubmit}
            ref={formRef}
            className={styles.cadastroUsuario}
          >
            <InputText
              label="Nome Completo*"
              type="text"
              id="nome"
              placeholder="João de Souza"
              gridColumn="1/5"
              {...nameForm}
            />
            <InputText
              label="Email*"
              type="email"
              id="email"
              placeholder="joao@email.com"
              gridColumn="1/3"
              {...emailForm}
            />
            <InputText
              label="Senha*"
              type="password"
              id="password"
              gridColumn="3/5"
              {...senhaForm}
            />
            <InputText
              label="Contato Pessoal*"
              type="text"
              id="contato_pessoal_01"
              placeholder="(xx) xxxxx-xxxx"
              {...contatoP1Form}
            />
            <InputText
              label="Contato Pessoal 2"
              type="text"
              id="contato_pessoal_02"
              placeholder="(xx) xxxxx-xxxx"
            />
            <InputText
              label="Contato Negocio*"
              type="text"
              id="contato_negocio_01 "
              placeholder="(xx) xxxxx-xxxx"
              {...contatoN1Form}
            />
            <InputText
              label="Contato Negocio 2"
              type="text"
              id="contato_negocio_02"
              placeholder="(xx) xxxxx-xxxx"
            />
            <InputText
              label="Morador (Anos)"
              type="number"
              id="tempo_reside"
              placeholder="Tempo que reside em Taiaçupeba"
              gridColumn="1/3"
              {...morador}
            />
            <InputSelect label="Perfil" options={rules} id="rule" />
            <InputSelect
              label="Status"
              options={[{ nome: "Ativo" }, { nome: "Inativo" }]}
              id="status"
            />
            <InputText
              label="Sócio Sat"
              type="checkbox"
              id="socio_sat"
              {...socioSatForm}
            />
            <Button handleSubmit={handleSubmit}>Cadastrar</Button>
          </form>
        </section>

        <Footer />
      </section>
    );
};

export default CadastroUsuario;
