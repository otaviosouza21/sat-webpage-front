import React from 'react'
import style from './NavLinks.module.css'
import { Link } from 'react-router-dom'

const NavLinks = ({links}) => {


  return (
    <ul className={style.navLinks}>
        {links.map((link,index)=>{
            return <li key={index}><Link to={link.patch}>{link.nome}</Link></li>
        })}
    </ul>
  )
}

export default NavLinks