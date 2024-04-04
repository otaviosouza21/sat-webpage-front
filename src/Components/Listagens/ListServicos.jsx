import React, { useEffect, useState } from "react";
import { Header } from "../Header/Header";
import Footer from "../Footer/Footer";
import { GET_ALL, GET_TO_ID } from "../../Api/api";
import useFetch from "../../Hooks/useFetch";
import Loading from "../Utils/Loading/Loading";
import FuncButton from "../Button/FuncButton";

const ListServicos = () => {
  const { request, loading } = useFetch();
  const [servicos, setServicos] = useState(null);
  const [usuarios, setUsuarios] = useState(null);

  useEffect(() => {
    async function getServicos() {
      const { url, options } = GET_ALL("servico");
      const { response, json } = await request(url, options);
      if (response.ok) {
        setServicos(json);
      } else {
        console.log("Ocorreu um erro ao buscar Servicos");
      }
    }

    getServicos();
  }, []);

  if (servicos)
    return (
      <section>
        {loading ? (
          <Loading />
        ) : (
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome Do Negocio</th>
                <th>Possui Nome</th>
                <th>Descrição</th>
                <th>Status</th>
                <th>Tempo</th>
                <th>Usuario</th>
                <th>Categoria</th>
              </tr>
            </thead>
            <tbody>
              {servicos.map((servico, index) => {
                return (
                  <tr key={index}>
                    <td>{servico.id}</td>
                    <td>{servico.nome_negocio}</td>
                    <td>{servico.possui_nome_negocio ? "Sim" : "Não"}</td>
                    <td>{servico.descricao_servico}</td>
                    <td>{servico.status ? "Ativo" : "Inativo"}</td>
                    <td>{servico.tempo_negocio}</td>
                    <td>{servico.usuario_id}</td>
                    <td>{servico.categoria_id}</td>
                    <td>
                      <FuncButton
                        table="servico"
                        id={servico.id}
                        method="DELETE"
                        style="btn btn-outline-danger"
                      >
                        Deletar
                      </FuncButton>
                    </td>
                    <td>
                      <FuncButton
                        table="servico"
                        id={servico.id}
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

export default ListServicos;
