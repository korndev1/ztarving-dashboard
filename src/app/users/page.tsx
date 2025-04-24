'use client';

import React, { useEffect, useState } from "react";
import { getUsers, User } from "../../lib/services/userService";

export const dynamic = "force-dynamic"; // ensure fresh data

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);



  useEffect(() => {
    fetchUsers();
  }, [users]);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (err: any) {
      console.error("fetch user error", err);
      setError(err.message || "Something went wrong");
    }
  };

  if (error) {
    return (
      <div className="p-6 text-red-600">
        <h1 className="text-2xl font-bold mb-4">Users Dashboard</h1>
        <p>Error loading users: {error}</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Users Dashboard</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-orangeCustom border">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="py-2 px-4 border-b">{user.id}</td>
                <td className="py-2 px-4 border-b">{user.firstName}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersPage;
