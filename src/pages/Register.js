import React from 'react';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { TextField, Stack, Button } from '@mui/material';
import axios from 'axios';
import { useContext } from 'react';
import { userContext } from '../context/store';

const Register = () => {
  const { dispatch } = useContext(userContext);
  const form = useForm();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = form;
  const submit = async (data) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/v1/auth/signup',
        data
      );
      dispatch({ type: 'REGISTRATION', payload: response.data });
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submit)} noValidate>
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
            type="email"
            label="email"
            id="eamail"
            {...register('email', {
              required: {
                value: true,
                message: 'Email is required',
              },
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: 'Email is invalid',
              },
              validate: (fieldValue) => {
                return (
                  fieldValue !== 'admin@gmail.com' || 'Enter a different email '
                );
              },
            })}
          />
          <p
            className="
        error"
          >
            {errors.email?.message}
          </p>
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
            Register
          </Button>
          <br />
        </Stack>
      </form>
      <br />
      <br />
    </div>
  );
};

export default Register;
