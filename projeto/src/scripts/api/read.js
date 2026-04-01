import axios from 'axios';

// Busca a lista de usuários no servidor
export async function getUsers(apiUrl) {
  try {
    const response = await axios.get(apiUrl);
    
    return response.data.users; 
  } catch (error) {
    
    const errorMessage = error.response?.data?.error || 'Failed to fetch users';
    throw new Error(errorMessage);
  }
}

// Envia um novo usuário para o banco
export async function createUser(apiUrl, { name, age, email }) {
  try {
    const response = await axios.post(apiUrl, {
      name,
      age: Number(age),
      email
    });

    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.error || 'Failed to create user';
    throw new Error(errorMessage);
  }
}