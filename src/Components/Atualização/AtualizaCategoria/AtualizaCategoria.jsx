import React, { useContext, useEffect, useRef, useState } from "react";
import useForm from "../../../Hooks/useForm";
import InputSelect from "../../Forms/Input/InputSelect";
import Toast from "../../Toast/Toast";
import Title from "../../Titles/Title";
import InputText from "../../Forms/Input/InputText";
import Button from "../../Button/Button";
import { UPDATE_DATA } from "../../../Api/api";
import { GlobalContext } from "../../../Hooks/GlobalContext";
import useFetch from "../../../Hooks/useFetch";
import styles from "../CadastroForm.module.css";
import { useNavigate } from "react-router-dom";

const AtualizaCategoria = () => {
  const { data, request, loading, error } = useFetch();
  const [statusCadastro, setStatusCadastro] = useState(null);
  const { setUpdate, update,dataUpdate } = useContext(GlobalContext);
  const navigate = useNavigate()

  const formRef = useRef();
  const nomeForm = useForm();
  const corForm = useForm();
  
  useEffect(()=>{
   if(dataUpdate){
    console.log(dataUpdate);
     nomeForm.setValue(dataUpdate.nome)
     corForm.setValue(dataUpdate.cor_categoria)
     formRef.current["status"].value
   }
  },[])

  function handleSubmit(e) {
    e.preventDefault();
    if (nomeForm.validate()) {
      const dataCategoria = {
        nome: nomeForm.value,
        cor_categoria: corForm.value,
        status: formRef.current["status"].value === "Ativo" ? true : false,
      };

      async function atualizaCategoria() {
        const token = window.localStorage.getItem("token")
        if(token && dataUpdate){
        const { url, options } = UPDATE_DATA("categoria_servico", dataCategoria,dataUpdate.id,token);
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
      atualizaCategoria();
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
        <Title text="Atualização de Categoria (Adm)" fontSize="3" />
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
            {loading ? "Atualizando..." : "Atualizar"}
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

export default AtualizaCategoria;
