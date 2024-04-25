import React, { useContext, useState } from "react";
import trash from "../../../assets/icons/trash2.svg";
import pen from "../../../assets/icons/pen.svg";
import view from "../../../assets/icons/view.svg";
import style from "./ServicoUsuario.module.css";
import ModalServico from "../../ModalServico/ModalServico";
import { GlobalContext } from "../../../Hooks/GlobalContext";
import { useNavigate } from "react-router-dom";
import Confirm from "../../Utils/Confirm/Confirm";

const ServicoUsuario = ({ servico }) => {
  const [idTodelete, setIdToDelete] = useState(null);
  const navigate = useNavigate();
  const { setDataUpdate, setModal,modal,setUpdate,update } = useContext(GlobalContext);

  const confirmDelete = (id) => {
    if(id){
      setIdToDelete(id);
      setModal("confirmDelete");
    }
  };

  const atualizarServico = () => {
    setDataUpdate(servico);
    navigate("/servico/cadastro/atualiza");
  };

  
  return (
    <>
      <li className={style.modalServico}>
        <div>
          <h3>Serviço</h3>
          <h2>{servico.nome_negocio}</h2>
        </div>
        <div>
          <h3>Situação</h3>
          <h2>
            {servico.status ? (
              <span>
                Publicado<span className={style.status_on}></span>
              </span>
            ) : (
              <span>
                Aguardando Aprovação
                <span className={style.status_aguardando}></span>
              </span>
            )}
          </h2>
        </div>
        <div className={style.options}>
          <img src={pen} onClick={atualizarServico} alt="" />
          <img src={trash} onClick={() => confirmDelete(servico.id)} alt="" />
        </div>
        <div>
          <h3>Descrição</h3>
          <h2>{servico.descricao_servico}</h2>
        </div>
      </li>
      {modal === 'confirmDelete' && idTodelete && <Confirm
        mensagem="Deseja deletar este serviço?"
        id={idTodelete}
        setModal={setModal}
        table='servico'
        setUpdate={setUpdate}
        update={update}
      />}
    </>
  );
};

export default ServicoUsuario;
