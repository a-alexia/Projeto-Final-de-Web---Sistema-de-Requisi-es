import React from "react";

/**
 * PedidoList
 * Recebe:
 *  - pedidos: array de objetos { id, titulo, departamento, responsavel, descricao, status }
 *  - onDelete: função opcional (id) => {} chamada ao clicar em Excluir
 *
 * O onDelete é opcional — se não for passado, o componente não quebra (usa no-op).
 */
export default function PedidoList({ pedidos = [], onDelete = () => {} }) {
  // Segurança: garante que pedidos é array
  if (!Array.isArray(pedidos) || pedidos.length === 0) {
    return <p>Nenhum pedido encontrado.</p>;
  }

  const handleDelete = (id) => {
    // confirmação antes de excluir
    const ok = window.confirm("Tem certeza que deseja excluir este pedido?");
    if (!ok) return;
    try {
      onDelete(id);
    } catch (err) {
      console.error("Erro ao chamar onDelete:", err);
    }
  };

  return (
    <div className="pedido-list">
      {pedidos.map((p) => (
        <div key={p.id} className="pedido-card card">
          <div>
            <h3>{p.titulo}</h3>
            <p><strong>Departamento:</strong> {p.departamento}</p>
            <p><strong>Responsável:</strong> {p.responsavel}</p>
            <p><strong>Descrição:</strong> {p.descricao}</p>
            <p><strong>Status:</strong> {p.status}</p>
          </div>

          <div style={{ marginTop: 12 }}>
            <button
              onClick={() => handleDelete(p.id)}
              className="btn-delete"
              type="button"
            >
              Excluir
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
