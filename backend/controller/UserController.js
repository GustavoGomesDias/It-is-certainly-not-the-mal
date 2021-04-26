const User = require("../models/User");

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