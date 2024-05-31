import React, { useContext, useEffect, useRef, useState } from "react";
import InputText from "../../Forms/Input/InputText";
import styles from "../CadastroForm.module.css";
import Button from "../../Button/Button";
import Title from "../../Titles/Title";
import InputSelect from "../../Forms/Input/InputSelect";
import useForm from "../../../Hooks/useForm";
import useFetch from "../../../Hooks/useFetch";
import { GET_ALL, GET_AUTH_USER, UPDATE_DATA } from "../../../Api/api";
import Loading from "../../Utils/Loading/Loading";
import Toast from "../../Toast/Toast";
import { GlobalContext } from "../../../Hooks/GlobalContext";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import LoadingCenterComponent from "../../Utils/LoadingCenterComponent/LoadingCenterComponent";

const AtualizaUsuario = () => {
  const [rules, setRules] = useState(null);
  const [statusCadastro, setStatusCadastro] = useState(null);
  const { dataUpdate, userAuth,setUserAuth } = useContext(GlobalContext);
  const formRef = useRef(); // utilizado para acesso ao input options
  const navigate = useNavigate();

  const nameForm = useForm();
  const emailForm = useForm("email");
  const contatoP1Form = useForm("phone");
  const contatoP2Form = useForm("phone");
  const contatoN1Form = useForm("phone");
  const contatoN2Form = useForm("phone");
  const morador = useForm();
  const socioSatForm = useForm(false);
  const { request, data, loading, error } = useFetch();

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    async function fetchValidaToken() {
      if (token) {
        const { id, rule } = jwtDecode(token);
        const { url, options } = GET_AUTH_USER("usuarios", token, id);
        const { response, json } = await request(url, options);
        if (response.ok) {
          setUserAuth({ token, usuario: json, status: true, rule });
        } else {
          setUserAuth({});
          logout();
        }
      } else {
        navigate("/");
      }
    }
    fetchValidaToken();
  }, []);

  //================UPDATE=====================//
  useEffect(() => {
    if (dataUpdate) {
      nameForm.setValue(dataUpdate.nome);
      emailForm.setValue(dataUpdate.email);
      contatoP1Form.setValue(dataUpdate.contato_pessoal_01);
      contatoP2Form.setValue(dataUpdate.contato_pessoal_02);
      contatoN1Form.setValue(dataUpdate.contato_negocio_01);
      contatoN2Form.setValue(dataUpdate.contato_negocio_02);
      morador.setValue(dataUpdate.tempo_reside);
      console.log(dataUpdate);
      setTimeout(() => {
          formRef.current["socio_sat"].checked = dataUpdate.socio_sat;
          formRef.current["rule"].value = String(dataUpdate.rule_id);
          formRef.current["status"].value =
            dataUpdate.status === "1" ? "Ativo" : "Inativo";
      }, 1000);
    }
  }, []);

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
      contatoP1Form.validate() &&
      contatoN1Form.validate() &&
      morador.validate() &&
      rules &&
      dataUpdate
    ) {
      const dataUsuario = {
        nome: nameForm.value,
        email: emailForm.value,
        contato_pessoal_01: contatoP1Form.value,
        contato_pessoal_02: contatoP2Form.value,
        contato_negocio_01: contatoN1Form.value,
        contato_negocio_02: contatoN2Form.value,
        tempo_reside: morador.value,
        socio_sat:
          userAuth.rule === 3
            ? formRef.current["socio_sat"].checked
              ? "Sim"
              : "Não"
            : "False",
        status:
          userAuth.rule === 3
            ? formRef.current["status"].value === "Ativo"
              ? "1"
              : "3"
            : "1",
        rule_id: +formRef.current["rule"].value,
      };

      async function postUser() {
        const token = window.localStorage.getItem("token");
        const { url, options } = UPDATE_DATA(
          "usuarios",
          dataUsuario,
          dataUpdate.id,
          token
        );

        const userRequest = await request(url, options);
        if (userRequest.response.ok) {
          setStatusCadastro(userRequest.json.message);
          nameForm.reset();
          emailForm.reset();
          contatoN1Form.reset();
          contatoN2Form.reset();
          contatoP1Form.reset();
          contatoP2Form.reset();
          morador.reset();
          formRef.current["socio_sat"].unchecked;
          setTimeout(() => {
            navigate(-1);
          }, 1000);
        }
      }
      postUser();
    } else {
      setStatusCadastro("Verifique se todos os campos estao preenchidos");
    }
  }
  console.log(loading);
  if(loading) return '<LoadingCenterComponent />'
  if (rules)
    return (
      <section>
        <section className={`${styles.cadastroContainer} container`}>
          <Title text="Atualizar Cadastro" fontSize="3" />
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
              label="Contato Pessoal*"
              type="text"
              id="contato_pessoal_01"
              placeholder="(xx) xxxxx-xxxx"
              {...contatoP1Form}
            />
            {userAuth.status &&
              userAuth.rule === 3 && ( //somente ADM
                <InputText
                  label="Contato Pessoal 2"
                  type="text"
                  id="contato_pessoal_02"
                  placeholder="(xx) xxxxx-xxxx"
                  {...contatoP2Form}
                />
              )}
            <InputText
              label="Contato Negocio*"
              type="text"
              id="contato_negocio_01 "
              placeholder="(xx) xxxxx-xxxx"
              {...contatoN1Form}
            />
            {userAuth.status &&
              userAuth.rule === 3 && ( //somente ADM
                <InputText
                  label="Contato Negocio 2"
                  type="text"
                  id="contato_negocio_02"
                  placeholder="(xx) xxxxx-xxxx"
                  {...contatoN2Form}
                />
              )}
            <InputText
              label="Morador (Anos)"
              type="number"
              id="tempo_reside"
              placeholder="Tempo que reside em Taiaçupeba"
              gridColumn="1/3"
              {...morador}
            />

            <InputSelect
              label="Perfil"
              options={rules}
              id="rule"
              opacity={userAuth.rule === 3 ? null : 0}
            />

            <InputSelect
              label="Status"
              options={[{ nome: "Ativo" }, { nome: "Inativo" }]}
              id="status"
              opacity={userAuth.rule === 3 ? null : 0}
            />

            <InputText
              label="Sócio Sat"
              type="checkbox"
              id="socio_sat"
              {...socioSatForm}
              opacity={userAuth.rule === 3 ? null : 0}
            />

            <Button handleSubmit={handleSubmit}>
              {loading ? "Salvando..." : "Salvar"}
            </Button>
            {error && <Toast message={error} color="tomato" />}
            {statusCadastro && (
              <Toast message={statusCadastro} color="green" />
            )}
          </form>
        </section>
      </section>
    );
};

export default AtualizaUsuario;
