const knex = require('../database/connection');
const { validationField } = require('../validations/validations');
const { isURL } = require('validator');

const findAll = async () => {
    try{
        const result = await knex.select(["id", "name", "episodes", "seasons", "chapterManga", "image"]).table('animes');
        return result;
    }catch(err){
        return { err: err, result: [] };
    }
}

const findByid = async (id) => {
    try{
        const result = await knex
            .select(["id", "name", "episodes", "seasons", "chapterManga", "image"])
            .where({ id: id })
            .table('animes');
        if(result.length > 0){
            return result[0];
        }else{
            return undefined;
        }
    }catch(err){
        return { err: err, result: [] };
    }
}

const findByName = async (name) => {
    try{
        // select * from `users` where `columnName` like '%rowlikeme%'
        const result = await knex
            .select("*")
            .where('name', 'like',`%${name}%`)
            .table('animes');
        if(result.length > 1){
            return result;
        }else if(result.length == 1){
            return result[0];
        }else{
            return undefined;
        }
    }catch(err){
        return { err: err, result: [] };
    }
}

const findName = async (name) => {
    try{
        const anime = await knex
            .select("name")
            .where({ name: name })
            .table('animes');

        if(anime.length > 0){
            return true;
        }else{
            return false;
        }
    }catch(err){
        return true;
    }
    
}

const addNew = async (name, episodes, seasons, chapterManga = 0, image) => {
    try {
        if(validationField(chapterManga)){
            chapterManga = 0;
        }

        await knex.insert({ name, episodes, seasons, chapterManga, image }).table("animes");
    }catch(err){
        console.log(err)
        return err;
    }
}

const update = async (id, episodes, seasons, chapterManga, image) => {
    const anime = await findByid(id);

    let edit = {};
    if(anime != undefined){
        if(!validationField(episodes)){
            edit.episodes = episodes;
        }

        if(!validationField(seasons)){
            edit.seasons = seasons;
        }

        if(!validationField(chapterManga)){
            edit.chapterManga = chapterManga;
        }

        if(!validationField(image) && isURL(image)){
            edit.image = image;
        }

        try{
            await knex
                .update(edit)
                .where({ id: id })
                .table("animes");
            return { status: true };
        }catch(err){
            return { status: false, err: err };
        }
    }else{
        return { status: false, err: "Anime não encontrado." };
    }

}

const remove = async (id) => {
    try{
        const user = await findByid(id);
        if(user != undefined){
            await knex
                .delete()
                .where({ id: id })
                .table("animes");
            return { status: true };
        }else{
            return { status: false, err: "Usuário não existe." };
        }
    }catch(err){
        return { status: false, err: "Usuário não existe." }
    }
}

module.exports = {
    findAll,
    addNew,
    findName,
    findByid,
    findByName,
    update,
    remove
}