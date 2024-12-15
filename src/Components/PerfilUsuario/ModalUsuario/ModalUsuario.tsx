import React, { useContext, useState } from "react";
import styles from "./ModalUsuario.module.css";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext, useGlobalContext } from "../../../Hooks/GlobalContext";


const ModalUsuario = () => {
  const {userAuth} = useGlobalContext()
  const navigate = useNavigate()

  function logout() {
    window.localStorage.removeItem('token')
    window.location.reload();
    navigate('/')
  }


  return (
    <nav className={`${styles.containerModal} animation-up-button`}>
      <ul className={styles.options}>
        <li><Link to='meu_perfil/perfil'>Minha Conta</Link></li>
        <li><Link to='meu_perfil/servicos'> Meus Serviços</Link></li>
        {userAuth.rule === 3 && <li onClick={()=>navigate('/adm')}>Painel de Controle</li>}
        <li onClick={logout}>Sair</li>
      </ul>
    </nav>
  );
};

export default ModalUsuario;
