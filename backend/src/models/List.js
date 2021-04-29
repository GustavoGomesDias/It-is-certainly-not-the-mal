const knex = require('../database/connection');
const validations = require('../validations/validations');

const findAllByUserId = async (user_id) => {
    try{
        const result = knex
            .select(["id", "name"])
            .where({ user_id: user_id })
            .table("lists");

        return result;
    }catch(err){
        return undefined;
    }
}

const createNewList = async (user_id, name) => {
    try{
        await knex
        .insert({ user_id, name })
        .table("lists");
    }catch(err){
        console.log(err);
        return err;
    }
}

const findListByName = async (user_id, name) =>{
    try{
        const result = await knex
            .select("*")
            .where({ user_id: user_id })
            .andWhere('name', 'like', `%${name}%`)
            .table('lists');
        if(result.length > 1){
            return result;
        }else if(result.length == 1){
            return result[0];
        }else{
            return undefined;
        }
    }catch(err){
        console.log(err);
        return { err: err, result: [] };
    }
}

module.exports = {
    findAllByUserId,
    createNewList,
    findListByName
}