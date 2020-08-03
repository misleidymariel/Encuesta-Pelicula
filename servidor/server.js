
var cors = require('cors');
var express = require('express');
var bodyParser = require('body-parser');
const morgan = require('morgan');
var path = require('path');


let competenciaController = require("./controladores/competencias");
let votosController = require("./controladores/voto");
let resultadosController = require("./controladores/resultados");
let crearCompetenciaController = require("./controladores/competencias");
let generoController = require("./controladores/competencias");
let directoresController = require("./controladores/competencias")
let actoresController = require('./controladores/competencias');
let editarCompetenciaController = require('./controladores/competencias')
let eliminarCompetenciaController = require('./controladores/competencias')


var app = express();
app.use(cors());
app.use(morgan('combined'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var clientPath = path.join(__dirname, '../cliente');
app.use('/cliente', express.static(clientPath));


app.get('/competencias', competenciaController.cargarCompetencias);
app.get('/competencias/:competenciaId', competenciaController.obtenerCompetencia);
app.get('/competencias/:id/peliculas', competenciaController .obtenerDosPeliculas);
app.post('/competencias/:competenciaId/votos', votosController.recibirVotos);
app.get('/competencias/:id/resultados', resultadosController.resultadoCompetencia); 
app.post('/competencias', crearCompetenciaController.crearCompetencia);
app.delete('/competencias/:competenciaId/votos',votosController.eliminarVotos)
app.get('/generos/', generoController.cargarGeneros);
app.get('/directores', directoresController.cargarDirectores);
app.get('/actores', actoresController.cargarActores);
app.put('/competencias/:competenciaId', editarCompetenciaController.editarCompetencia);
app.delete('/competencias/:competenciaId', eliminarCompetenciaController.eliminarCompetencia)


var puerto = '8080';
app.listen(puerto, function () {
  console.log( "Escuchando en el puerto " + puerto );
});