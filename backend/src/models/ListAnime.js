const knex = require('../database/connection');

const findAllAnimes = async (list_id) => {
    try{
        const result = await knex
            .select(["id",  "name", "episodes", "seasons", "chapterManga", "image"])
            .from("animes")
            .join("lists_animes", function(){
                this.on('animes.id', '=', 'lists_animes.anime_id');
            })
            .where({ list_id: list_id });
        if(result.length == 1){
            return result[0];    
        }else if(result.length == 0){
            return undefined;
        }

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

const deleteAnime = async (list_id, anime_id) => {
    try{
        const anime = await findAnimeById(list_id, anime_id);
        if(anime != undefined){
            await knex
                .delete()
                .where({ list_id: list_id })
                .andWhere({ anime_id: anime_id })
                .table('lists_animes');
            return { status: true};
        }else{
            return {
                status: false,
                err: "Anime ou lista não existe."
            }
        }
    }catch(err){
        console.log(err);
        return { status: false, err: "Houve uma falha na deleção, tente novamente." }
    }
}

module.exports = {
    findAllAnimes,
    addAnime,
    deleteAnime
}