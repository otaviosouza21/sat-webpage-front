import "./App.css";
import HomeEmpreendedores from "./Components/Home-Empreendedores/HomeEmpreendedores";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Servicos from "./Components/Servicos/Servicos";
import Sobre from "./Components/Sobre/Sobre";
import CadastroUsuario from "./Components/CadastroUsuario.jsx/CadastroUsuario";
import CadastroServico from "./CadastroServico/CadastroServico";
import ListServicos from "./Components/Listagens/ListServicos";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomeEmpreendedores />} />
        <Route exact path="servicos" element={<Servicos />} />
        <Route exact path="cadastro-usuario" element={<CadastroUsuario />} />
        <Route exact path="cadastro-servico" element={<CadastroServico />} />
        <Route exact path="sobre" element={<Sobre />} />
        <Route exact path="adm" element={<ListServicos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
