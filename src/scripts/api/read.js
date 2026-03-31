// Busca a lista de usuários no servidor
export async function getUsers(apiUrl) {
  const response = await fetch(apiUrl); // GET por padrão
  const data = await response.json();

  // Erro se a lista não vier
  if (!response.ok) {
    throw new Error(data.error || 'Failed to fetch users');
  }

  return data.users; // Retorna só a array de usuários
}

// Envia um novo usuário para o banco
export async function createUser(apiUrl, { name, age, email }) {
  const response = await fetch(apiUrl, {
    method: 'POST', // POST = Criar
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name,
      age: Number(age), // Garante que é número
      email
    }),
  });

  const data = await response.json();

  // Erro se a criação falhar
  if (!response.ok) {
    throw new Error(data.error || 'Failed to create user');
  }

  return data;
}