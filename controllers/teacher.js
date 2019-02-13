'use strict'

var Teacher = require('../models/teacher');
var bcrypt = require('bcrypt-nodejs');

var jwt = require('../services/jwt');
var multiparty = require('connect-multiparty');

var fs=require('fs');
var path = require('path');

function saveTeacher(req,res){
    var teacher = new Teacher();
    var params = req.body;

    /*console.log(params);*/

    if(params.password && params.name && params.surname && params.email){
    teacher.name = params.name;
    teacher.surname = params.surname;
    teacher.email = params.email;
    teacher.role = params.role;
    teacher.role = 'ROLE_TEACHER';
    teacher.imagen = null;

    Teacher.findOne({email: teacher.email.toLowerCase()}, (err, issetteacher) =>{

        if(err){
            res.status(500).send({message: 'Error, el usuario no existe'});
        }else{
            if(!issetteacher){
                /*res.status(200).send({message: 'Error de contraseña (AUI VA EL CIFRADO Y COMPARACION DE CONTRASEÑA)'});*/
                bcrypt .hash(params.password,null,null,function(err,hash){
                    teacher.password = hash;
            
                    teacher.save((err, teacherStored) => {
                        if(err){
                            res.status(500).send({message: 'Error al guardar el usuario'});
                        }else{
                            if(!teacherStored){
                                res.status(404).send({message: 'No se ha podido registrar el usuario'});
                            }else{
                                res.status(200).send({teacher: teacherStored});
                            }
                        }
                    });
                });
            }else{
                res.status(200).send({message: 'El usuario no puede registrarse'});
            }
        }
    });

}else{
    res.status(200).send({message: 'Introduce los datos correctamente'});
}
}

//login usuario
function loginteacher(req,res){
    var params = req.body;
    var email = params.email;
    var password = params.password;

    Teacher.findOne({email: email.toLowerCase()},(err, teacher) => {
        if(err){
            res.status(500).send({message: 'Error al intentar iniciar sesión'});
        }else{
            if(teacher){
                bcrypt.compare(password, teacher.password, (err, check) => {
                    if(check){
                        if(params.gettoken){
                            res.status(200).send({
                               token: jwt.createToken(teacher) 
                            });
                        }else{
                        res.status(200).send({teacher});
                    }
                    }else{
                        res.status(404).send({message: 'El usuario no ha podido loguearse correctamente'});
                    }
                });
            }else{
                res.status(404).send({message: 'No se ha podido encontrar al usuario'});
            }
        }
    });
    /*res.status(200).send({message: 'método de login'})*/
}

function listLogin(req, res){
    Teacher.find({},(err,teacher)=>{
        if(err){
            res.status(500).send({message:'No se ha podido enlistar los teachers'});
        }else{
            res.status(200).send(teacher);
       }
    });
}

    //res.status(200).send({message:'Usuario listado'});

function pruebas(req, res){
    res.status(200).send({
        message: 'Probando el controlador del teacher',
        teacher: req.teacher
    });
}

function updateTeacher(req, res){
    var teacherID = req.params.id;
    var update = req.body;

    if(teacherID != req.teacher.sub){
        res.status(500).send({message: 'No tiene permiso para actualizar el profesor'});
    }

    Teacher.findByIdAndUpdate(teacherID,update, {new:true}, (err, teacherUpdate) =>{
        if(err){
            res.status(500).send({message: 'Error al actualizar el profesor'});
        }else{
            if(!teacherUpdate){
                res.status(404).send({message:'No se ha podido actualizar el profesor'});
            }else{
                res.status(200).send({teacher: teacherUpdate});
            }
        }
    });
}

function deleteTeacher(req, res){
    var tID = req.params.id;
    

    Teacher.findByIdAndDelete({_id: tID},(err, tID)=>{
        if(err){
            res.status(500).send({message: 'Error al eliminar el profesor'});
        }else{
            if(!tID){
                res.status(404).send({message:'No se ha podido eliminar el profesor'});
            }else{
                res.status(200).send({message: 'Profesor eliminado correctamente'});
            }
        }
    });
}

function uploadImagen(req,res){
    //res.status(200).send({message:'Si funciona uploadImagen'});
    var teacherid = req.params.id;
    var file_name = 'Archivo no subido';

    if(req.files){
        var file_path = req.files.imagen.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];

        var ext_explit = file_name.split('\.');
        var file_ext = ext_explit[1];

        if(file_ext == 'png' || file_ext == 'jpg' || file_ext =='jpge' || file_ext == 'gif'){
            if(teacherid != req.teacher.sub){
                res.status(500).send({message: 'No tiene permiso para modificar el usuario'});
            }
            Teacher.findByIdAndUpdate(teacherid, {imagen: file_name}, {new:true},(err, teacherUpdate)=>{
                if(err){
                    res.status(500).send({
                        message:'Error al actualizar el usuario'});
                }else{
                    if(!teacherUpdate){
                        res.status(404).send({
                            message:'No se ha podido actualizar el usuario'});
                    }else{
                        res.status(200).send({teacher: teacherUpdate, imagen: file_name});
                    }
                }
            });
        }else{
            //res.status(200).send({message: 'Extensión no admitida'});
            fs.unlink(file_path,(err)=>{
            if(err){
                res.status(200).send({message:'Extensión no admitida, el archivo no se ha eliminado'});
            }else{
                res.status(200).send({message:'Extensión no admitida, archivo eliminado'});
            }    
        });    
    }

       /*res.status(200).send({
            file_path: file_path,
            file_split: file_split,
            file_name: file_name
        });*/
    }else{
        res.status(404).send({message: 'No se han subido archivos'});
    }
}

function getImagen(req, res){
    var imageFile = req.params.imageFile;
    var path_file = './uploads/teachers/'+imageFile;

    fs.exists(path_file,function(exists){
        if(exists){
            res.sendFile(path.resolve(path_file))
        }else{
            res.status(404).send({message: 'El archivo no existe'});
        }
    });
    //res.status(200).send({message: 'satisfactorio'});
}

module.exports = {
    pruebas,
    saveTeacher,
    loginteacher,
    listLogin,
    updateTeacher,
    deleteTeacher,
    uploadImagen,
    getImagen
};