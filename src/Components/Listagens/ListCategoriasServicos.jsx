import React, { useContext, useEffect, useState } from "react";

import { GET_ALL } from "../../Api/api";
import Loading from "../Utils/Loading/Loading";
import FuncButton from "../Button/FuncButton";
import CadastroCategoria from "../Cadastros/CadastroCategoria/CadastroCategoria";
import { GlobalContext } from "../../Hooks/GlobalContext";
import useFetch from "../../Hooks/useFetch";

const ListCategoriasServicos = () => {
  const { request, loading } = useFetch();
  const [categorias, setCategorias] = useState(null);
  const { update } = useContext(GlobalContext);
  
 

  useEffect(() => {
    async function getCategorias() {
      const { url, options } = GET_ALL("categoria_servico");
      const { response, json } = await request(url, options);
      if (!response.ok) {
        console.log("Ocorreu um erro ao buscar Servicos");
      }
      setCategorias(json);
    }

    getCategorias();
  }, [update]);

  if (categorias)
    return (
      <section>
        <CadastroCategoria />
        {loading ? (
          <Loading />
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
              {categorias.map((categoria, index) => {
                return (
                  <tr key={index}>
                    <td>{categoria.id}</td>
                    <td>{categoria.nome}</td>
                    <td style={{backgroundColor: categoria.cor_categoria, color:'#fff'}}>{categoria.cor_categoria}</td>
                    <td>{categoria.status ? "Ativo" : "Inativo"}</td>
                    <td>
                      <FuncButton
                        table="categoria_servico"
                        id={categoria.id}
                        method="DELETE"
                        style="btn btn-outline-danger"
                      >
                        Deletar
                      </FuncButton>
                    </td>
                    <td>
                      <FuncButton
                        table="categoria_servico"
                        id={categoria.id}
                        method="PUT"
                        style="btn btn-outline-dark"
                      >
                        Alterar
                      </FuncButton>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </section>
    );
};

export default ListCategoriasServicos;
