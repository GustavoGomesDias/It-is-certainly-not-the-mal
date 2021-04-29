const knex = require('../database/connection');

const findAllAnimes = async (list_id) => {
    try{
        const result = knex
            .select(["id",  "name", "episodes", "seasons", "chapterManga", "image"])
            .from("animes")
            .join("lists_animes", function(){
                this.on('animes.id', '=', 'lists_animes.anime_id');
            })
            .where({ list_id: list_id });
        return result;
    }catch(err){
        console.log(err)
        return undefined;
    }
}

const addAnime = async (list_id, anime_id) => {
    try{
        await knex
            .insert({ list_id, anime_id })
            .table("lists_animes");

        return true;
    }catch(err){
        console.log(err);
        return false;
    }
}

module.exports = {
    findAllAnimes,
    addAnime,
}