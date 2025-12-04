import mysql from 'mysql2';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Senha@12345', // <- sua senha do MySQL Workbench
  database: 'projeto_pedidos'
});

pool.getConnection((err) => {
  if (err) {
    console.error("Erro ao conectar ao MySQL:", err);
    return;
  }
  console.log("MySQL conectado com sucesso!");
});

export default pool;
