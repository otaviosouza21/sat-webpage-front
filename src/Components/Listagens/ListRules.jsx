import React, { useEffect, useState } from "react";
import useFetch from "../../Hooks/useFetch";
import { GET_ALL } from "../../Api/api";
import styles from "./Listas.module.css";
import LoadingCenterComponent from "../Utils/LoadingCenterComponent/LoadingCenterComponent";


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
      <section className={styles.container}>
        {loading ? (
          <LoadingCenterComponent />
        ) : (
          <table className={`${styles.lista} table table-striped table-hover`}>
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
