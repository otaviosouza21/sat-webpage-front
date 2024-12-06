import "./App.css";
import "aos/dist/aos.css";
import AOS from "aos";
import HomeEmpreendedores from "./Components/Home-Empreendedores/HomeEmpreendedores";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Servicos from "./Components/Servicos/Servicos";
import Sobre from "./Components/Sobre/Sobre";
import CadastroUsuario from "./Components/Cadastros/CadastroUsuario.jsx/CadastroUsuario";
import CadastroServico from "./Components/Cadastros/CadastroServico/CadastroServico";
import Adm from "./Pages/PainelAdm/Adm";
import { GlobalStorage } from "./Hooks/GlobalContext";
import AtualizaUsuario from "./Components/Atualização/AtualizaUsuario.jsx/AtualizaUsuario";
import AtualizaServico from "./Components/Atualização/AtualizaServico/AtualizaServico";
import { Header } from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import PerfilUsuario from "./Components/PerfilUsuario/PerfilUsuario";
import ResetPassword from "./Components/PerfilUsuario/ResetPassword/ResetPassword";
import SendRequest from "./Components/PerfilUsuario/ResetPassword/SendRequest";
import CadastroCategoria from './Components/Cadastros/CadastroCategoria/CadastroCategoria'
import AtualizaCategoria from "./Components/Atualização/AtualizaCategoria/AtualizaCategoria";
import {iniciaAnalytics, logPageView} from './plugins/iniciaAnalytics'
import { useEffect } from "react";



function App() {
  AOS.init();

  useEffect(()=>{
    iniciaAnalytics()
    logPageView()
  },[])

  return (
    <GlobalStorage>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<HomeEmpreendedores />} />
          <Route exact path="servicos" element={<Servicos />} />
          <Route exact path="usuario/cadastro" element={<CadastroUsuario />} />
          <Route exact path="usuarios/cadastro/atualiza"element={<AtualizaUsuario />}/>
          <Route exact path="meu_perfil/*" element={<PerfilUsuario />} />
          <Route exact path="servico/cadastro" element={<CadastroServico />} />
          <Route exact path="servico/cadastro/atualiza" element={<AtualizaServico />} />
          <Route exact path="categoria/cadastro" element={<CadastroCategoria />} />
          <Route exact path="categoria/cadastro/atualiza" element={<AtualizaCategoria />} />
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
