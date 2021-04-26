const knex = require('../database/connection');
const bcrypt = require('bcrypt');
const validation = require('../validations/validations');

// GET
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

// Para ser usado internamente
exports.findByEmail = async (email) => {
    try{
        const result = await knex
            .select("email")
            .where({ email: email })
            .table('users');

        if(result.length > 0){
            return true;
        }else{
            return false;
        }
    }catch(err){
        return true;
    }
}

// POST
exports.newUser = async (email, password, name) => {
    try{
        const hash = await bcrypt.hash(password, 10);
        await knex.insert({ email, password: hash, name, role: 0 }).table('users');
    }catch(err){
        return undefined;
    }
}

exports.getUserForEmail = async (email) => {
    try{
        const result = await knex
            .select(["id", "email", "name", "password", "role"])
            .where({email: email})
            .table("users");
        if(result.length > 0){
            return result[0];
        }else{
            return undefined;
        }
    }catch(err){
        return []
    }
}

// PUT
exports.update = async (id, email, name) => {
    const user = await this.findById(id);
    let edit = {};

    if(user != undefined){
        if(email != undefined){
            const result = await this.findByEmail(email);
            if(!result){
                edit.email = email;
            }
        }else{
            return { status: false, err: "E-mail já cadastrado" };
        }

        if(validation.validationField(name)){
            edit.name = name;   
        }
    
        if(validation.validationField(role)){
            edit.role = role;
        }

        try{
            await knex
                .update(edit)
                .where({ id: id })
                .table("users");

                return { status: true }
        }catch(err){
            return { status: false, err: err };
        }
    }else{
        return { status: false, err: "Usuário não encontrado." }
    }
}