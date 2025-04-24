export interface User {
  id: number;
  firstName: string;
  email: string;
}

export async function getUsers(): Promise<{ data: User[] }> {
  const res = await fetch('http://localhost:3333/auth/Users', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch users: ${res.status} ${res.statusText}`);
  }

  const json = await res.json(); // ✅ await added here

  return json;
}
