import React, { useRef } from 'react'
import styles from './ModalLogin.module.css'
import InputText from '../Forms/Input/InputText'
import Button from '../Button/Button'
import Title from '../Titles/Title'

const ModalLogin = ({modal,setModal}) => {
    const modalContainerPost = useRef(null);
    const CloseContainerPost = useRef(null);

    function closeModal(event) {
        console.log('teste');
        event.preventDefault();
        if (
          event.target === modalContainerPost.current ||
          event.target === CloseContainerPost.current
        ) {
          setModal(!modal);
        }
      }

  return (
    <div onClick={closeModal} ref={modalContainerPost} className={styles.modalContainer}>
        <form className={styles.modalLogin}>
        <button
          ref={CloseContainerPost}
          onClick={closeModal} 
          className={styles.close}
        >
          X
        </button>
            <Title text='Faça Login' fontSize='3'/>
            <InputText label='Email' id='email' type='email'/>
            <InputText label='Senha' id='password' type='password'/>
            <div className={styles.options}>
                <span>Esqueci a Senha</span>
                <span>Me Cadastrar</span>
            </div>
            <Button>Entrar</Button>
        </form>
    </div>
  )
}

export default ModalLogin