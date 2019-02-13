'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//Cargar rutas
var teacher_routes = require('./routes/teacher');
var student_routes = require('./routes/student');
//Middleware de body parser

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Rutas del body parser

app.get('/prueba',(req, res)=>{
    res.status(200).send({message: 'Probando nuestro servidor'})
});

//rutas
app.use('/v1',teacher_routes);
app.use('/v2',student_routes);

//Cors
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});

module.exports = app;