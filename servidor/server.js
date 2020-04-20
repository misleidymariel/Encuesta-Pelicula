
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');


let competenciaController = require("./controladores/competencias");

var app = express();

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());


app.get('/competencias', competenciaController.cargarCompetencias);
app.get('/competencias/:id/peliculas', competenciaController .obtenerDosPeliculas);


var puerto = '8080';
app.listen(puerto, function () {
  console.log( "Escuchando en el puerto " + puerto );
});