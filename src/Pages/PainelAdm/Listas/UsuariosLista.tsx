import React, { useContext, useEffect, useState } from "react";
import { GET_ALL_USERS } from "../../../Api/api";
import { GlobalContext } from "../../../Hooks/GlobalContext";
import useFetch from "../../../Hooks/useFetch";
import Lista from "./Lista";
import { convertData } from "../../../plugins/convertData.ts";
import HeadSearch from "../HeadSearch/HeadSearch.tsx";
import Confirm from "../../../Components/Utils/Confirm/Confirm.tsx";
import ExportToExcel from "../ExportToExcel/ExportToExcel.tsx";
import { useNavigate } from "react-router-dom";
import styleLista from "../Listas/Listas.module.css";
import LoadingCenterComponent from "../../../Components/Utils/LoadingCenterComponent/LoadingCenterComponent.tsx";

export interface UsuariosDataProps {
  id: number;
  nome: string;
  email: string;
  contato_pessoal_01: string;
  contato_negocio_01: string;
  socio_sat: boolean;
  tempo_reside: number;
  rule_id: number;
  status: string;
  createdAt: string;
}

export interface UsuariosNormalizados {
  ID: number;
  Nome: string;
  Email: string;
  ["Contato Negocio"]: string;
  ["Contato Pessoal"]: string;
  Socio: string;
  Status: string;
  Criação: string;
  Nivel: string;
}

const UsuariosLista = () => {
  const [usuarios, setUsuarios] = useState<UsuariosNormalizados[] | null>(null);
  const [idTodelete, setIdToDelete] = useState<number | null>(null);
  const { request, loading, data } = useFetch();
  const navigate = useNavigate();
  const globalContext = useContext(GlobalContext);
  if (!globalContext) {
    throw new Error("GlobalContext must be used within a GlobalProvider");
  }
  const {
    setUpdate,
    update,
    modal,
    setModal,
    setDataUpdate,
    listaFiltrada,
    setListaFiltrada,
  } = globalContext;

  function normalizaUsuarios(
    usuarios: UsuariosDataProps[]
  ): UsuariosNormalizados[] {
    const usuariosNormalizados = usuarios?.map((usuario) => {
      return {
        ID: usuario.id,
        Nome: usuario.nome,
        Email: usuario.email,
        ["Contato Negocio"]: usuario.contato_negocio_01,
        ["Contato Pessoal"]: usuario.contato_pessoal_01,
        Socio: usuario.socio_sat ? "Sim" : "Não",
        Status: usuario.status === "1" ? "Ativo" : "Inativo",
        Criação: convertData(usuario.createdAt),
        Nivel: usuario.rule_id === 1 ? "Comum" : "Administrador",
      };
    });

    return usuariosNormalizados;
  }

  useEffect(() => {
    async function getUsuarios() {
      const token = window.localStorage.getItem("token");
      if (token) {
        const { url, options } = GET_ALL_USERS("usuarios", token);
        const { response, json } = await request(url, options);
        if (response && !response.ok)
          console.log("Ocorreu um erro ao buscar usuarios");
        else {
          const usuariosNormalizados = normalizaUsuarios(json);
          setUsuarios(usuariosNormalizados);
        }
      }
    }
    getUsuarios();
  }, [update, request]);

  const confirmDelete = (id: number) => {
    setIdToDelete(id);
    setModal("confirmDelete");
  };

  const atualizaDados = (id: number) => {
    const usuarioAlterado = data.find(
      (user: UsuariosDataProps) => user.id === id
    );
    if (usuarioAlterado) {
      setDataUpdate(usuarioAlterado);
      navigate("/usuarios/cadastro/atualiza");
    }
  };

  if (loading) return <LoadingCenterComponent />;
  return (
    usuarios &&
    data && (
      <div>
        <div className={styleLista.cabecalho}>
          <HeadSearch data={usuarios} setListaFiltrada={setListaFiltrada} />
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <p>Total de Registros: {usuarios.length}</p>
            <ExportToExcel<UsuariosNormalizados>
              data={usuarios}
              fileName="Usuarios"
            />
          </div>
        </div>
        <Lista<UsuariosNormalizados>
          tbody={listaFiltrada ? listaFiltrada : usuarios}
          confirmDelete={confirmDelete}
          atualizaDados={atualizaDados}
        />
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
      </div>
    )
  );
};

export default UsuariosLista;
