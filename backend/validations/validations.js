const { isEmail } = require('validator');

exports.validationField = (field) => {
    if(field == undefined){
        return true;
    }

    if(field == " "){
        return true;
    }

    if(field = ""){
        return true;
    }

    return false
}

exports.validationEmail = (email) => isEmail(email);

exports.validationPassword = (password) => {
    if(password.length < 3){
        return true;
    }
    return false;
}