import React, { useEffect, useRef, useState } from 'react'
import styles from './MenuLateral.module.css'
import { NavLink } from 'react-router-dom'

const MenuLateral = ({link1, link2, text1, text2, setBtnAtivo}) => {

  return (
    <div className={`${styles.menuLateral}`}>
            <NavLink to={link1} className={({ isActive }) => isActive ? styles.btnAtivo : styles.btn}>{text1}</NavLink>
            <NavLink to={link2} className={({ isActive }) => isActive ? styles.btnAtivo : styles.btn}>{text2}</NavLink>
    </div>
  )
}

export default MenuLateral
