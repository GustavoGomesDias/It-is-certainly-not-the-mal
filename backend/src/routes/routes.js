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
router.get('/animes', Auth.isLogged, AnimeController.findAllAnimes);
router.get('/animes/:id', Auth.isLogged, AnimeController.findAnimeById);
router.post('/animes', Auth.isLogged, AnimeController.addNewAnime);
router.post('/animes/search', AnimeController.findAnimeByName);
router.put('/animes/:id', Auth.isLogged, AnimeController.edit);
router.delete('/animes/:id', Auth.isLogged, AnimeController.deleteAnime);

// Lists routes
router.get('/users/lists/:user_id', Auth.isLogged, ListController.findAllListsByUserId);
router.get('/users/lists', Auth.isLogged, ListController.findListByName);
router.post('/users/lists', Auth.isLogged, ListController.createNewList);
router.delete('/users/lists/delete', Auth.isLogged, ListController.deleteList);

// Lists_animes routes
router.get('/users/list/:list_id', Auth.isLogged, ListAnimeController.findAllAnimesInList);
router.post('/users/list', Auth.isLogged, ListAnimeController.addNewAnimeInList);
router.delete('/users/list/delete', Auth.isLogged, ListAnimeController.deleteAnimeFromList);

module.exports = router;