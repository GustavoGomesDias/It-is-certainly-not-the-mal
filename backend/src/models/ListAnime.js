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

const findAnimeById = async (list_id, anime_id) => {
    const result = await knex
        .select('*')
        .where({ list_id: list_id })
        .andWhere({ anime_id: anime_id })
        .table('lists_animes');
    
    if(result.length > 0){
        return true;
    }else{
        return false;
    }
    
}

const addAnime = async (list_id, anime_id) => {
    try{

        const verify = await findAnimeById(list_id, anime_id);

        if(!verify){
            await knex
                .insert({ list_id, anime_id })
                .table("lists_animes");
    
            return true;
        }else{
            return false;
        }

    }catch(err){
        console.log(err);
        return false;
    }
}

module.exports = {
    findAllAnimes,
    addAnime,
}