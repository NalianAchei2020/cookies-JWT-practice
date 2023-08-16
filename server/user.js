import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from './model.js';
import { createError } from './error.js';

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      isAdmin: false,
    });

    await user.save();
    res.status(200).send({ message: 'User Created' });
  } catch (err) {
    next(err);
  }
};
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });
    if (!user) return next(createError(404, 'user not found!'));
    const isPasswordCurrent = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCurrent)
      return next(createError(400, 'Wrong username or password!'));
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      'SOMEthingsa89976dcvbnm,kll nvumantan',
      { expiresIn: '24h' }
    );
    const { password, isAdmin, ...otherDatails } = user._doc;
    res
      .cookie('access_token', token, {
        httpOnly: true,
        /*
        secure: true,
        sameSite: 'none',
        maxAge: 24 * 60 * 60 * 1000,
        path: '/',
       signed:true
        */
      })
      .status(200)
      .json({ ...otherDatails, auth: true, isAdmin: isAdmin });
  } catch (err) {
    next(err);
  }
};

export const updateUsers = async (req, res, next) => {
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateUser);
  } catch (err) {
    next(err);
  }
};
//delete
export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json('User has been deleted');
  } catch (err) {
    next(err);
  }
};
//get
export const getUsers = async (req, res, next) => {
  try {
    const getUser = await User.findById(req.params.id);
    res.status(200).json(getUser);
  } catch (err) {
    next(err);
  }
};

//get all
export const getallusers = async (req, res, next) => {
  try {
    const getalllusers = await User.find();
    res.status(200).json(getalllusers);
  } catch (err) {
    next(err);
  }
};

export const verifiedToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, 'You are not authenticated'));
  }
  jwt.verify(token, 'SOMEthingsa89976dcvbnm,kll nvumantan', (err, user) => {
    if (err) return next(createError(401, 'Token is not valid'));
    req.user = user;
    next();
  });
};
export const verifyUser = (req, res, next) => {
  verifiedToken(req, res, next, (err) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      if (err) return next(createError('You are authorized'));
    }
  });
};
export const verifyAdmin = (req, res, next) => {
  verifiedToken(req, res, next, (err) => {
    if (req.user.id === req.params.id && req.user.isAdmin) {
      next();
    } else {
      if (err) return next(createError('You are authorized'));
    }
  });
};
