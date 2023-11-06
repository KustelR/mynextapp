import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ArticleTable(props) {
  const { addMessage } = props;
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await axios.get("/api/v2/users");
        setUsers(response.data);
      } catch (error) {
        addMessage(error.message);
      }
    }
    loadUsers();
  }, []);

  return (
    <table className="table-auto">
      <thead className="font-bold">
        <tr>
          <td>Login</td>
          <td>Email</td>
          <td>Nickname</td>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => {
          return (
            <tr key={user._id}>
              <td>{user.login}</td>
              <td>{user.email}</td>
              <td>{user.nickname}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
