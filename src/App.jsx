import "./App.css";
import "aos/dist/aos.css";
import AOS from "aos";
import HomeEmpreendedores from "./Components/Home-Empreendedores/HomeEmpreendedores";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Servicos from "./Components/Servicos/Servicos";
import Sobre from "./Components/Sobre/Sobre";
import CadastroUsuario from "./Components/Cadastros/CadastroUsuario.jsx/CadastroUsuario";
import CadastroServico from "./Components/Cadastros/CadastroServico/CadastroServico";
import Adm from "./Components/Adm/Adm";
import { GlobalStorage } from "./Hooks/GlobalContext";
import AtualizaUsuario from "./Components/Atualização/AtualizaUsuario.jsx/AtualizaUsuario";
import AtualizaServico from "./Components/Atualização/AtualizaServico/AtualizaServico";
import { Header } from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import PerfilUsuario from "./Components/PerfilUsuario/PerfilUsuario";
import ResetPassword from "./Components/PerfilUsuario/ResetPassword/ResetPassword";
import SendRequest from "./Components/PerfilUsuario/ResetPassword/SendRequest";
import { useEffect } from "react";
import ReactGA from "react-ga";
import iniciaAnalytics from "./plugins/iniciaAnalytics";
import PageTracker from "./Hooks/PageTracker";

function App() {
  AOS.init();

  return (
    <GlobalStorage>
      <BrowserRouter>
        <PageTracker />
        <Header />
        <Routes>
          <Route exact path="/" element={<HomeEmpreendedores />} />
          <Route exact path="servicos" element={<Servicos />} />
          <Route exact path="usuario/cadastro" element={<CadastroUsuario />} />
          <Route
            exact
            path="usuarios/cadastro/atualiza"
            element={<AtualizaUsuario />}
          />
          <Route exact path="meu_perfil/*" element={<PerfilUsuario />} />
          <Route exact path="servico/cadastro" element={<CadastroServico />} />
          <Route
            exact
            path="servico/cadastro/atualiza"
            element={<AtualizaServico />}
          />
          <Route exact path="sobre" element={<Sobre />} />
          <Route exact path="adm" element={<Adm />} />
          <Route exact path="reset-password" element={<ResetPassword />} />
          <Route exact path="send-request" element={<SendRequest />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </GlobalStorage>
  );
}

export default App;
