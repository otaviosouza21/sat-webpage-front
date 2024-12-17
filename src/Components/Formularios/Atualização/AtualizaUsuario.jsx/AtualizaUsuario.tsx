import React, { useEffect, useRef, useState } from "react";
import InputText from "../../Forms/Input/InputText.tsx";
import styles from "../CadastroForm.module.css";
import Button from "../../../Button/Button.tsx";
import Title from "../../../Titles/Title.tsx";
import InputSelect from "../../Forms/Input/InputSelect.tsx";
import useForm from "../../../../Hooks/useForm.tsx";
import useFetch from "../../../../Hooks/useFetch.tsx";
import { GET_ALL, UPDATE_DATA } from "../../../../Api/api.ts";
import { useGlobalContext } from "../../../../Hooks/GlobalContext.tsx";
import { useNavigate } from "react-router-dom";
import LoadingCenterComponent from "../../../Utils/LoadingCenterComponent/LoadingCenterComponent.tsx";
import useTokenValidate from "../../../../Hooks/useTokenValidate.tsx";
import useToast from "../../../../Hooks/useToast.tsx";

const AtualizaUsuario = () => {
  const [perfil, setPerfil] = useState<string>("");
  const [statusCadastro, setStatusCadastro] = useState<string>("");
  const [socio, setSocio] = useState<boolean>(false);

  const [rules, setRules] = useState(null);

  const { dataUpdate } = useGlobalContext();
  const formRef = useRef<HTMLFormElement>(null); // utilizado para acesso ao input options
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
  const { fetchValidaToken, userAuth } = useTokenValidate();
  const activeToast = useToast();

  useEffect(() => {
    fetchValidaToken();
  }, [userAuth.rule]);

  //================UPDATE=====================//
  useEffect(() => {
    if (dataUpdate) {
      setPerfil(dataUpdate.rule_id);
      setStatusCadastro(dataUpdate.status === "1" ? "1" : "2");
      setSocio(dataUpdate.socio_sat);
      nameForm.setValue(dataUpdate.nome);
      emailForm.setValue(dataUpdate.email);
      contatoP1Form.setValue(dataUpdate.contato_pessoal_01);
      contatoP2Form.setValue(dataUpdate.contato_pessoal_02);
      contatoN1Form.setValue(dataUpdate.contato_negocio_01);
      contatoN2Form.setValue(dataUpdate.contato_negocio_02);
      morador.setValue(dataUpdate.tempo_reside);
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

  function handleSubmit(e: React.FormEvent<HTMLFormElement> | any) {
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
        socio_sat: socio,
        status: statusCadastro,
        rule_id: perfil,
      };

      async function postUser() {
        const token = window.localStorage.getItem("token");

        const { url, options } = UPDATE_DATA(
          "usuarios",
          dataUsuario,
          dataUpdate.id,
          token ? token : ""
        );

        const userRequest = await request(url, options);
        if (userRequest.response?.ok) {
          setStatusCadastro(userRequest.json.message);
          nameForm.reset();
          emailForm.reset();
          contatoN1Form.reset();
          contatoN2Form.reset();
          contatoP1Form.reset();
          contatoP2Form.reset();
          morador.reset();
          formRef.current && formRef.current["socio_sat"].unchecked;
          activeToast({
            message: "Categoria Atualizada com Sucesso",
            type: "success",
          });
          setTimeout(() => {
            navigate(-1);
          }, 1000);
        } else {
          activeToast({ message: error ? error : "", type: "error" });
        }
      }
      postUser();
    } else {
      activeToast({
        message: "Por Favor, Preencha todos os campos obrigatórios",
        type: "warning",
      });
    }
  }

  if (loading) return <LoadingCenterComponent />;
  if (rules)
    return (
      <section>
        <section className={`${styles.cadastroContainer} container`}>
          <Title text="Atualizar Cadastro" fontSize="3" />
          <form
            data-aos="fade-right"
            data-aos-easing="linear"
            data-aos-duration="500"
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
              value={perfil}
              onChange={(e) => setPerfil(e.target.value)}
            />

            <InputSelect
              label="Status"
              options={[
                { id: 1, nome: "Ativo" },
                { id: 2, nome: "Inativo" },
              ]}
              id="status"
              value={statusCadastro}
              onChange={(e) => setStatusCadastro(e.target.value)}
              opacity={userAuth.rule === 3 ? null : 0}
            />

            <InputText
              label="Sócio Sat"
              type="checkbox"
              id="socio_sat"
              {...socioSatForm}
              checked={socio}
              onChange={(e) => setSocio(e.target.value === "1" ? true : false)}
              opacity={userAuth.rule === 3 ? null : 0}
            />

            <Button handleSubmit={handleSubmit}>
              {loading ? "Salvando..." : "Salvar"}
            </Button>
          </form>
        </section>
      </section>
    );
};

export default AtualizaUsuario;
