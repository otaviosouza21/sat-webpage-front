import "./App.css";
import "aos/dist/aos.css";
import AOS from "aos";
import HomeEmpreendedores from "./Pages/Home/Home-Empreendedores/HomeEmpreendedores.tsx";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Servicos from "./Pages/Servicos/Servicos/Servicos.tsx";
import Sobre from "./Pages/Sobre/Sobre.tsx";
import CadastroUsuario from "./Components/Formularios/Cadastros/CadastroUsuario.jsx/CadastroUsuario.tsx";
import CadastroServico from "./Components/Formularios/Cadastros/CadastroServico/CadastroServico.tsx";
import Adm from "./Pages/PainelAdm/Adm";
import { GlobalStorage } from "./Hooks/GlobalContext.tsx";
import AtualizaUsuario from "./Components/Formularios/Atualização/AtualizaUsuario.jsx/AtualizaUsuario.tsx";
import AtualizaServico from "./Components/Formularios/Atualização/AtualizaServico/AtualizaServico.tsx";
import { Header } from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import PerfilUsuario from "./Components/PerfilUsuario/PerfilUsuario.tsx";
import ResetPassword from "./Components/PerfilUsuario/ResetPassword/ResetPassword.tsx";
import SendRequest from "./Components/PerfilUsuario/ResetPassword/SendRequest.tsx";
import CadastroCategoria from "./Components/Formularios/Cadastros/CadastroCategoria/CadastroCategoria.tsx";
import AtualizaCategoria from "./Components/Formularios/Atualização/AtualizaCategoria/AtualizaCategoria.tsx";
import QuestionariosLista from "./Pages/PainelAdm/Questionarios/QuestionariosLista/QuestionariosLista";
import QuestionariosCadastro from "./Pages/PainelAdm/Questionarios/QuestionariosCadastro/QuestionariosCadastro";
import { ToastContainer, Zoom } from "react-toastify";
import { useEffect } from "react";
import { iniciaAnalytics, logPageView } from "./plugins/iniciaAnalytics.ts";

function App() {
  AOS.init();

  useEffect(() => {
    iniciaAnalytics();
    logPageView();
  }, []);

  return (
    <GlobalStorage>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomeEmpreendedores />} />
          <Route path="servicos" element={<Servicos />} />
          <Route path="usuario/cadastro" element={<CadastroUsuario />} />
          <Route
            path="usuarios/cadastro/atualiza"
            element={<AtualizaUsuario />}
          />
          <Route path="meu_perfil/*" element={<PerfilUsuario />} />
          <Route path="servico/cadastro" element={<CadastroServico />} />
          <Route
            path="servico/cadastro/atualiza"
            element={<AtualizaServico />}
          />
          <Route path="categoria/cadastro" element={<CadastroCategoria />} />
          <Route
            path="categoria/cadastro/atualiza"
            element={<AtualizaCategoria />}
          />
          <Route path="sobre" element={<Sobre />} />
          <Route path="adm" element={<Adm />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="send-request" element={<SendRequest />} />
          <Route
            path="questionario/cadastro"
            element={<QuestionariosCadastro />}
          />
        </Routes>
        <ToastContainer />
        <Footer />
      </BrowserRouter>
    </GlobalStorage>
  );
}

export default App;
