exports.validationField = (field) => {
    if(field == undefined){
        return true;
    }

    if(field == " "){
        return true;
    }

    if(field == ""){
        return true;
    }
    if(field == 0){
        return true;
    }

    return false
}

exports.validationPassword = (password) => {
    if(password.length < 3){
        return true;
    }
    return false;
}