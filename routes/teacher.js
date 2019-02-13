'use strict'

var express = require('express');
var TeacherController = require('../controllers/teacher');
var md_auth = require('../middlewares/authenticated');

var multipary = require('connect-multiparty');
var md_upload = multipary({uploadDir: './uploads/teachers'});

var api = express.Router();

api.get('/prueba-controlador',md_auth.ensureAut, TeacherController.pruebas);

api.post('/guardar-profesor', TeacherController.saveTeacher);

api.post('/login',TeacherController.loginteacher);

api.get('/listar',TeacherController.listLogin);

api.put('/update-teacher/:id',md_auth.ensureAut, TeacherController.updateTeacher);

api.put('/delete/:id',md_auth.ensureAut,TeacherController.deleteTeacher);

api.post('/imagen/:id',[md_auth.ensureAut,md_upload],TeacherController.uploadImagen);

api.get('/obtenerimagen/:imageFile',TeacherController.getImagen);

module.exports = api;