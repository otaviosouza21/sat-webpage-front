import React, { useContext, useEffect, useState } from "react";
import { GET_INNER, GET_INNER_ALL } from "../../Api/api";
import useFetch from "../../Hooks/useFetch";
import { GlobalContext } from "../../Hooks/GlobalContext";
import { convertData } from "../../plugins/convertData";
import Confirm from "../Utils/Confirm/Confirm";
import { useNavigate } from "react-router-dom";
import trash from "../../assets/icons/trash2.svg";
import pen from "../../assets/icons/pen.svg";
import styles from "./Listas.module.css";
import LoadingCenterComponent from "../Utils/LoadingCenterComponent/LoadingCenterComponent";
import Paginacao from "../Paginação/Paginacao";
import ExportToExcel from '../Listagens/ExportToExcel/ExportToExcel'
import InputSearch from '../Forms/InputSearch/InputSearch'

const ListServicos = () => {
  const [idTodelete, setIdToDelete] = useState(null);
  const [servicos, setServicos] = useState(null);
  const navigate = useNavigate();
  const { setUpdate, update, modal, setModal, setDataUpdate } =
    useContext(GlobalContext);
  const { request, loading } = useFetch();
  const [page, setPage] = useState(1)
  const [lastPage,setLastPage] = useState(0)

  useEffect(() => {
    async function getServicos() {
      const { url, options } = GET_INNER_ALL("servico", "usuario",page);
      const { response, json } = await request(url, options);
      if (response.ok) {
        setServicos(json.servicos.retorno);
        setLastPage(json.paginacao.total_Pages)
      } else {
        console.log("Ocorreu um erro ao buscar Servicos");
      }
    }
    getServicos();
  }, [update]);

  const confirmDelete = (id) => {
    setIdToDelete(id);
    setModal("confirmDelete");
  };

  const atualizaDados = (currentData) => {
    setDataUpdate(currentData);
    navigate("/servico/cadastro/atualiza");
  };

  async function paginacao(page){
    //setLoading(true)
    setPage(page)
    const { url, options } = GET_INNER_ALL("servico", "usuario",page);
    const { response, json } = await request(url, options);
    if(response.ok){
      setServicos(json.servicos.retorno);
      setLastPage(json.paginacao.total_Pages)
    }
    
  }


  if (servicos)
    return (
      <section className={styles.container}>
        <div className={styles.headerLista}>
          <InputSearch placeholder='Busque um serviço' />
          <ExportToExcel data={servicos} fileName="Serviços"  />
        </div>
        {loading ? (
          <LoadingCenterComponent />
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
                <th>Criação</th>
              </tr>
            </thead>
            <tbody>
              {servicos.map((servico, index) => {
                return (
                  <tr key={index}>
                    <td>{servico.id}</td>
                    <td>{servico.nome_negocio}</td>
                    <td>{servico.descricao_servico}</td>
                    <td>{servico.status ? "Ativo" : "Inativo"}</td>
                    <td>{servico.tempo_negocio}</td>
                    <td>{servico.Usuario.nome}</td>
                    <td>{servico.categoria_id}</td>
                    <td>{convertData(servico.createdAt)}</td>
                    <td className={styles.buttons}>
                      <img src={trash} onClick={() => confirmDelete(servico.id)}
                      />
                    </td>
                    <td className={styles.buttons}>
                      <img src={pen} onClick={() => atualizaDados(servico)} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        {!loading && <Paginacao paginacao={paginacao} page={page} lastPage={lastPage} />}
       
        {modal === "confirmDelete" && (
          <Confirm
            mensagem={"Deseja mesmo deletar?"}
            id={idTodelete}
            setModal={setModal}
            setUpdate={setUpdate}
            update={update}
            table="servico"
          />
        )}
      </section>
    );
};

export default ListServicos;
