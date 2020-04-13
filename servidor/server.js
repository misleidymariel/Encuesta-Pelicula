
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');


var competenciaController = require("./controladores/competencias");

var app = express();

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

var puerto = '8080';


app.get('/competencias', competenciaController.cargarCompetencias);

app.listen(puerto, function () {
  console.log( "Escuchando en el puerto " + puerto );
});