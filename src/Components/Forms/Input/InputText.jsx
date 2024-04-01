import React from 'react'
import styles from './Input.module.css'

const InputText = ({label,id,type}) => {
  return (
    <div className={styles.inputContainer}>
        <label htmlFor={id}>{label}</label>
        <input type={type} id={id} />

    </div>
  )
}

export default InputText