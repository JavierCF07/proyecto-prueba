'use strict'

var mongoose = require('mongoose');
var Schema  = mongoose.Schema;

var StudentSchema = Schema({
    name: String,
    career: String,
    identity: Number,
    teacher: {type: Schema.ObjectId, ref: 'Teacher'},
    imagen: String,
});

module.exports = mongoose.model('Student', StudentSchema);