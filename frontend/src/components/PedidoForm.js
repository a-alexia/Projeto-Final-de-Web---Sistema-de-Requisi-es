import React, { useState } from 'react';

export default function PedidoForm({ onAdd }) {
  const [titulo, setTitulo] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [responsavel, setResponsavel] = useState('');
  const [descricao, setDescricao] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const novoPedido = { titulo, departamento, responsavel, descricao, status: 'Recebido' };
    onAdd(novoPedido);
    setTitulo('');
    setDepartamento('');
    setResponsavel('');
    setDescricao('');
  };

  return (
    <form onSubmit={handleSubmit} className="pedido-form card">
      <h2>Novo Pedido</h2>
      <div className="form-group">
        <label>Título:</label>
        <input type="text" value={titulo} onChange={e => setTitulo(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Departamento:</label>
        <input type="text" value={departamento} onChange={e => setDepartamento(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Responsável:</label>
        <input type="text" value={responsavel} onChange={e => setResponsavel(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Descrição:</label>
        <textarea value={descricao} onChange={e => setDescricao(e.target.value)} required />
      </div>
      <button type="submit">Adicionar Pedido</button>
    </form>
  );
}
