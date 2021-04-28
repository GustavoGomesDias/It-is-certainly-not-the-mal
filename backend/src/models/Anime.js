const knex = require('../database/connection');
const { validationField } = require('../validations/validations');

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


module.exports = {
    findAll,
    addNew,
    findName,
    findByid,
    findByName
}