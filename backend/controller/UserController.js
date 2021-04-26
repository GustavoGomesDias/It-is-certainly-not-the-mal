const User = require("../models/User");

exports.getAllUsers = async (req, res) => {
    const users = await User.findAll();
    res.json(users)
    res.status(200);
}

exports.getUserById = async (req, res) => {
    const id = req.params.id;
    const user = await User.findById(id);

    if(user == undefined){
        res.status(404);
        res.json({ message: "Usuário não encontrado" });
    }else{
        res.json(user).status(200);
    }
}