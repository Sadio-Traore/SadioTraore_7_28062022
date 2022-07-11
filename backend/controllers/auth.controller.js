const UserModel = require('../models/User');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const { signUpErrors, loginErrors } = require('../errors/messages.errors');

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
  return jwt.sign({id}, process.env.TOKEN_SECRET, {
    expiresIn: maxAge
  })
};

exports.signUp =  (req, res,next) => {
  const {pseudo, email, password,picture} = req.body;
  try {
    const user = UserModel.create({pseudo, email, password,picture });
    res.status(201).json({ user: user._id});
  }
  catch(err) {
    const errors = signUpErrors(err);
    res.status(400).send({ errors })
  }}

exports.login =  (req, res,next) => {
  const { email, password } = req.body

  try {
    const user = UserModel.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge});
    res.status(200).json({ user: user._id})
  } catch (err){
    const errors = loginErrors(err);
    res.status(400).json({ errors });
  }
}


exports.logout = (req, res,) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
}