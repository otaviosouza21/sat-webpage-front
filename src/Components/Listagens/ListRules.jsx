import React, { useEffect, useState } from "react";
import useFetch from "../../Hooks/useFetch";
import { GET_ALL } from "../../Api/api";
import Loading from "../Utils/Loading/Loading";
import FuncButton from "../Button/FuncButton";

const ListRules = () => {
  const { request, loading } = useFetch();
  const [rules, setRules] = useState(null);

  useEffect(() => {
    async function getRules() {
      const { url, options } = GET_ALL("rules");
      const { response, json } = await request(url, options);
      if (!response.ok) {
        console.log("Ocorreu um erro ao buscar Servicos");
      }
      setRules(json);
    }

    getRules();
  }, []);

  if (rules)
    return (
      <section>
        {loading ? (
          <Loading />
        ) : (
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {rules.map((rule, index) => {
                return (
                  <tr key={index}>
                    <td>{rule.id}</td>
                    <td>{rule.nome}</td>
                    <td>{rule.status ? "Ativo" : "Inativo"}</td>
                    <td>
                      <FuncButton
                        table="rules"
                        id={rule.id}
                        method="DELETE"
                        style="btn btn-outline-danger"
                      >
                        Deletar
                      </FuncButton>
                    </td>
                    <td>
                      <FuncButton
                        table="rules"
                        id={rule.id}
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

export default ListRules;
