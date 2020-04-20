var Database = require('../lib/conexionBaseD');
var config = require('../lib/config');

var database = new Database(config);

function cargarCompetencias(req, res) {

    database.query('SELECT * FROM competencia;').then( rows => {
        res.send(rows);
    });

    return res;

};

function obtenerDosPeliculas(req , res){

    var id = req.params.id;
    console.log(id);
    var peliculas;
    var competencia;
    var promise = database.query('select *, RAND() as random from pelicula order by random desc limit 2;');
    promise.then( peliculasRows => {
        peliculas = peliculasRows;
        var query = 'select * from competencia where id = ?'
        return database.query(query, id);
    }).then( competenciaRow => {
        competencia = competenciaRow[0].nombre;
    }).then(() => {
        var opciones = { peliculas, competencia };
        res.send(opciones);
    });

    return res;
}


module.exports.cargarCompetencias = cargarCompetencias
module.exports.obtenerDosPeliculas = obtenerDosPeliculas