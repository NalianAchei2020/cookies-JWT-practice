import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { userContext } from '../context/store';
import Cookies from 'js-cookie';

const Users = () => {
  const { state } = useContext(userContext);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const fetchUsers = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: 'http://localhost:5000/api/v1/users',
        headers: {
          ContentType: 'application/json',
        },
        withCredentials: true,
      });
      const data = response.data;
      setUsers(data);
      setMessage(data.message);
      console.log(data.status);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUsers();
    // Retrieve token from cookie when the component mounts
    const token = Cookies.get('access_token');
    if (token) {
      console.log('Token is present');
    }
  }, []);

  return (
    <div>
      {users.map((user) => (
        <p>{user.username}</p>
      ))}
      <h1>Hi Admin</h1>
      <h5>{message}</h5>
    </div>
  );
};

export default Users;
