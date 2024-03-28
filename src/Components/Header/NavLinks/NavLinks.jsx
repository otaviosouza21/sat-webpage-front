import React from 'react'
import style from './NavLinks.module.css'

const NavLinks = () => {
    const navLinks = [
        {
            nome: 'Home',
            patch: '/'
        },
        {
            nome: 'Serviços',
            patch: '/servicos'
        },
        {
            nome: 'Sobre',
            patch: '/sobre'
        },
    ] 



  return (
    <ul className={style.navLinks}>
        {navLinks.map((link,index)=>{
            return <li key={index}>{link.nome}</li>
        })}
    </ul>
  )
}

export default NavLinks