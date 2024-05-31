import React, { useContext, useEffect, useState } from "react";
import { GET_ALL_USERS } from "../../Api/api";
import useFetch from "../../Hooks/useFetch";
import Loading from "../Utils/Loading/Loading";
import { GlobalContext } from "../../Hooks/GlobalContext";
import { convertData } from "../../plugins/convertData";
import trash from "../../assets/icons/trash2.svg";
import pen from "../../assets/icons/pen.svg";
import styles from "./Listas.module.css";
import { useNavigate } from "react-router-dom";
import Confirm from "../Utils/Confirm/Confirm";
import LoadingCenterComponent from "../Utils/LoadingCenterComponent/LoadingCenterComponent";
import InputSearch from "../Forms/InputSearch/InputSearch";
import ExportToExcel from "./ExportToExcel/ExportToExcel";

const ListUsuarios = () => {
  const { request, loading, data } = useFetch();
  const [idTodelete, setIdToDelete] = useState(null);
  const [usuarios, setUsuarios] = useState(null);
  const navigate = useNavigate();
  const { setUpdate, update, modal, setModal, setDataUpdate } =
    useContext(GlobalContext);

  useEffect(() => {
    async function getUsuarios() {
      const token = window.localStorage.getItem("token");
      const { url, options } = GET_ALL_USERS("usuarios", token);
      const { response, json } = await request(url, options);
      if (!response.ok) {
        console.log("Ocorreu um erro ao buscar Servicos");
      }
      setUsuarios(json);
    }

    getUsuarios();
  }, [update]);

  const confirmDelete = (id) => {
    setIdToDelete(id);
    setModal("confirmDelete");
  };

  const atualizaDados = (currentData) => {
    setDataUpdate(currentData);
    navigate("/usuarios/cadastro/atualiza");
  };

  const extractToExcel = () => {};

  if (usuarios)
    return (
      <section className={styles.container}>
        <div className={styles.headerLista}>
          <InputSearch placeholder="Busque um usuario" />
          <ExportToExcel data={usuarios} fileName="Usuarios" />
        </div>
        {loading ? (
          <LoadingCenterComponent />
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
                <th>Criação</th>
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
                    <td>{usuario.status === "1" ? "Ativo" : "Inativo"}</td>
                    <td>{convertData(usuario.createdAt)}</td>
                    <td className={styles.buttons}>
                      <img
                        src={trash}
                        onClick={() => confirmDelete(usuario.id)}
                      />
                    </td>
                    <td className={styles.buttons}>
                      <img src={pen} onClick={() => atualizaDados(usuario)} />
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
            table="usuarios"
          />
        )}
      </section>
    );
};

export default ListUsuarios;
