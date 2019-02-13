'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta_del_proyecto';

exports.createToken = function(teacher){
    var payload = {
        sub: teacher._id,
        name: teacher.name,
        surname: teacher.surname,
        email: teacher.email,
        role: teacher.role,
        image: teacher.image,
        iat: moment().unix,
        exp: moment().add(30, 'days').unix
    };
    return jwt.encode(payload, secret);
}