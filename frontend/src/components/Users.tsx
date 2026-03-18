// src/components/Users.tsx
import React, { useEffect, useState } from "react";
import type { User } from "../types";
import { api } from "../api";

interface Props {
  selectedUser: User | null;
  setSelectedUser: (user: User) => void;
}

export const Users: React.FC<Props> = ({ selectedUser, setSelectedUser }) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    api.get("/auth/user/{id}").then(res => setUsers(res.data));
  }, []);

  return (
    <div>
      <h2>Users</h2>
      {users.map(u => (
        <div key={u.id} style={{ margin: 5 }}>
          <span>{u.name} ({u.email})</span>
          <button style={{ marginLeft: 10 }} onClick={() => setSelectedUser(u)}>
            {selectedUser?.id === u.id ? "Selected" : "Select"}
          </button>
        </div>
      ))}
      {selectedUser && <p>Current User: {selectedUser.name}</p>}
    </div>
  );
};