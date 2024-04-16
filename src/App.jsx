import "./App.css";
import HomeEmpreendedores from "./Components/Home-Empreendedores/HomeEmpreendedores";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Servicos from "./Components/Servicos/Servicos";
import Sobre from "./Components/Sobre/Sobre";
import CadastroUsuario from "./Components/Cadastros/CadastroUsuario.jsx/CadastroUsuario";
import CadastroServico from "./Components/Cadastros/CadastroServico/CadastroServico";
import ListServicos from "./Components/Listagens/ListServicos";
import Adm from "./Components/Adm/Adm";
import { GlobalStorage } from "./Hooks/GlobalContext";
import AtualizaUsuario from "./Components/Atualização/AtualizaUsuario.jsx/AtualizaUsuario";
import AtualizaServico from "./Components/Atualização/AtualizaServico/AtualizaServico";
import MinhaConta from "./Components/PerfilUsuario/MinhaConta/MinhaConta";
import ServicosUsuario from "./Components/PerfilUsuario/ServicosUsuario/ServicosUsuario";
import { Header } from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import PerfilUsuario from "./Components/PerfilUsuario/PerfilUsuario";

function App() {

  return (
    <GlobalStorage>
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route exact path="/" element={<HomeEmpreendedores />} />
        <Route exact path="servicos" element={<Servicos />} />
        <Route exact path="usuario/cadastro" element={<CadastroUsuario />} />
        <Route exact path="usuarios/cadastro/atualiza" element={<AtualizaUsuario />} />
        <Route exact path="meu_perfil/*" element={<PerfilUsuario />} />
        <Route exact path="servico/cadastro" element={<CadastroServico />} />
        <Route exact path="servico/cadastro/atualiza" element={<AtualizaServico />} />
        <Route exact path="sobre" element={<Sobre />} />
        <Route exact path="adm" element={<Adm />} />
      </Routes>
      <Footer />
    </BrowserRouter>
    </GlobalStorage>
  );
}

export default App;
