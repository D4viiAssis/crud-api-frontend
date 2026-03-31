import axios from 'axios';

// PUT — Substitui TODOS os dados do usuário de uma vez
export async function updateUser(apiUrl, id, { name, age, email }) {
  try {
    const response = await axios.put(`${apiUrl}?id=${id}`, {
      name,
      age: Number(age),
      email
    });

    return response.data;
  } catch (error) {
    const message = error.response?.data?.error || 'Failed to update user';
    console.error('Error updating user:', error);
    throw new Error(message);
  }
}

// PATCH — Atualiza apenas os campos que mudaram
export async function patchUser(apiUrl, id, fields) {
  try {
    if (fields.age !== undefined) {
      fields.age = Number(fields.age);
    }

    const response = await axios.patch(`${apiUrl}?id=${id}`, fields);

    return response.data;
  } catch (error) {
    const message = error.response?.data?.error || 'Failed to patch user';
    console.error('Error patching user:', error);
    throw new Error(message);
  }
}