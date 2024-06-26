import React, { useContext, useEffect, useState } from "react";
import { GET_ALL, GET_ALL_USERS, GET_INNER_ALL } from "../../../Api/api";
import { GlobalContext } from "../../../Hooks/GlobalContext";
import useFetch from "../../../Hooks/useFetch";
import Lista from "./Lista";
import {convertData} from '../../../plugins/convertData.ts'
import HeadSearch from "../HeadSearch/HeadSearch.tsx";
import Confirm from '../../../Components/Utils/Confirm/Confirm.tsx'
import Paginacao from '../../../Components/Paginação/Paginacao.tsx'
import ExportToExcel from '../ExportToExcel/ExportToExcel.tsx'
import { useNavigate } from "react-router-dom";
import styleLista from '../Listas/Listas.module.css'
import { UsuariosDataProps } from "./UsuariosLista.tsx";
import LoadingCenterComponent from "../../../Components/Utils/LoadingCenterComponent/LoadingCenterComponent.tsx";

export interface ServicosDataProps {
id: number;
possui_nome_negocio: string;
nome_negocio: string;
tempo_negocio: number;
descricao_servico: string;
status: boolean;
createdAt: string;
updatedAt: string;
categoria_id: number,
usuario_id: number,
Usuario: UsuariosDataProps
}

export interface ServicosNormalizados {
  ID: number;
  Nome: string;
  Tempo: number;
  Status: string;
  Descrição: string;
  Criação: string;
  Usuario:string;
}

const ServicosLista = () => {
  const [servicos, setServicos] = useState<ServicosNormalizados[]  | null>(null);
  const [idTodelete, setIdToDelete] = useState<number | null>(null);
  const [page, setPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(0);
  const { request, loading, data } = useFetch();
  const navigate = useNavigate()
  const globalContext = useContext(GlobalContext);
  if (!globalContext) {
    throw new Error("GlobalContext must be used within a GlobalProvider");
  }
  const { setUpdate, update, modal, setModal, setDataUpdate,listaFiltrada,setListaFiltrada } = globalContext;


function normalizaServicos(servicos: ServicosDataProps[]) : ServicosNormalizados[]{
    const servicosNormalizados = servicos?.map(servico=>{
      return {
        ID: servico.id,
        Nome: servico.nome_negocio,
        Tempo: servico.tempo_negocio,
        Status: servico.status ? 'Ativo' : 'Inativo',
        Descrição: servico.descricao_servico,
        Usuario: servico.Usuario.nome,
        Criação: convertData(servico.createdAt)
      }
    })

    return servicosNormalizados
  }

 //fetch inicial, puxa todos os registros da pagina = page
  useEffect(() => {
    async function getServicos() {
      const token = window.localStorage.getItem("token");
      if(token){
        const { url, options } = GET_INNER_ALL("servico","usuario",page);
        const { response, json } = await request(url, options);
        if (response && !response.ok) console.log("Ocorreu um erro ao buscar servicos");
        else {
         const {retorno} = json.servicos   
          const servicosNormalizados = normalizaServicos(retorno)
          setServicos(servicosNormalizados)
          setLastPage(json.paginacao.total_Pages);
        }
      }
    }
    getServicos();
  }, [update,request]);

  const confirmDelete = (id: number) => {
    setIdToDelete(id);
    setModal("confirmDelete");
  };

  const atualizaDados = (id: number) => {
    const {retorno} = data.servicos
    const servicoAlterado = retorno.find((servico: ServicosDataProps) => servico.id === id);
    if (servicoAlterado) {
      setDataUpdate(servicoAlterado);
      navigate("/servico/cadastro/atualiza");
    }
  };
  
//puxa dados por paginação = 10 itens por pagina
  async function paginacao(page:number) {
    //setLoading(true)
    setPage(page);
    const { url, options } = GET_INNER_ALL("servico", "usuario", page);
    const { response, json } = await request(url, options);
    if (response?.ok) {
      const {retorno} = json.servicos
      const servicosNormalizados = normalizaServicos(retorno)
      setServicos(servicosNormalizados);
      setLastPage(json.paginacao.total_Pages);
    }
  }


//Fetch para puxar todos os dados sem paginação, loop while
  async function fetchAllServicos() : Promise<ServicosNormalizados[]> {
    const token = window.localStorage.getItem("token")
    if(token){
      let allServicos: ServicosDataProps[] = []
      let currentPage = 1;
      let pages = 1

      while(currentPage <= pages){
        const {url,options} = GET_INNER_ALL("servico","usuario",currentPage)
        const {response,json} = await request(url,options)
        if(response && response.ok){
          const {retorno} = json.servicos
          const {total_Pages} = json.paginacao
          pages = total_Pages;
          allServicos = [...allServicos,...retorno]
          currentPage++
        } else {
          console.log("Erro ao buscar todos os serviços");
          break
        }
      }
      return normalizaServicos(allServicos)
    }
    return []
  }
 
  
  if(loading) return <LoadingCenterComponent />
  return servicos && data &&  
  <div>
    <div className={styleLista.cabecalho}>
      <HeadSearch data={servicos} setListaFiltrada={setListaFiltrada} />
      <ExportToExcel<ServicosNormalizados> data={data} fileName="Servicos" fetchAllData={fetchAllServicos} />
    </div>
    <Lista<ServicosNormalizados> tbody={listaFiltrada ? listaFiltrada : servicos} confirmDelete={confirmDelete} atualizaDados={atualizaDados}/>
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
  </div>
};

export default ServicosLista;
