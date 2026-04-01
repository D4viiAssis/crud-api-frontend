import axios from 'axios';

// Exporta a função para o app.js
export async function createUser(apiUrl, { name, age, email }) {
  try {
    // No Axios, você passa o objeto direto. 
    // Ele já faz o JSON.stringify e define o Content-Type: application/json
    const response = await axios.post(apiUrl, {
      name,
      age: Number(age),
      email
    });

    // A resposta já vem parseada dentro de .data
    return response.data;
  } catch (error) {
    // O Axios cai no catch automaticamente se o status não for 2xx
    const message = error.response?.data?.error || 'Failed to create user';
    throw new Error(message);
  }
}