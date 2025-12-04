const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(express.json());

// Conexão com MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Senha@12345",
  database: "pedidos_db"
});

db.connect((err) => {
  if (err) {
    console.log("Erro ao conectar ao MySQL:", err);
    return;
  }
  console.log("Conectado ao MySQL!");
});


// ================================
// 📌 LOGIN QUE SEMPRE FUNCIONA
// ================================
//
// 👉 Se email NÃO existe → cria na hora
// 👉 Não verifica senha
// 👉 Retorna o nome do usuário para o front
// ================================

app.post("/login", (req, res) => {
  const { email, senha } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Informe um email!" });
  }

  const sqlFind = "SELECT * FROM usuarios WHERE email = ?";

  db.query(sqlFind, [email], (err, result) => {
    if (err) return res.status(500).json({ error: err });

    // Usuário existe → loga
    if (result.length > 0) {
      return res.json({
        message: "Login efetuado!",
        usuario: { id: result[0].id, nome: result[0].nome }
      });
    }

    // Usuário NÃO existe → cria automaticamente
    const nome = email.split("@")[0]; // nome automático
    const sqlInsert = "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)";

    db.query(sqlInsert, [nome, email, senha || "1234"], (err, insertResult) => {
      if (err) return res.status(500).json({ error: err });

      return res.json({
        message: "Usuário criado automaticamente!",
        usuario: { id: insertResult.insertId, nome }
      });
    });
  });
});


// ================================
// 📌 ROTAS DE PEDIDOS
// ================================

// Buscar todos os pedidos
app.get("/pedidos", (req, res) => {
  db.query("SELECT * FROM pedidos", (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
});

// Criar novo pedido
app.post("/pedidos", (req, res) => {
  const { titulo, departamento, responsavel, descricao, status } = req.body;

  const sql =
    "INSERT INTO pedidos (titulo, departamento, responsavel, descricao, status) VALUES (?, ?, ?, ?, ?)";

  db.query(
    sql,
    [titulo, departamento, responsavel, descricao, status],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });

      res.status(201).json({
        id: result.insertId,
        titulo,
        departamento,
        responsavel,
        descricao,
        status,
      });
    }
  );
});

// Excluir pedido
app.delete("/pedidos/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM pedidos WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Pedido não encontrado" });
    }

    res.json({ message: "Pedido deletado com sucesso!" });
  });
});


// ================================
// 📌 INICIAR SERVIDOR
// ================================
app.listen(5000, () => {
  console.log("Servidor rodando na porta 5000");
});
