import React, { useContext, useEffect, useRef, useState } from "react";
import useForm from "../../../Hooks/useForm";
import InputSelect from "../../Forms/Input/InputSelect";
import Toast from "../../Toast/Toast";
import Title from "../../Titles/Title";
import InputText from "../../Forms/Input/InputText";
import Button from "../../Button/Button";
import { POST_DATA } from "../../../Api/api";
import { GlobalContext } from "../../../Hooks/GlobalContext";
import useFetch from "../../../Hooks/useFetch";
import styles from "../../Atualização/CadastroForm.module.css";
import { useNavigate } from "react-router-dom";

const CadastroCategoria = () => {
  const { data, request, loading, error } = useFetch();
  const [statusCadastro, setStatusCadastro] = useState(null);
  const { setUpdate, update,dataUpdate } = useContext(GlobalContext);
  const navigate = useNavigate()

  const formRef = useRef();
  const nomeForm = useForm();
  const corForm = useForm();
  
  function handleSubmit(e) {
    e.preventDefault();
    if (nomeForm.validate()) {
      const dataCategoria = {
        nome: nomeForm.value,
        cor_categoria: corForm.value,
        status: formRef.current["status"].value === "Ativo" ? true : false,
      };

      async function cadastraCategoria() {
        const token = window.localStorage.getItem("token")
        if(token){
        const { url, options } = POST_DATA("categoria_servico", dataCategoria);
        const servicoRequest = await request(url, options);
        if (servicoRequest.response.ok) {
          setStatusCadastro("Categoria Cadastrada com Sucesso");
          setUpdate(!update);
          nomeForm.reset();
          setTimeout(() => {
            setStatusCadastro(null);
            navigate(-1)
          }, 1000);
        }
      }
    }
      cadastraCategoria();
    } else {
      setStatusCadastro("Por Favor, Preencha todos os Campos");
      setTimeout(() => {
        setStatusCadastro(null);
      }, 1000);
    }
  }

  return (
    <section>
      <section className={`${styles.cadastroContainer} container`}>
        <Title text="Cadastro de Categoria (Adm)" fontSize="3" />
        <form
          onSubmit={handleSubmit}
          ref={formRef}
          className={styles.cadastroUsuario}
        >
          <InputText
            label="Nome"
            type="text"
            placeholder="Restaurantes"
            id="nome"
            {...nomeForm}
          />
          <InputText
            label="Cor Categoria"
            type="color"
            id="cor_categoria"
            {...corForm}
          />

          <InputSelect
            label="Status"
            options={[{ nome: "Ativo" }, { nome: "Inativo" }]}
            id="status"
          />
          <Button handleSubmit={handleSubmit}>
            {loading ? "Cadastrando..." : "Cadastrar"}
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

export default CadastroCategoria;
