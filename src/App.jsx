import "./App.css";
import HomeEmpreendedores from "./Components/Home-Empreendedores/HomeEmpreendedores";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Servicos from "./Components/Servicos/Servicos";
import Sobre from "./Components/Sobre/Sobre";
import { SimpleAnime } from "./plugins/simple-anime";
import { useEffect } from "react";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeEmpreendedores />} />
        <Route path="/servicos" element={<Servicos />} />
        <Route path="/sobre" element={<Sobre />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
