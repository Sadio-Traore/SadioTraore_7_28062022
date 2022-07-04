const passwordSchema = require('../models/Password');

module.exports = (req, res, next) => {
    if (!passwordSchema.validate(req.body.password)) {
        res.status(400).json({ message: 'Votre mot de passe doit contenir entre 5 et 15 caractères, dont au moins une majusccule, une minuscule, un chiffre et un caratère spécial' });
    } else {
        next();
    }
};