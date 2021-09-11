const express = require("express");
const router = express.Router();
const login = require('../controller/authorization/login');
const logout = require('../controller/authorization/logout');
const register = require('../controller/authorization/register');
const isToken = require('../controller/authorization/isToken')
const {authRole} = require('../controller/authentication/auth');

router.post('/login', login);
router.post('/register',isToken,authRole("Staff"), register);
router.get('/logout',logout);

module.exports = router;
