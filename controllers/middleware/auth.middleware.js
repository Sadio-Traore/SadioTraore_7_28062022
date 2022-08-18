// const jwt = require('jsonwebtoken');

// module.exports = (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(' ')[1];
//     const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
//     const userId = decodedToken.userId;
//     if (req.body.userId && req.body.userId !== userId) {
//       throw 'User ID non valable';
//     } else {
//       next();
//     }
//   } catch (error) {
//     res.status(401).json({ error: error |'Requête non authentifiée !'});
//     };
// }


const jwt = require("jsonwebtoken");
const User = require("../../models/User");
// require('dotenv').config();



module.exports.checkUser = (req, res, next) => {
  const token =req.cookies

  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        // res.cookie("jwt", "", { maxAge: 1 });
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }


};

module.exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.send(200).json('requête non autorisée')
      } else {
        console.log(decodedToken.id);
        next();
      }
    });
  } else {
    console.log('Non autorisé');
  }
};
