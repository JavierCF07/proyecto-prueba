'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TeacherSchema = Schema({
    name: String,
    surname: String,
    email: String,
    imagen: String,
    password: String,
    role: String

});

module.exports = mongoose.model('Teacher', TeacherSchema);