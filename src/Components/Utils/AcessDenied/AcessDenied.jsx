import React from 'react'
import styles from './AcessDenied.module.css'
import Title from '../../Titles/Title'

const AcessDenied = () => {
  return (
    <section className={styles.acessDenied}>
        <Title text="Acesso Negado :(" fontSize='3'/>
    </section>
  )
}

export default AcessDenied