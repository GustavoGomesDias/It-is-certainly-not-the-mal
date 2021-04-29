const Anime = require('../models/Anime');
const { validationField } = require('../validations/validations');
const { isURL } = require('validator');

const findAllAnimes = async (req, res) => {
    const animes = await Anime.findAll();

    res.status(200).json(animes);
}

const findAnimeById = async (req, res) => {
    const id = req.params.id;

    const anime = await Anime.findByid(id);
    if(anime == undefined){
        res.status(404).json({ err: "Anime não encontrado" });
    }else{
        res.json(anime).status(200);
    }
    
}

const findAnimeByName = async (req, res) => {
    const name = req.body.name;

    const anime = await Anime.findByName(name);
    if(anime == undefined){
        res.status(404).json({ err: "Anime não encontrado" });
    }else{
        res.json(anime).status(200);
    }
    
}

const addNewAnime = async (req, res) => {
    const { name, episodes, seasons, chapterManga, image } = req.body;

    if(validationField(name)){
        res.status(400).json({ err: "Informações inválidas" });
        return;
    }

    if(validationField(episodes)){
        res.status(400).json({ err: "O número de episódios é requerida." });
        return;
    }

    if(validationField(seasons)){
        res.status(400).json({ err: "O números de temporadas do anime é requerida." });
        return;
    }

    if(!isURL(image)){
        res.status(400).json({ err: "Imagem é requerida (deve ser um url)." });
        return;
    }

    const verifyAnime = await Anime.findName(name);
    if(verifyAnime){
        res.status(406).json({err: "Anime já cadastrado." })
        return;
    }

    await Anime.addNew(name, episodes, seasons, chapterManga, image);
    res.status(200).json({ message: "Anime cadastrado!" });
}

const edit = async (req, res) => {
    const id = req.params.id;
    const { episodes, seasons, chapterManga, image } = req.body;

    const result = await Anime.update(id, episodes, seasons, chapterManga, image);

    if(result != undefined){
        if(result.status){
            res.status(200).json({ message: "Atualização feita com sucesso." });
        }else{
            res.status(406).json(result.err);
        }
    }else{
        res.status(406).json(result.err)
    }
}

const deleteAnime = async (req, res) => {
    const id = req.params.id;
    const result = await Anime.remove(id);
    if(result.status){
        res.status(200).json({ message: "Anime deletado com sucesso" })
    }else{
        res.status(406).json(result.err);
    }
}

module.exports = {
    findAllAnimes,
    addNewAnime,
    findAnimeById,
    findAnimeByName,
    edit,
    deleteAnime
}