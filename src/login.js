import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { TextField, Stack, Button } from '@mui/material';
import axios from 'axios';
import { userContext } from './context/store';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { dispatch } = useContext(userContext);
  const form = useForm();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = form;
  const hanleLogin = async (data) => {
    try {
      const response = await axios('http://localhost:5000/api/v1/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        data: JSON.stringify(data),
        withCredentials: true,
      });
      const resdata = response.data;
      dispatch({ type: 'LOGIN', payload: resdata });

      console.log(resdata);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="login">
      <form onSubmit={handleSubmit(hanleLogin)} noValidate>
        <DevTool control={control} />
        <Stack spacing={2} width={400}>
          <TextField
            type="text"
            label="Username"
            id="username"
            {...register('username', {
              required: {
                value: true,
                message: 'Username is required',
              },
            })}
          />
          {errors.username && (
            <p
              className="
        error"
            >
              {errors.username.message}
            </p>
          )}

          <TextField
            type="password"
            label="password"
            id="password"
            {...register('password', {
              required: {
                value: true,
                message: 'Password is required',
              },
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
          />
          <p
            className="
        error"
          >
            {errors.password?.message}
          </p>
          <Button type="submit" variant="outlined" color="primary">
            Login
          </Button>
          <br />
        </Stack>
      </form>
    </div>
  );
};

export default Login;
