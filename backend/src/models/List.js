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

const findListById = async (id) => {
    try{
        const result = await knex
            .select(['id', 'name'])
            .where({ id: id })
            .table('lists');
        if(result.length > 0){
            return result[0];
        }else{
            return undefined;
        }
    }catch(err){
        return { err: err, retulst: [] };
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

const deleteList = async (id) => {
    try{
        const user = await findListById(id);
        if(user != undefined){
            await knex
                .delete()
                .where({ id: id })
                .table('lists');
            return { status: true };
        }else{
            return { status: false, err: "Lista não existe" };
        }
    }catch(err){
        console.log(err);
        return { status: false, err: "Houve uma falha na deleção, tente novamente." }
    }
}

module.exports = {
    findAllByUserId,
    createNewList,
    findListByName,
    findListById,
    deleteList
}