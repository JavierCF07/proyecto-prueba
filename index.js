/*var http = require('http');

http.createServer(function(req, res){

res.writeHead(200, {'Content-Type': 'text/html' });

res.end('Hola Mundo');
}).listen(3000);

console.log('El servidor esta corriendo');*/

'user strict'

var app = require('./app');
var mongoose = require('mongoose');
var port = process.env.port || 3689;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Ejemplo',{useNewUrlParser:true})

.then((err,res) =>{
    console.log('Conexion a la base de datos realizada correctamente');

    app.listen(port, () =>{
        console.log("El servidor local de Node y Express estan corriendo exitosamente");
    })
})

.catch(err => console.log(err));