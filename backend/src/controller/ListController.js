const List = require('../models/List');
const { validationField } = require('../validations/validations');

const findAllListsByUserId = async (req, res) => {
    const user_id = req.params.user_id;
    
    const lists = await List.findAllByUserId(user_id);
    
    if(lists != undefined || lists.length > 0){
        res.status(200).json(lists);
    }else{
        res.status(404).json(lists.err);
    }

}

const findListByName = async (req, res) => {
    const { user_id, name } = req.body;

    const lists = await List.findListByName(user_id, name);

    if(lists == undefined){
        res.status(404).json({ err: "Nenhum item encontrado." });
    }else{
        res.status(200).json(lists);
    }
}

const createNewList = async (req, res) => {
    const { user_id, name } = req.body;

    if(validationField(name)){
        res.status(400).json({ err: "Informações inválidas" });
        return;
    }

    await List.createNewList(user_id, name);
    res.status(200).json({ message: "Lista criada com sucesso." });
}

const deleteList = async (req, res) => {
    const id = req.body.id;
    const result = await List.deleteList(id);
    if(result.status){
        res.status(200).json({ message: "A lista foi deletada." });
    }else{
        res.status(406).json(result.err);
    }
}

module.exports = {
    findAllListsByUserId,
    findListByName,
    createNewList,
    deleteList
}