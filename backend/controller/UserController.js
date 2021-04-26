const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

    

    if(email == undefined || name == undefined || password == undefined){
        res.status(400).json({ err: "Informações inválidas" });
        return;
    }
    if(email == "" || name == "" || password == ""){
        res.status(400).json({ err: "Informações inválidas" });
        return;
    }
    
    if(email == undefined || name == undefined || password == undefined){
        res.status(400).json({ err: "Informações inválidas" });
        return;
    }

    if(email == " " || name == " " || password == " "){
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