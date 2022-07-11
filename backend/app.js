const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const userAuth = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const postRoutes = require ('./routes/post.routes');

const auth = require('./middleware/auth.middleware');



mongoose.connect(process.env.SECRET_KEY,
{ useNewUrlParser: true,
  useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
  
const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(cookieParser());


// jwt
app.get('*', auth);
app.get('/jwtid', auth, (req, res) => {
  res.status(200).send(res.locals.user._id)
});



app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userAuth);
app.use('/api/user', userRoutes);
app.use('api/post', postRoutes);

module.exports = app;