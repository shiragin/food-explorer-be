const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../schema/user');
require('dotenv').config();

const getUsers = async (req, res) => {
  try {
    const query = req.query;
    const allUsers = await User.find();

    res.send({
      data: allUsers,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const getUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({ userId });
    if (user) {
      res.send({
        data: user,
      });
    } else {
      res.status(400).send('User does not exist');
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const login = async (req, res) => {
  try {
    const { user, token } = req.body;
    res.send({ user, token });

  } catch (err) {
    res.status(500).send(err);
  }
};

const signup = async (req, res) => {
  console.log('user.password', req.body);
  try {
    const user = new User({ ...req.body });
    if (!user) {
      return res.status(404).send('Failed to create user');
    }
    try {
      req.body.password = await bcrypt.hash(req.body.password, 10);
      await user.save();
    } catch (error) {
      console.log(error);
      return res.status(400).send('Email sdfds');
    }

    const token = user.generateAuthToken();
    console.log(token, 'nimrod yael');

    res.send({ user, token });
    // if (userAdded) {
    //   res.send(newUser);
    // }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

module.exports = { getUsers, getUser, signup, login };
