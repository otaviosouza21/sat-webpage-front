import React, { useEffect, useState } from 'react'
import MenuLateral from '../MenuLateral/MenuLateral'
import styles from './PerfilUsuario.module.css'
import { Navigate, Route, Routes, redirect, redirectDocument, useNavigate } from 'react-router-dom'
import ServicosUsuario from './ServicosUsuario/ServicosUsuario.tsx'
import MinhaConta from './MinhaConta/MinhaConta'
import Title from '../Titles/Title'
import { useGlobalContext } from '../../Hooks/GlobalContext.tsx'
import { jwtDecode } from 'jwt-decode'
import { GET_AUTH_USER } from '../../Api/api'
import useFetch from '../../Hooks/useFetch'
import { defaultUserAuth } from '../../types/apiTypes.ts'



const PerfilUsuario = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  const { setUserAuth,logout } = useGlobalContext();
  const {request} =useFetch()
  useEffect(() => {
    document.title = 'SAT | Meu Perfil'
    const token = window.localStorage.getItem("token");
    async function fetchValidaToken() {
      if (token) {
        const { id, rule }:any = jwtDecode(token);
        const { url, options } = GET_AUTH_USER("usuarios", token, id);
        const { response, json } = await request(url, options);
        if (response?.ok) {
          setUserAuth({ token, usuario: json, status: true, rule });
          setCurrentUser(json);
        } else {
          setUserAuth(defaultUserAuth);
          setCurrentUser(null)
          logout();
          
        }
      }else{
        navigate('/')
        
      }
    }
    fetchValidaToken();
  }, []);

  return (
    <div className='container'>
        <Title text="Meu Perfil" fontSize="3" />
        <section className={`${styles.containerMeuPerfil} `}>
            <MenuLateral
                link1={'perfil'} 
                link2={'servicos'} 
                text1={'Meu Perfil'} 
                text2={'Meus Serviços'}
                />
            <Routes>
                <Route path='perfil' element={<MinhaConta/>}/>
                <Route path='servicos' element={<ServicosUsuario/>}/>
            </Routes>
        
        </section>
    </div>
  )
}

export default PerfilUsuario
