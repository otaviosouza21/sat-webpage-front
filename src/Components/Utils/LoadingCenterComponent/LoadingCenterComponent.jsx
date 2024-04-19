import React from 'react'
import styles from './LoadingCenterComponent.module.css'

const LoadingCenterComponent = () => {
  return (
    <section className={styles.loaderContainer}>
        <span className={styles.loader}></span>
    </section>
  )
}

export default LoadingCenterComponent