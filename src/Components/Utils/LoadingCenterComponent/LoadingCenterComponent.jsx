import React from 'react'
import styles from './LoadingCenterComponent.module.css'

const LoadingCenterComponent = () => {
  return (
    <div className={styles.loaderContainer}>
        <span className={styles.loader}></span>
    </div>
  )
}

export default LoadingCenterComponent