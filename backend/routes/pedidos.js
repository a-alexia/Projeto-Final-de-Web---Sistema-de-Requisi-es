import express from "express";
import pool from "../db.js";

const router = express.Router();

// LISTAR pedidos
router.get("/", (req, res) => {
  pool.query("SELECT * FROM pedidos", (err, results) => {
    if (err) {
      console.error("Erro ao buscar pedidos:", err);
      return res.status(500).json({ error: "Erro ao buscar pedidos" });
    }
    res.json(results);
  });
});

// CRIAR pedido
router.post("/", (req, res) => {
  const { cliente, produto, quantidade } = req.body;

  if (!cliente || !produto || !quantidade) {
    return res.status(400).json({ error: "Dados incompletos" });
  }

  pool.query(
    "INSERT INTO pedidos (cliente, produto, quantidade) VALUES (?, ?, ?)",
    [cliente, produto, quantidade],
    (err, result) => {
      if (err) {
        console.error("Erro ao criar pedido:", err);
        return res.status(500).json({ error: "Erro ao criar pedido" });
      }

      res.json({ message: "Pedido criado", id: result.insertId });
    }
  );
});

export default router;
