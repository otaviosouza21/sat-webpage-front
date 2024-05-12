import React from 'react'
import styles from './Paginacao.module.css'

const Paginacao = ({paginacao,page,lastPage}) => {
  return (
    <div className={styles.paginacao}>
      {page !==1 ? <button type='button' onClick={()=> paginacao(1)}>primeira</button>: <button type='button' disabled>primeira</button>}
      {page !==1 && page !==2? <button type='button' onClick={()=> paginacao(page -2)}>{page -2}</button>:''}
      {page !==1 ? <button type='button' onClick={()=> paginacao(page -1)}>{page -1}</button>:''}
      <button type='button' disabled>{page}</button>
      {page + 1 <= lastPage ? <button type='button' onClick={()=> paginacao(page + 1)}>{page +1}</button>:''}
      {page + 2 <= lastPage ? <button type='button' onClick={()=> paginacao(page + 2)}>{page +2}</button>:''}
      {page !== lastPage ?<button type='button' onClick={()=> paginacao(lastPage)}>ultima</button>: <button type='button' disabled>ultima</button>}
</div>
  )
}

export default Paginacao