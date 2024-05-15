import React, { useContext, useRef, useState } from "react";
import useForm from "../../../Hooks/useForm";
import styles from "../CadastroForm.module.css";
import InputSelect from "../../Forms/Input/InputSelect";
import Toast from "../../Toast/Toast";
import Footer from "../../Footer/Footer";
import { Header } from "../../Header/Header";
import Title from "../../Titles/Title";
import InputText from "../../Forms/Input/InputText";
import Button from "../../Button/Button";
import { POST_DATA } from "../../../Api/api";
import { GlobalContext } from "../../../Hooks/GlobalContext";
import useFetch from "../../../Hooks/useFetch";
import CloseButton from "../../CloseButton/CloseButton";

const CadastroCategoria = () => {
  const { data, request, loading, error } = useFetch();
  const [statusCadastro, setStatusCadastro] = useState(null);
  const { setUpdate, update,setModal } = useContext(GlobalContext);
  const modalContainerPost = useRef(null);
  const CloseContainerPost = useRef(null);

  const formRef = useRef();
  const nomeForm = useForm();
  const corForm = useForm();

  function closeModal(event) {
    event.preventDefault();
    if (
      event.target === modalContainerPost.current ||
      event.target === CloseContainerPost.current
    ) {
      setModal('');
      const overflow = document.querySelector("body");
      overflow.classList.remove("overFlow");
    }
  }


  function handleSubmit(e) {
    e.preventDefault();
    if (nomeForm.validate()) {
      const dataCategoria = {
        nome: nomeForm.value,
        cor_categoria: corForm.value,
        status: formRef.current["status"].value === "Ativo" ? true : false,
      };

      async function postCategoria() {
        const { url, options } = POST_DATA("categoria_servico", dataCategoria);
        const servicoRequest = await request(url, options);
        if (servicoRequest.response.ok) {
          setStatusCadastro("Categoria Cadastrada com Sucesso");
          setUpdate(!update);
          nomeForm.reset();
          setTimeout(() => {
            setStatusCadastro(null);
          }, 1000);
        }
      }
      postCategoria();
    } else {
      setStatusCadastro("Por Favor, Preencha todos os Campos");
      setTimeout(() => {
        setStatusCadastro(null);
      }, 1000);
    }
  }

  return (
    <section className={`${styles.containerModal}`} onClick={closeModal}  ref={modalContainerPost}>
      <form
        onSubmit={handleSubmit}
        ref={formRef}
        className={styles.containerForm}
      >
        <CloseButton closeModal={closeModal} CloseContainerPost={CloseContainerPost} />
        <Title text="Cadastro de Categoria (Adm)" fontSize="3" />
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
  );
};

export default CadastroCategoria;
