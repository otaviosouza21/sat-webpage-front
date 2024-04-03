import React, { useState } from 'react';
import Footer from '../Footer/Footer';
import { Header } from '../Header/Header';
import ListServicos from '../Listagens/ListServicos';
import ListUsuarios from '../Listagens/ListUsuarios';
import ListCategoriasServicos from '../Listagens/ListCategoriasServicos';
import ListRules from '../Listagens/ListRules';
import styles from '../Adm/Adm.module.css';

const Adm = () => {
  const [activeView, setActiveView] = useState('servicos');

  const handleView = (view) => {
    setActiveView(view);
  };

  return (
    <>
      <Header />
      <main className={`${styles.containerAdm} container`}>
        <ul className={styles.nav}>
          <li style={activeView === 'servicos' ? {background: '#C9C9C9'} : null} onClick={() => handleView('servicos')}>Serviços</li>
          <li style={activeView === 'usuarios' ? {background: '#C9C9C9'} : null} onClick={() => handleView('usuarios')}>Usuários</li>
          <li style={activeView === 'categorias' ? {background: '#C9C9C9'} : null} onClick={() => handleView('categorias')}>Categorias</li>
          <li style={activeView === 'rules' ? {background: '#C9C9C9'} : null} onClick={() => handleView('rules')}>Rules</li>
        </ul>
        <div className={styles.containerListas}>
          {activeView === 'servicos' && <ListServicos />}
          {activeView === 'usuarios' && <ListUsuarios />}
          {activeView === 'categorias' && <ListCategoriasServicos />}
          {activeView === 'rules' && <ListRules />}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Adm;
