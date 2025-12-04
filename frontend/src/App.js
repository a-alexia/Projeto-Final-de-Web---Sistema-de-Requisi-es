import React, { useEffect, useState } from "react"; // Importa React, useEffect e useState
import PedidoList from "./components/PedidoList"; // Componente que lista os pedidos
import PedidoForm from "./components/PedidoForm"; // Componente de formulário de pedidos
import { getPedidos, addPedido } from "./api"; // Funções da API para buscar e criar pedidos
import "./App.css"; // Importa o CSS do App
import Login from "./Login"; // Componente de login
import Sistema from "./Sistema"; // Componente principal do sistema após login

function App() {
  // Estado que guarda o usuário logado (null significa que ninguém está logado)
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  return (
    <div>
      {/* Se há usuário logado, mostra o Sistema; caso contrário, mostra o Login */}
      {usuarioLogado ? (
        <Sistema usuario={usuarioLogado} />
      ) : (
        <Login onLogin={setUsuarioLogado} /> // Passa a função setUsuarioLogado para atualizar o usuário ao logar
      )}
    </div>
  );
}

export default App; // Exporta o componente App como padrão
