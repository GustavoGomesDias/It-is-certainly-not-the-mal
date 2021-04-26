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