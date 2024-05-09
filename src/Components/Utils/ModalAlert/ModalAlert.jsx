import React, { useContext } from "react";
import styles from "../../ModalLogin/ModalLogin.module.css";
import Title from "../../Titles/Title";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../../Hooks/GlobalContext";

const ModalAlert = ({ title, mensagem }) => {
  const navigate = useNavigate();
  const { setModal } = useContext(GlobalContext);
  return (
    <div className={styles.modalContainer}>
      <div className={`${styles.modalLogin} animation-opacity`}>
        <Title text={title} fontSize="2" />
        <p>{mensagem}</p>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={() => navigate("/")}
            className="btn btn-outline-success "
          >
            Sair
          </button>
          {mensagem === "Cadastrar serviço?" && (
            <button
              onClick={() => navigate("/servico/cadastro")}
              className="btn btn-success"
            >
              Cadastrar Serviço
            </button>
          )}
          {mensagem === "Senha Alterada com Sucesso" && (
            <button
              onClick={() => {
                navigate('/')
                setTimeout(() => {
                  setModal("modalLogin");
                },500);
              }}
              className="btn btn-success"
            >
             Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalAlert;
