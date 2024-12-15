import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Garantindo que o elemento HTML com o id 'root' exista
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Elemento com id 'root' não encontrado.");
}

// Criando o root e renderizando o componente App
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
