import axios from "axios";

const API_URL = "http://localhost:5000";

/* ===============================
   📌 BUSCAR PEDIDOS
================================ */
export const getPedidos = async () => {
  try {
    const response = await axios.get(`${API_URL}/pedidos`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar pedidos:", error);
    return [];
  }
};

/* ===============================
   📌 CRIAR PEDIDO
================================ */
export const addPedido = async (pedido) => {
  try {
    const response = await axios.post(`${API_URL}/pedidos`, pedido);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar pedido:", error);
    return null;
  }
};

/* ===============================
   📌 EXCLUIR PEDIDO
================================ */
export const deletePedido = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/pedidos/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao excluir pedido:", error);
    return null;
  }
};

/* ===============================
   📌 LOGIN (COM TRATAMENTO CERTO)
================================ */
export const login = async (email, senha) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, senha });
    return response.data;

  } catch (error) {
    console.error("Erro no login:", error);

    // Se o servidor enviou uma mensagem (400/401/500)
    if (error.response && error.response.data) {
      return {
        erro: true,
        message: error.response.data.message || "Erro no login."
      };
    }

    // Se realmente não conectou
    return {
      erro: true,
      message: "Erro ao conectar ao servidor"
    };
  }
};
