'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta_del_proyecto';

exports.ensureAut = function(req, res,next){
    if(!req.headers.authorization){
        return res.status(404).send({message: 'La petición de la cabecera no tiene autorización'});
    }
    var token = req.headers.authorization.replace(/['"]+/g,'');
    try{
        var payload = jwt.decode(token, secret);
        if(payload.exp <= moment ().unix()){
            return res.status(404).send({
                message: 'El token a expirado'
            });
        }
    }
    catch(exp){
        return res.status(404).send({message: 'El token no es valido'});
    }
    req.teacher = payload;

    next();
}