const knex = require('../database/connection');

exports.findAll = async () => {
    try{
        const result = await knex.select(["id", "email", "name", "role"]).table('users');
        return result;
    }catch(err){
        return { err: err, result: [] };
    }
}


exports.findById = async (id) => {
    try{
        const result =  await knex
            .select(["id", "email", "name", "role"])
            .where({ id: id })
            .table('users');
        if(result.length > 0){
            return result[0]
        }else{
            return undefined;
        }
        
    }catch(er){
        return { err: err, result: [] };
        
    }
}