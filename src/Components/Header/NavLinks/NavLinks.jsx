import React from 'react'
import style from './NavLinks.module.css'
import { Link } from 'react-router-dom'

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
            return <li key={index}><Link to={link.patch}>{link.nome}</Link></li>
        })}
    </ul>
  )
}

export default NavLinks