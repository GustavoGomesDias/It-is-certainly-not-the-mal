const ListAnime = require('../models/ListAnime');

const findAllAnimesInList = async (req, res) => {
    const list_id = req.params.list_id;

    const animes = await ListAnime.findAllAnimes(list_id);

    if(animes != undefined){
        res.status(200).json(animes);
    }else{
        res.status(404).json({ message: "Não há animes nesta lista." });
    }
}


const addNewAnimeInList = async (req, res) => {
    const { list_id, anime_id } = req.body;

    const result = await ListAnime.addAnime(list_id, anime_id);

    if(result){
        res.status(200).json({ message: "Anime adionado a lista." });
    }else{
        res.status(406).json({ err: "O anime já está na lista." });
    }
    
}

module.exports = {
    findAllAnimesInList,
    addNewAnimeInList
}