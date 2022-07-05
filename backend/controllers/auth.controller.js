// const User = require ('../models/User')
// const jwt = require('jsonwebtoken');
// const maxAge = 3 * 24 * 60 * 60 * 1000;

// exports.signup = (req, res, next) => {
//     bcrypt.hash(req.body.password, 10)
//     .then(hash => {
//       const user = new User({
//         pseudo:req.body.pseudo,
//         email: req.body.email,
//         password: hash
//       });
//       user.save()
//         .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
//         .catch(error => res.status(400).json({ error }));
//     })
//     .catch(error => res.status(500).json({ error }));

// };

// exports.login = (req, res, next) => {
//     User.findOne({ email: req.body.email })
//     .then(user => {
//       if (!user) {
//         return res.status(401).json({ error: 'Utilisateur inconnu' });
//       }
//       bcrypt.compare(req.body.password, user.password)
//         .then(valid => {
//           if (!valid) {
//             return res.status(401).json({ error: 'Mot de passe incorrect !' });
//           }
//           res.status(200).json({
//             userId: user._id,
//             token: jwt.sign(
//                 { userId: user._id },
//                 TOKEN_SECRET,
//                 { expiresIn: '24h' }  
//             )

//           });
//         })
//         .catch(error => res.status(500).json({ error }));
//     })
//     .catch(error => res.status(500).json({ error }));

// };

// exports.logout = (req,res,next) => {
//   User.findOne({ email: req.body.email })
//     .then(user => {
//         res.status(200).json({
//           userId: user._id,
//           token: jwt.sign(
//               { userId: user._id },
//               TOKEN_SECRET,
//               { expiresIn: '1s' }  
//           )

//         });
//       })
//       .catch(error => res.status(500).json({ error }));
//     }



// // // const signInErrors  = require('../utils/errors.utils');

// // const createToken = (id) => {
// //   return jwt.sign({id}, process.env.TOKEN_SECRET, {
// //     expiresIn: maxAge
// //   })
// // };

// // module.exports.login = async (req, res) => {
// //   const { email, password } = req.body

// //   try {
// //     const user = await User.login(email, password);
// //     const token = createToken(user._id);
// //     res.cookie('jwt', token, { httpOnly: true, maxAge});
// //     res.status(200).json({ user: user._id})
// //   } catch (err){
// //     // const errors = signInErrors(err);
// //     res.status(200).json({ errors });
// //   }
// // }

// // module.exports.logout = (req, res) => {
// //   res.cookie('jwt', '', { maxAge: 1 });
// //   res.redirect('/');
// // }



const UserModel = require('../models/User');
const jwt = require('jsonwebtoken');
const { signUpErrors, loginErrors } = require('../errors/messages.errors');

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
  return jwt.sign({id}, process.env.TOKEN_SECRET, {
    expiresIn: maxAge
  })
};

exports.signUp =  (req, res,next) => {
  const {pseudo, email, password} = req.body

  try {
    const user = UserModel.create({pseudo, email, password });
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