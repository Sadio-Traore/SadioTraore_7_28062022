const express = require('express');
const router = express.Router();
const authCtrl = require("../controllers/auth.controller");
const password = require("../middleware/password.middleware")



router.post('/signup', password, authCtrl.signup);
router.post('/login', authCtrl.login);

module.exports = router; 