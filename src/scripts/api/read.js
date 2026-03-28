export async function getUsers(apiUrl) {
  const response = await fetch(apiUrl);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error || 'Failed to fetch users'
    );
  }

  return data.users;
}
export async function createUser(
  apiUrl, { name, age, email }
) {
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      age: Number(age),
      email
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error || 'Failed to create user'
    );
  }

  return data;
}