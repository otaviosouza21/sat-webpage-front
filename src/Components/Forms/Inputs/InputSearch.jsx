import React from 'react'
import searchIcon from '../../../assets/icons/search.svg'
import styles from './InputSearch.module.css'

const InputSearch = ({id,placeholder}) => {
  return (
    <div className={styles.inputSearch}>
        <img src={searchIcon} alt="" />
        <input placeholder={placeholder} type="text" name={id} id={id} />
    </div>
  )
}

export default InputSearch