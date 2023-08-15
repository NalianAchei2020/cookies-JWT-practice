import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {
  deleteUser,
  getUsers,
  getallusers,
  login,
  register,
  updateUsers,
  verifyAdmin,
  verifyUser,
} from './user.js';

const app = express();

mongoose
  .connect('mongodb://0.0.0.0:27017/usersBD')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log(err);
  });
//middleware
app.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

//cookie
app.use(cookieParser());
app.post('/', (req, res) => {
  res.send('Hi there');
});

app.post('/api/v1/auth/signup', register);
app.post('/api/v1/auth/signin', login);
//update
app.put('/api/v1/users/:id', verifyUser, updateUsers);
//delete
app.delete('/api/v1/users/:id', verifyUser, deleteUser);
//get
app.get('/api/v1/users/:id', verifyUser, getUsers);
//get all
app.get('/api/v1/users', verifyAdmin, getallusers);

//error middleware handler
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || 'Something went wrong';
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(5000, () => {
  console.log('server is running on port 5000');
});
