import { useState } from "react"; 
import { login } from "./api"; 
import "./Login.css"; 

// Componente de login
export default function Login({ onLogin }) {
  // Estados do componente
  const [email, setEmail] = useState(""); 
  const [senha, setSenha] = useState(""); 
  const [erro, setErro] = useState("");  

  // Função do botão Entrar
  async function fazerLogin() {
    setErro(""); // Limpa erros anteriores

    // Valida se todos os campos estão preenchidos
    if (!email || !senha) {
      setErro("Preencha todos os campos!");
      return;
    }

    const resposta = await login(email, senha); // Chama a função de login da API

    // Verifica se houve erro no login
    if (!resposta || !resposta.usuario) {
      setErro("Erro ao fazer login"); // Mostra mensagem de erro se login falhou
      return;
    }

    // chama onLogin passando o nome do usuário
    onLogin(resposta.usuario.nome);
  }

  return (
    <div className="login-container">
      <h2>Login</h2>

      {/* Campo de email */}
      <input
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br />

      {/* Campo de senha */}
      <input
        placeholder="Senha"
        type="password"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      /><br />

      {/* Botão de login */}
      <button onClick={fazerLogin}>Entrar</button>

      {/* Mensagem de erro */}
      {erro && <p style={{ color: "red" }}>{erro}</p>}
    </div>
  );
}
