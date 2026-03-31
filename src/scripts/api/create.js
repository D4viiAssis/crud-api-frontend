// Exporta a função para o app.js
export async function createUser(apiUrl, { name, age, email }) {
  
  // Envia os dados para a API
  const response = await fetch(apiUrl, {
    method: 'POST', // POST = Criar novo
    headers: { 'Content-Type': 'application/json' }, // Formato de envio
    body: JSON.stringify({ name, age: Number(age), email }), // Dados em texto
  });

  const data = await response.json(); // Resposta da API

  // Se tiver algum erro, ele avisa o que aconteceu (motivo)
  if (!response.ok) {
    throw new Error(data.error || 'Failed to create user');
  }

  return data;
}