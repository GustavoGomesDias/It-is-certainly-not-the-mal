const jwt = require('jsonwebtoken');
const { secret } = require('../.env/secrets');
const { validationField } = require('../validations/validations')


const isLogged = (req, res, next) => {
    const authToken = req.headers['authorization'];

    if(!validationField(authToken)){
        const bearer = authToken.split(' ');
        const token = bearer[1];

        try{
            const decoded = jwt.verify(token, secret);

            if(decoded.isLogged){
                next();
            }
        }catch(err){
            res.status(403).json({ err: "Você não está logado" });
        }
    }else{
        res.status(403).json({err: "Você não está autenticado."});
    }

}

const isAdmin = (req, res, next) => {
    const authToken = req.headers['authorization'];
    
    if(!validationField(authToken)){
        const bearer = authToken.split(' ');
        const token = bearer[1];

        try{
            const decoded = jwt.verify(token, secret);

            if(decoded.role == 1){
                next();
            }
        }catch(err){
            res.status(403).json({ message: "Você não tem permissão para isso." });s
        }
    }else{
        res.status(403).json({err: "Você não está autenticado."});
    }
}

module.exports = {
    isLogged,
    isAdmin
}