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
        <Route path="/" element={<HomeEmpreendedores />} />
        <Route path="/servicos" element={<Servicos />} />
        <Route path="/cadastro-usuario" element={<CadastroUsuario />} />
        <Route path="/cadastro-servico" element={<CadastroServico />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/adm" element={<ListServicos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
