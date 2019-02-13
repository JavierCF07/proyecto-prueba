'use strict'

var express = require('express');
var StudentController = require('../controllers/student');
//variable del servicio para autenticar
var md_auth = require('../middlewares/authenticated');

var multipary = require('connect-multiparty');
var md_upload = multipary({uploadDir: './uploads/students'});

var api = express.Router();

api.get('/pruebas-varias',md_auth.ensureAut,StudentController.pruebas);

api.get('/list',StudentController.listStudent);

api.post('/save-student',md_auth.ensureAut, StudentController.saveStudent);

module.exports = api;