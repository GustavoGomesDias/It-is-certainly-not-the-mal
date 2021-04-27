const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validations = require('../validations/validations');

const secret = 'iuaduiajsdjuisajodijoasidjio';

// GET
exports.getAllUsers = async (req, res) => {
    const users = await User.findAll();
    res.json(users)
    res.status(200);
}

exports.getUserById = async (req, res) => {
    const id = req.params.id;
    const user = await User.findById(id);

    if(user == undefined){
        res.status(404).json({ err: "Usuário não encontrado" });
    }else{
        res.json(user).status(200);
    }
}

// POST
exports.createNewUser = async (req, res) => {
    const { email, password, name } = req.body;

    if(!validations.validationEmail(email)){
        res.status(400).json({ err: "O e-mail deve seguir um formato parecido com 'exemplo@exemplo.com" });
        return;
    }

    if(validations.validationField(email)){
        res.status(400).json({ err: "Informações inválidas" });
        return;
    }
    
    if(validations.validationField(password)){
        res.status(400).json({ err: "Informações inválidas" });
        return;
    }
    
    if(validations.validationField(name)){
        res.status(400).json({ err: "Informações inválidas" });
        return;
    }

    
    if(email == "" || name == "" || password == ""){
        res.status(400).json({ err: "Informações inválidas" });
        return;
    }

    const verifyEmail = await User.findByEmail(email);

    if(verifyEmail){
        res.status(406).json({err: "E-mail já cadastrado." })
        return;
    }

    await User.newUser(email, password, name);
    res.status(200).json({ message: "Usuário cadastrado!" });
}

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user =  await User.getUserForEmail(email);

    if(user != undefined){
        const result = await bcrypt.compare(password, user.password);

        if(result){
            const token = jwt.sign({ id: user.id, emial: user.email, role: user.role }, secret);
            res.json({ token: token }).status(200);
        }else{
            res.json({ message: "Senha incorreta." }).status(200);
        }
    }else{
        res.json({ status: false, err: "Usuário não existe." }).status(406);
    }
}

// PUT
exports.edit = async (req, res) => {
    const id = req.params.id;
    const { email, name } = req.body;

    const result = await User.update(id, email, name);

    if(result != undefined){
        if(result.status){
            res.status(200).json({message: "Atualizações salvas com sucesso."});
        }else{
            res.status(406).json(result.err);
        }
    }else{
        res.status(406).json(result.err);
    }
    
}

// DELETE
exports.delete = async (req, res) => {
    const id = req.params.id;
    const result = await User.remove(id);

    if(result.status){
        res.status(200).json({ message: "Usuário deletado com sucesso" });
    }else{
        res.status(406).json(result.err);
    }
}