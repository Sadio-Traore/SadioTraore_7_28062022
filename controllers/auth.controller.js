const UserModel = require('../models/User');
const jwt = require('jsonwebtoken');
const { signUpErrors, signInErrors } = require('../errors/errors.messages');

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
  return jwt.sign({id}, process.env.TOKEN_SECRET, {
    expiresIn: maxAge
  })
};

exports.signUp = async (req, res) => {
  const {lastName,firstName, email, password} = req.body

  try {
    const user = await UserModel.create({lastName,firstName, email, password });
    res.status(201).json({ user: user._id});
  }
  catch(err) {
    const errors = signUpErrors(err);
    res.status(200).send({ errors })
  }
}

exports.signIn = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await UserModel.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge});
    res.status(200).json({ user: user._id})
  } catch (err){
    console.log('errors')
    const errors = signInErrors(err);
    res.status(200).json({ errors });
  }
}

exports.logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
}