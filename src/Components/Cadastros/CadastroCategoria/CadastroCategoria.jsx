import React, { useContext, useEffect, useRef} from "react";
import useForm from "../../../Hooks/useForm";
import InputSelect from "../../Forms/Input/InputSelect";
import Title from "../../Titles/Title";
import InputText from "../../Forms/Input/InputText";
import Button from "../../Button/Button";
import { POST_DATA } from "../../../Api/api";
import { GlobalContext } from "../../../Hooks/GlobalContext";
import useFetch from "../../../Hooks/useFetch";
import styles from "../../Atualização/CadastroForm.module.css";
import { useNavigate } from "react-router-dom";
import useToast from "../../../Hooks/useToast";
import useTokenValidate from "../../../Hooks/useTokenValidate";


const CadastroCategoria = () => {
  const { request, loading, error } = useFetch();
  const { setUpdate, update } = useContext(GlobalContext);
  const navigate = useNavigate()
  const activeToast = useToast()

  const formRef = useRef();
  const nomeForm = useForm();
  const corForm = useForm();

  const { fetchValidaToken, userAuth } = useTokenValidate();
  useEffect(() => {
    fetchValidaToken();
  }, [userAuth.rule]);
  
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
        const categoriaRequest = await request(url, options);
        if (categoriaRequest.response.ok) {
          activeToast("Categoria Cadastrada com Sucesso", 'success');
          setUpdate(!update);
          nomeForm.reset();
          setTimeout(() => {
            navigate(-1)
          }, 1000);
        } else{
          activeToast(error, 'error');
        }
      }
    }
      cadastraCategoria();
    } else {
      activeToast("Por Favor, Preencha todos os campos obrigatórios", 'warning');
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
        </form>
      </section>
    </section>
  );
};

export default CadastroCategoria;
