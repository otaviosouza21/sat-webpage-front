import React, { useContext, useEffect, useState } from "react";
import { Header } from "../Header/Header";
import Footer from "../Footer/Footer";
import { GET_ALL, GET_INNER,GET_TO_ID } from "../../Api/api";
import useFetch from "../../Hooks/useFetch";
import Loading from "../Utils/Loading/Loading";
import FuncButton from "../Button/FuncButton";
import { GlobalContext } from "../../Hooks/GlobalContext";
import Confirm from "../Utils/Confirm/Confirm";

const ListServicos = () => {
  const { request, loading } = useFetch();
  const {update} = useContext(GlobalContext)
  const [servicos, setServicos] = useState(null);
  const [categorias,setCategorias] = useState(null)
  const [usuarios, setUsuarios] = useState(null);

  useEffect(() => {
    async function getServicos() {
      const { url, options } = GET_INNER("servico","usuario");
      const { response, json } = await request(url, options);
      if (response.ok) {
        setServicos(json);
      } else {
        console.log("Ocorreu um erro ao buscar Servicos");
      }
    }

    getServicos();
  }, [update]);



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
                <th>Descrição</th>
                <th>Status</th>
                <th>Tempo</th>
                <th>Usuario</th>
                <th>Categoria</th>
              </tr>
            </thead>
            <tbody>
              {servicos.map((servico, index) => {
              <Confirm mensagem="Deseja Deletar?" id={servico.id}/>
  
                return (
                  <tr key={index}>
                    <td>{servico.id}</td>
                    <td>{servico.nome_negocio}</td>
                    <td>{servico.descricao_servico}</td>
                    <td>{servico.status ? "Ativo" : "Inativo"}</td>
                    <td>{servico.tempo_negocio}</td>
                    <td>{servico.Usuario.nome}</td>
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
                        updateDate={servico}
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
