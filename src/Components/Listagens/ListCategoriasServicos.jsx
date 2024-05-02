import React, { useContext, useEffect, useState } from "react";

import { GET_ALL } from "../../Api/api";
import CadastroCategoria from "../Cadastros/CadastroCategoria/CadastroCategoria";
import { GlobalContext } from "../../Hooks/GlobalContext";
import useFetch from "../../Hooks/useFetch";
import trash from "../../assets/icons/trash2.svg";
import pen from "../../assets/icons/pen.svg";
import styles from "./Listas.module.css";
import Confirm from "../Utils/Confirm/Confirm";
import Button from "../Button/Button";
import InputSearch from "../Forms/InputSearch/InputSearch";
import LoadingCenterComponent from "../Utils/LoadingCenterComponent/LoadingCenterComponent";

const ListCategoriasServicos = () => {
  const [categorias, setCategorias] = useState(null);
  const [idTodelete, setIdToDelete] = useState(null);
  const [visibleItens, setVisibleItens] = useState(null);
  const { request, loading } = useFetch();
  const { setUpdate, update, modal, setModal, setDataUpdate } =
    useContext(GlobalContext);

  useEffect(() => {
    async function getCategorias() {
      const { url, options } = GET_ALL("categoria_servico");
      const { response, json } = await request(url, options);
      if (!response.ok) {
        console.log("Ocorreu um erro ao buscar Servicos");
      }
      setCategorias(json);
      setVisibleItens(json);
    }

    getCategorias();
  }, [update]);

  const confirmDelete = (id) => {
    setIdToDelete(id);
    setModal("confirmDelete");
  };

  const atualizaDados = (currentData) => {
    setDataUpdate(currentData);
    navigate("/servico/cadastro/atualiza");
  };

  if (categorias)
    return (
      <section
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <InputSearch
          placeholder="Nome da Categoria"
          option="nome" // campo que será buscado o filtro
          setVisibleItens={setVisibleItens}
          visibleItens={visibleItens}
        />
    {/*     <Button modalParam="cadastroCategoria">+ Novo</Button> */}

        {modal === "cadastroCategoria" && <CadastroCategoria />}
        {loading ? (
          <div className={styles.container}>
            <LoadingCenterComponent />
          </div>
        ) : (
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Cor</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {visibleItens.map((categoria, index) => {
                return (
                  <tr key={index}>
                    <td>{categoria.id}</td>
                    <td>{categoria.nome}</td>
                    <td
                      style={{
                        backgroundColor: categoria.cor_categoria,
                        color: "#fff",
                      }}
                    >
                      {categoria.cor_categoria}
                    </td>
                    <td>{categoria.status ? "Ativo" : "Inativo"}</td>
                    <td className={styles.buttons}>
                      <img
                        src={trash}
                        onClick={() => confirmDelete(categoria.id)}
                      />
                    </td>
                    <td className={styles.buttons}>
                      <img src={pen} onClick={() => atualizaDados(categoria)} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        {modal === "confirmDelete" && (
          <Confirm
            mensagem={"Deseja mesmo deletar?"}
            id={idTodelete}
            setModal={setModal}
            setUpdate={setUpdate}
            update={update}
            table="categoria_servico"
          />
        )}
      </section>
    );
};

export default ListCategoriasServicos;
