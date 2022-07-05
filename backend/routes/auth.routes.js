const express = require('express');
const router = express.Router();
const authCtrl = require("../controllers/auth.controller");
const password = require("../middleware/password.middleware")



router.post('/signUp', password, authCtrl.signUp);
router.post('/login', authCtrl.login);
router.get('/logout', authCtrl.logout);

module.exports = router; 