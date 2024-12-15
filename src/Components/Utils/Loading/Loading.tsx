import React from 'react'
import styles from './Loading.module.css'

const Loading = () => {
  return (
    <div className={styles.loaderContainer}>
        <span className={styles.loader}></span>
    </div>
  )
}

export default Loading