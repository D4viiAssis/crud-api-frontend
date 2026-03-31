// PUT — Substitui TODOS os dados do usuário de uma vez
export async function updateUser(apiUrl, id, { name, age, email }) {
  const response = await fetch(`${apiUrl}?id=${id}`, {
    method: 'PUT', // PUT = Troca tudo
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name,
      age: Number(age),
      email
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Failed to update user');
  }

  return data;
}

// PATCH = Atualiza apenas os campos que mudaram
export async function patchUser(apiUrl, id, fields) {
  // garante que a idade é número
  if (fields.age !== undefined) {
    fields.age = Number(fields.age);
  }

  const response = await fetch(`${apiUrl}?id=${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(fields), // Envia só os campos alterados
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Failed to patch user');
  }

  return data;
}