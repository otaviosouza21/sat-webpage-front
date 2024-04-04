import React, { useContext, useEffect, useState } from "react";
import { GET_ALL } from "../../Api/api";
import useFetch from "../../Hooks/useFetch";
import Loading from "../Utils/Loading/Loading";
import FuncButton from "../Button/FuncButton";
import { GlobalContext } from "../../Hooks/GlobalContext";

const ListUsuarios = () => {
  const { request, loading, data} =  useFetch();
  const [usuarios, setUsuarios] = useState(null);
  const {update} = useContext(GlobalContext)

  useEffect(() => {
    async function getUsuarios() {
      const { url, options } = GET_ALL("usuarios");
      const { response, json } = await request(url, options);
      if (!response.ok) {
        console.log("Ocorreu um erro ao buscar Servicos");
      }
      setUsuarios(json);
    }

    getUsuarios();
  }, [update]);

  if (usuarios)
    return (
      <section>
        {loading ? (
          <Loading />
        ) : (
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome Completo</th>
                <th>Email</th>
                <th>Contato Pessoal</th>
                <th>Contato Negocio</th>
                <th>Socio Sat</th>
                <th>Residente</th>
                <th>rule</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario, index) => {
                return (
                  <tr key={index}>
                    <td>{usuario.id}</td>
                    <td>{usuario.nome}</td>
                    <td>{usuario.email}</td>
                    <td>{usuario.contato_pessoal_01}</td>
                    <td>{usuario.contato_negocio_01}</td>
                    <td>{usuario.socio_sat ? "Sim" : "Não"}</td>
                    <td>{usuario.tempo_reside}</td>
                    <td>{usuario.rule_id}</td>
                    <td>{usuario.status ? "Ativo" : "Inativo"}</td>
                    <td>
                      <FuncButton
                        table="usuarios"
                        id={usuario.id}
                        method="DELETE"
                        style="btn btn-outline-danger"
                      >
                        Deletar
                      </FuncButton>
                    </td>
                    <td>
                      <FuncButton
                        table="usuarios"
                        id={usuario.id}
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

export default ListUsuarios;
