'use strict'

var Student = require('../models/student');
var bcrypt = require('bcrypt-nodejs');

var jwt = require('../services/jwt');
var multipary = require('connect-multiparty');

var fs = require('fs');
var path = require('path');

function pruebas(req,res){
    res.status(200).send({
        message: 'Probando el controlador',
        teacher: req.teacher
    });
}

function saveStudent(req,res){
    var student = new Student();
    var params = req.body;

    if(params.name && params.identity && params.career){
    student.name = params.name;
    student.career = params.career;
    student.identity = params.identity;
    student.imagen = null;
    student.teacher = req.teacher.sub;
    
    
    student.save((err, studentSave)=>{
        if(err){
            res.status(500).send({message: 'No se han guardado los datos del estudiante'})
        }else{
            if(!studentSave){
            res.status(500).send({message: 'Error al guardar el estudiante'});
            }else{
                res.status(200).send({student: studentSave,teacher: req.teacher});
            }
        }
    });
}else{
    res.status(404).send({message: 'Debe introducir los campos requeridos'})    
}
}

function listStudent(req, res){
    Student.find({},(err, student)=>{
        if(err){
            res.status(500).send({message: 'No se ha podido listar los estudiantes'});
        }else{
            res.status(200).send({student,teacher: req.teacher});
        }
    });
}


module.exports ={
    pruebas,
    listStudent,
    saveStudent
};