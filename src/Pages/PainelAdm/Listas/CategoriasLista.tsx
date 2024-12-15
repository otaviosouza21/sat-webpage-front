import React, { useContext, useEffect, useState } from "react";
import useFetch from "../../../Hooks/useFetch";
import { useGlobalContext } from "../../../Hooks/GlobalContext";
import { convertData } from "../../../plugins/convertData";
import { GET_ALL, GET_INNER_ALL } from "../../../Api/api";
import { useNavigate } from "react-router-dom";
import LoadingCenterComponent from "../../../Components/Utils/LoadingCenterComponent/LoadingCenterComponent";
import styleLista from "../Listas/Listas.module.css";
import HeadSearch from "../HeadSearch/HeadSearch";
import ExportToExcel from "../ExportToExcel/ExportToExcel";
import Lista from "./Lista";
import Confirm from "../../../Components/Utils/Confirm/Confirm";
import buttonStyle from '../../../Components/Button/Button.module.css'

interface CategoriasDataProps {
  id: number;
  nome: string;
  cor_categoria: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

interface CategoriasNormalizadas {
  ID: number;
  Nome: string;
  ["Cor HEX"]: string;
  Criacao: string;
}

const CategoriasLista = () => {
  const [categorias, setCategorias] = useState<CategoriasNormalizadas[] | null>(
    null
  );
  const [idTodelete, setIdToDelete] = useState<number | null>(null);
  const navigate = useNavigate();
  const { request, loading, data } = useFetch();
  const {
    setUpdate,
    update,
    modal,
    setModal,
    setDataUpdate,
    listaFiltrada,
    setListaFiltrada,
  } =useGlobalContext();

  function normalizaCategorias(
    categorias: CategoriasDataProps[]
  ): CategoriasNormalizadas[] {
    const categoriasNormalizadas = categorias?.map((categoria) => {
      return {
        ID: categoria.id,
        Nome: categoria.nome,
        ["Cor HEX"]: categoria.cor_categoria,
        Criacao: convertData(categoria.createdAt),
      };
    });

    return categoriasNormalizadas;
  }

  useEffect(() => {
    async function getCategorias() {
      const token = window.localStorage.getItem("token");
      if (token) {
        const { url, options } = GET_ALL("categoria_servico");
        const { response, json } = await request(url, options);
        if (response && !response.ok)
          console.log("Ocorreu um erro ao buscar categorias");
        else {
          const categoriasNormalizadas = normalizaCategorias(json);
          setCategorias(categoriasNormalizadas);
        }
      }
    }

    getCategorias()
  }, [update, request]);

  const confirmDelete = (id: number) => {
    setIdToDelete(id);
    setModal("ConfirmDelete");
  };

  const atualizaDados = (id: number) => {
    const categoriaAtualizada = data.find(
      (user: CategoriasDataProps) => user.id === id
    );
    if (categoriaAtualizada) {
      setDataUpdate(categoriaAtualizada);
      navigate('/categoria/cadastro/atualiza')
    }
  };

  if (loading) return <LoadingCenterComponent />;
  if (categorias && data) {
    return (
      <div>
        <div className={styleLista.cabecalho}>
          <HeadSearch data={categorias} setListaFiltrada={setListaFiltrada} />
          <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
        <p>Total de Registros: {categorias.length}</p>
          <ExportToExcel<CategoriasNormalizadas>
            data={data}
            fileName="Servicos"
          />
          <button onClick={()=>navigate('/categoria/cadastro')} style={{height:"100%"}} className={buttonStyle.button}>
            + Incluir
          </button>
          </div>
        </div>
        <Lista<CategoriasNormalizadas>
          tbody={listaFiltrada ? listaFiltrada : categorias}
          confirmDelete={confirmDelete}
          atualizaDados={atualizaDados}
        />
        {modal === 'ConfirmDelete' && (
          <Confirm
            mensagem={"Deseja mesmo deletar?"}
            id={idTodelete}
            setModal={setModal}
            setUpdate={setUpdate}
            update={update}
            table="categoria_servico"
          />
        )}
      </div>
    );
  }
};

export default CategoriasLista;
