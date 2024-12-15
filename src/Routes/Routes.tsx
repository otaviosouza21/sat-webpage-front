import React from "react";
import { Route, Routes } from "react-router-dom";

const RoutesApp = () => {
  return (
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
      <Route exact path="categoria/cadastro" element={<CadastroCategoria />} />
      <Route
        exact
        path="categoria/cadastro/atualiza"
        element={<AtualizaCategoria />}
      />
      <Route exact path="sobre" element={<Sobre />} />
      <Route exact path="adm" element={<Adm />} />
      <Route exact path="reset-password" element={<ResetPassword />} />
      <Route exact path="send-request" element={<SendRequest />} />
      <Route
        exact
        path="questionario/cadastro"
        element={<QuestionariosCadastro />}
      />
    </Routes>
  );
};

export default RoutesApp;
