import "./App.css";
import HomeEmpreendedores from "./Components/Home-Empreendedores/HomeEmpreendedores";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Servicos from "./Components/Servicos/Servicos";
import Sobre from "./Components/Sobre/Sobre";
import CadastroUsuario from "./Components/CadastroUsuario.jsx/CadastroUsuario";
import CadastroServico from "./Components/CadastroServico/CadastroServico";
import ListServicos from "./Components/Listagens/ListServicos";
import Adm from "./Components/Adm/Adm";
import { GlobalStorage } from "./Hooks/GlobalContext";

function App() {

  return (
    <GlobalStorage>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomeEmpreendedores />} />
        <Route exact path="servicos" element={<Servicos />} />
        <Route exact path="cadastro-usuarios" element={<CadastroUsuario />} />
        <Route exact path="cadastro-servico" element={<CadastroServico />} />
        <Route exact path="sobre" element={<Sobre />} />
        <Route exact path="adm" element={<Adm />} />
      </Routes>
    </BrowserRouter>
    </GlobalStorage>
  );
}

export default App;
