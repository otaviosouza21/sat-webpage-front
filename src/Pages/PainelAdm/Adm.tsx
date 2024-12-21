import { useEffect, useState } from "react";
import CategoriasLista from "./Listas/CategoriasLista";
import ListRules from "./Listas/ListRules";
import styles from "./Adm.module.css";

import HeadNav from "./HeadNav/HeadNav";
import Usuarios from "./Listas/UsuariosLista";
import ServicosLista from "./Listas/ServicosLista";
import QuestionariosLista from "./Questionarios/QuestionariosLista/QuestionariosLista.tsx";
import useTokenValidate from "../../Hooks/useTokenValidate";

const Adm = () => {
  const [activeView, setActiveView] = useState("servicos");
  const { fetchValidaToken, userAuth } = useTokenValidate();

  useEffect(() => { // valida token com o hook no carregamento da pagina
    document.title = "SAT | Painel Adm";
    fetchValidaToken();
  }, [userAuth.rule]);

  const handleView = (view: string) => {
    setActiveView(view);
  };

  return (
    <>
      {userAuth.status && userAuth.rule === 3 && (
        <main className={`${styles.containerAdm}`}>
          <HeadNav activeView={activeView} handleView={handleView} />
          <div className={styles.containerListas}>
            {activeView === "servicos" && <ServicosLista />}
            {activeView === "usuarios" && <Usuarios />}
            {activeView === "categorias" && <CategoriasLista />}
            {activeView === "rules" && <ListRules />}
            {activeView === "questionarios" && <QuestionariosLista />}
          </div>
        </main>
      )}
    </>
  );
};

export default Adm;
