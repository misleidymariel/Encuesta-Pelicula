var Database = require('../lib/conexionBaseD');
var config = require('../lib/config');

var database = new Database(config);

function cargarCompetencias(req, res) {

    database.query('SELECT * FROM competencia;').then(rows => {
        res.send(rows);
    });

    return res;

};

function obtenerDosPeliculas(req, res) {

    var id = req.params.id;
    var peliculas;
    var competencia;
    var query = 'select * from competencia where id = ?'
    var promise = database.query(query, id);
    
    promise.then(competenciaRow => {
        
        if(competenciaRow.length == 0) {
            var message = `No existe competenica con el id ${id}`;
            return new Promise(( resolve, reject ) => {
                var error = {status: 404, message }
                reject(error);
            });
        }

        competencia = competenciaRow[0].nombre;
        var query = 'select * from competencia where id = ?'
        query = 'select *, RAND() as random from pelicula order by random desc limit 2;';
        return database.query(query);
    }).then(peliculasRows => {
        peliculas = peliculasRows;
    }).then(() => {
        var opciones = { peliculas, competencia };
        res.send(opciones);
    }).catch(error => {
        res.status(error.status).send(error);
    });

    return res;
}


module.exports.cargarCompetencias = cargarCompetencias
module.exports.obtenerDosPeliculas = obtenerDosPeliculas