import { responseApi, responseLoginApi } from "@/type";

export interface SignUp {
  password: string;
  userName: string;
}

export const authService = {
  loginAdmin: async (body: SignUp): Promise<responseLoginApi> => {
    const res = await fetch("http://localhost:3333/auth/login/admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: body.password,
        userName: body.userName,
      }),
    });

    if (!res.ok) {
      const json = await res.json();
      return json;
    }

    const json = await res.json();

    return json;
  },
  registerAdmin: async (body: SignUp): Promise<responseApi> => {
    const res = await fetch("http://localhost:3333/auth/signup/admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: body.password,
        userName: body.userName,
      }),
    });

    if (!res.ok) {
      throw {statusCode: res.status, message: res.statusText}
    }

    const json = await res.json();

    return json;
  },
};

export async function loginAdmin(body: SignUp): Promise<responseApi> {
  const res = await fetch("http://localhost:3333/auth/login/admin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: body.password,
      userName: body.userName,
    }),
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch users: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();

  return json;
}
