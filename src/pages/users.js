import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { userContext } from '../context/store';

const Users = () => {
  const { state } = useContext(userContext);
  const token = state.token;
  console.log(token);
  const [users, setUsers] = useState([]);
  const fetchUsers = async () => {
    try {
      if (!token) {
        throw new Error('Access token not found');
      }
      const response = await axios({
        method: 'GET',
        url: 'http://localhost:5000/api/v1/users',
        headers: {
          Authorization: token,
          ContentType: 'application/json',
        },
      });
      const data = response.data;
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  useEffect(() => {
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('access_token='))
      ?.split('=')[1];

    if (token) {
      // Use the token for further operations or API requests
      console.log(token);
    }
  }, []);
  return (
    <div>
      {users.map((user) => (
        <p>{user.username}</p>
      ))}
      <h1>Hi Admin</h1>
    </div>
  );
};

export default Users;
