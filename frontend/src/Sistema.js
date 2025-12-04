import React, { useEffect, useState } from "react";
import PedidoList from "./components/PedidoList";
import PedidoForm from "./components/PedidoForm";
import { getPedidos, addPedido, deletePedido } from "./api";
import "./App.css";

function Sistema({ usuario }) {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    carregarPedidos();
  }, []);

  const carregarPedidos = async () => {
    const dados = await getPedidos();
    setPedidos(Array.isArray(dados) ? dados : []);
  };

  const criarPedido = async (novoPedido) => {
    await addPedido(novoPedido);
    carregarPedidos();
  };

  // 🔥 Função que realmente apaga o pedido
  const excluirPedido = async (id) => {
    await deletePedido(id);
    carregarPedidos();
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Sistema de Requisições</h1>
        <p>Bem-vindo, <strong>{usuario}</strong>!</p>
      </header>

      <div className="dashboard">
        <div className="card pedido-form">
          <h2>Novo Pedido</h2>
          <PedidoForm onAdd={criarPedido} />
        </div>

        <div className="card pedido-list-wrapper">
          <h2>Lista de Pedidos</h2>

          {/* 🔥 AGORA SIM PASSANDO A FUNÇÃO onDelete */}
          <PedidoList pedidos={pedidos} onDelete={excluirPedido} />

        </div>
      </div>
    </div>
  );
}

export default Sistema;
