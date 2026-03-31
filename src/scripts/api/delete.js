// Exporta para uso no app.js
export async function deleteUser(apiUrl, id) {
  // Faz a requisição DELETE passando o ID na URL
  const response = await fetch(
    `${apiUrl}?id=${id}`, 
    { method: 'DELETE' } // Método de remoção
  );

  const data = await response.json(); // Resposta do servidor

  // Se tiver algum erro, ele avisa o que aconteceu (motivo)
  if (!response.ok) {
    throw new Error(
      data.error || 'Failed to delete user'
    );
  }

  return data;
}