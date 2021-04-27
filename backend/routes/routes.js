const express = require('express');
const app = express();
const router = express.Router();
const UserController = require("../controller/UserController");

// User routes
router.get('/users', UserController.getAllUsers);
router.get('/users/:id', UserController.getUserById);
router.post('/users', UserController.createNewUser);
router.post('/users/login', UserController.login);
router.put('/users/:id', UserController.edit);

module.exports = router;