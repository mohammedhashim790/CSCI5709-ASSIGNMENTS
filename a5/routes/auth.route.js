const express = require('express');
const auth_router = express.Router();
const authController = require('../controllers/auth.controller');

auth_router.post('/register', authController.register);
auth_router.post('/login', authController.login);

module.exports = {
    auth_router
};
