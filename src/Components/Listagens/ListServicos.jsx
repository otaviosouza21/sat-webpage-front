import React, { useEffect, useState } from "react";
import { Header } from "../Header/Header";
import Footer from "../Footer/Footer";
import { GET_ALL } from "../../Api/api";
import useFetch from "../../Hooks/useFetch";

const ListServicos = () => {
  const { request } = useFetch();
  const [servicos, setServicos] = useState(null);

  useEffect(() => {
    async function getServicos() {
      const { url, options } = GET_ALL("servico");
      const { response, json } = await request(url, options);
      if (!response.ok) {
        console.log("Ocorreu um erro ao buscar Servicos");
      }
      setServicos(json)
    }

    getServicos();
  }, []);




if(servicos)
  return (
    <section>
      <Header />
      <table class="table table-hover container">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome Do Negocio</th>
            <th>Possui Nome</th>
            <th>Descrição</th>
            <th>Status</th>
            <th>Tempo</th>
            <th>Usuario</th>
          </tr>
        </thead>
        <tbody>
        {servicos.map((servico, index) => {
            return (
              <tr key={index}>
                <td>{servico.id}</td>
                <td>{servico.nome_negocio}</td>
                <td>{servico.possui_nome_negocio ? 'Sim' : 'Não'}</td>
                <td>{servico.descricao_servico}</td>
                <td>{servico.status ? 'Ativo' : 'Inativo'}</td>
                <td>{servico.tempo_negocio}</td>
                <td>{servico.usuario_id}</td>
                <td>
                    <button>Deletar</button>
                </td>
                <td>
                    <button>Alterar</button>
                </td>
              </tr>
            );
          })} 
        </tbody>
      </table>
      <Footer />
    </section>
  );
};

export default ListServicos;
