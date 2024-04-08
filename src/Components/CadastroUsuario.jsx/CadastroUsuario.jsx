import React, { useContext, useEffect, useRef, useState } from "react";
import { Header } from "../Header/Header";
import Footer from "../Footer/Footer";
import InputText from "../Forms/Input/InputText";
import styles from "./CadastroUsuario.module.css";
import Button from "../Button/Button";
import Title from "../Titles/Title";
import InputSelect from "../Forms/Input/InputSelect";
import useForm from "../../Hooks/useForm";
import useFetch from "../../Hooks/useFetch";
import { GET_ALL, POST_DATA_USER, UPDATE_DATA } from "../../Api/api";
import Loading from "../Utils/Loading/Loading";
import Toast from "../Toast/Toast";
import { GlobalContext } from "../../Hooks/GlobalContext";
import { useNavigate } from "react-router-dom";

const CadastroUsuario = () => {
  const [rules, setRules] = useState(null);
  const [statusCadastro, setStatusCadastro] = useState(null);
  const { update, setUpdate, admAuth, dataUpdate } = useContext(GlobalContext);
  const formRef = useRef(); // utilizado para acesso ao input options
  const navigate = useNavigate();

  const nameForm = useForm();
  const emailForm = useForm("email");
  const senhaForm = useForm("senha");
  const contatoP1Form = useForm("phone");
  const contatoP2Form = useForm("phone");
  const contatoN1Form = useForm("phone");
  const contatoN2Form = useForm("phone");
  const morador = useForm();
  const socioSatForm = useForm(false);
  const { request, data, loading, error } = useFetch();

  //================UPDATE=====================//
  useEffect(() => {
    if (update && dataUpdate) {
      nameForm.setValue(dataUpdate.nome);
      emailForm.setValue(dataUpdate.email);
      senhaForm.setValue(dataUpdate.senha);
      contatoP1Form.setValue(dataUpdate.contato_pessoal_01);
      contatoP2Form.setValue(dataUpdate.contato_pessoal_02);
      contatoN1Form.setValue(dataUpdate.contato_negocio_01);
      contatoN2Form.setValue(dataUpdate.contato_negocio_02);
      morador.setValue(dataUpdate.tempo_reside);
      setTimeout(() => {
        formRef.current["socio_sat"].checked = dataUpdate.socio_sat;
        formRef.current["rule"].value = String(dataUpdate.rule_id);
      }, 1000);
    }
  }, [update]);

  //==============Puxa rules da api=================//
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

    //valida todos os campos
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

      console.log(dataUsuario);

      async function postUser() {
        const token = window.localStorage.getItem('token')
        const { url, options } =
          update && dataUpdate
            ? UPDATE_DATA("usuarios", dataUsuario, dataUpdate.id,token) // caso update true, Atualiza
            : POST_DATA_USER("usuarios", dataUsuario); // caso false, novo cadastro
        const userRequest = await request(url, options);
        if (userRequest.response.ok) {
          setStatusCadastro(userRequest.json.message);
          nameForm.reset();
          emailForm.reset();
          senhaForm.reset();
          contatoN1Form.reset();
          contatoN2Form.reset();
          contatoP1Form.reset();
          contatoP2Form.reset();
          morador.reset();
          formRef.current["socio_sat"].unchecked;
          setUpdate(!update);


          setTimeout(() => {
            navigate("/adm");
          }, 1000);
        }
      }
      postUser();
    } else {
      setStatusCadastro("Verifique se todos os campos estao preenchidos");
    }
  }

  if (rules)
    return (
      <section>
        <Header />
        <section className={`${styles.cadastroContainer} container`}>
          <Title text={`${dataUpdate ? 'Atualizar' : 'Novo'} Cadastro`} fontSize="3" />
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
              {...contatoP2Form}
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
              {...contatoN2Form}
            />
            <InputText
              label="Morador (Anos)"
              type="number"
              id="tempo_reside"
              placeholder="Tempo que reside em Taiaçupeba"
              gridColumn="1/3"
              {...morador}
            />

            {admAuth && (
              <InputSelect label="Perfil" options={rules} id="rule" />
            )}

            {admAuth && (
              <InputSelect
                label="Status"
                options={[{ nome: "Ativo" }, { nome: "Inativo" }]}
                id="status"
              />
            )}

            {admAuth && (
              <InputText
                label="Sócio Sat"
                type="checkbox"
                id="socio_sat"
                {...socioSatForm}
              />
            )}

            <Button handleSubmit={handleSubmit}>
              {loading ? "Salvando..." : "Salvar"}
            </Button>
            {error && <Toast message={error} color="text-bg-danger" />}
            {statusCadastro && (
              <Toast message={statusCadastro} color="text-bg-success" />
            )}
          </form>
        </section>

        <Footer />
      </section>
    );
};

export default CadastroUsuario;
