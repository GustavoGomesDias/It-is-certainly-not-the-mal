const { Router } = require('express');
const router = Router();
const UserController = require("../controller/UserController");
const Auth = require('../middleware/Auth');

// User routes
router.get('/users', Auth.isAdmin, UserController.getAllUsers);
router.get('/users/:id', Auth.isAdmin, UserController.getUserById);
router.post('/users', UserController.createNewUser);
router.post('/users/login', UserController.login);
router.put('/users/:id', Auth.isLogged, UserController.edit);
router.delete('/users/:id', Auth.isLogged, UserController.delete);

module.exports = router;