const express = require('express');
const app = express();
const router = express.Router();
const UserController = require("../controller/UserController");

router.get('/users', UserController.getAllUsers);
router.get('/users/:id', UserController.getUserById);

module.exports = router;