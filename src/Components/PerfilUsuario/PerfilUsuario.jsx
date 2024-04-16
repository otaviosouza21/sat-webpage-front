import React from 'react'
import MenuLateral from '../MenuLateral/MenuLateral'
import styles from './PerfilUsuario.module.css'
import { Route, Routes } from 'react-router-dom'
import ServicosUsuario from './ServicosUsuario/ServicosUsuario'
import MinhaConta from './MinhaConta/MinhaConta'
import Title from '../Titles/Title'
const PerfilUsuario = () => {
  return (
    <>
        <Title text="Meus servicos cadastrados" fontSize="3" className='container'/>
        <section className={`${styles.containerMeuPerfil} container`}>
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
    </>
  )
}

export default PerfilUsuario
