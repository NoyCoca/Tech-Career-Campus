const express = require("express");
const router = express.Router();
const ADMIN = process.env.ADMIN;
const login = require('../controller/authorization/login');
const logout = require('../controller/authorization/logout');
const register = require('../controller/authorization/register');
const isToken = require('../controller/authorization/isToken')
const {authRole} = require('../controller/authentication/auth');


const upload = require('../middleware/upload');

router.post('/login', login);
router.post('/register',isToken,authRole(ADMIN),upload.single('profileImg'), register);
router.get('/logout',logout);

module.exports = router;
