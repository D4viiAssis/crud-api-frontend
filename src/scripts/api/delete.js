import axios from 'axios';

// Exporta para uso no app.js
export async function deleteUser(apiUrl, id) {
  try {
    // Faz a requisição DELETE passando o ID na URL
    const response = await axios.delete(`${apiUrl}?id=${id}`);

    return response.data;
  } catch (error) {
    
    const message = error.response?.data?.error || 'Failed to delete user';
    console.error('Error deleting user:', error);
    throw new Error(message);
  }
}