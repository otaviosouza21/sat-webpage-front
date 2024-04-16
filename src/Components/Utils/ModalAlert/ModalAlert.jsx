import React from 'react'
import styles from '../../ModalLogin/ModalLogin.module.css'
import Title from '../../Titles/Title'
import { useNavigate } from 'react-router-dom'

const ModalAlert = ({title,mensagem}) => {
const navigate = useNavigate()
  return (
    <div className={styles.modalContainer}>
        <div className={`${styles.modalLogin} animation-opacity`}>
           <Title text={title} fontSize='2'/>
            <p>{mensagem}</p>
            <button onClick={()=>navigate('/')} className='btn btn-success'>Continuar</button>
        </div>


    </div>
  )
}

export default ModalAlert