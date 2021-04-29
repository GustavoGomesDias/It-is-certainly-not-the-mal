const { Router } = require('express');
const router = Router();
const UserController = require("../controller/UserController");
const AnimeController = require('../controller/AnimeController');
const ListController = require("../controller/ListController");
const ListAnimeController = require('../controller/ListAnimeController');
const Auth = require('../middleware/Auth');

// User routes
router.get('/users', Auth.isAdmin, UserController.getAllUsers);
router.get('/users/:id', Auth.isAdmin, UserController.getUserById);
router.post('/users', UserController.createNewUser);
router.post('/users/login', UserController.login);
router.put('/users/:id', Auth.isLogged, UserController.edit);
router.delete('/users/:id', Auth.isLogged, UserController.delete);

// Anime routes
router.get('/animes', AnimeController.findAllAnimes);
router.get('/animes/:id', AnimeController.findAnimeById);
router.post('/animes', AnimeController.addNewAnime);
router.post('/animes/search', AnimeController.findAnimeByName);
router.put('/animes/:id', AnimeController.edit);
router.delete('/animes/:id', AnimeController.deleteAnime);

// Lists routes
router.get('/users/lists/:user_id', ListController.findAllListsByUserId);
router.get('/users/lists', ListController.findListByName);
router.post('/users/lists', ListController.createNewList);
router.delete('/users/lists/delete', ListController.deleteList);


// Lists_animes routes
router.get('/users/list/:list_id', ListAnimeController.findAllAnimesInList);
router.post('/users/list', ListAnimeController.addNewAnimeInList);

module.exports = router;