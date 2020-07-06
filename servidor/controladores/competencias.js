var Database = require('../lib/conexionBaseD');
var config = require('../lib/config');
var logger = require('../lib/logger');
var { SqlUtil, Conditional } = require('../lib/sql');

const deshabilitadoStatus = 'Desabilitado'
const habilitadoStatus = 'Habilitado'

var database = new Database(config);

function cargarCompetencias(req, res) {

    database.query(`SELECT * FROM competencia WHERE status = '${habilitadoStatus}';`).then(rows => {
        res.send(rows);
    });
}

function obtenerCompetencia(req, res) {
    let id = req.params.idCompetencia;
    let query = 'SELECT * FROM competencia WHERE id = ?'
    database.query(query, [id])
    .then(rows => {
        res.send(rows);
    }).catch(error => {
        logger.error(error);
        res.status(404).send(error);
    });
}


function crearCompetencia (req, res){
    
    let nombre = req.body.nombre;
    let genero = req.body.genero;
    let director = req.body.director;
    let actor = req.body.actor;
    //
    console.log(director)
    console.log(genero);
    console.log(actor);
    let queryActualiza = 'UPDATE competencia SET status = ? WHERE nombre = ? AND status = ?'
    let query = "INSERT INTO `competencia` (nombre, genero_id, director_id ,actor_id) VALUES ( ?, ? , ?, ?)"

    var promise = database.query(queryActualiza, [habilitadoStatus, nombre, deshabilitadoStatus]);

    promise.then( rows => {
        if(rows.affectedRows == 1) {
            res.status(201).send(nombre);
            return new Promise(( resolve, reject ) => {
                resolve(nombre);
            });
        }

        return database.query(query, [nombre, genero, director, actor]);//
    }).then(rows => {
        res.status(201).send(nombre);
    }).catch(error => {
        if (error.code == 'ER_DUP_ENTRY') {
            res.status(422).send("La competencia ya existe");
            return
        }
        
        res.status(500).send(error);
    })
}

function obtenerDosPeliculas(req, res) {

    var id = req.params.id;
    var peliculas;
    var competencia;
    var query = 'SELECT id, nombre, genero_id , director_id , actor_id FROM competencia WHERE id = ?'
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
        genero = competenciaRow[0].genero_id;
        director = competenciaRow[0].director_id;
        actor = competenciaRow[0].actor_id;
        //
        var args = [
            new Conditional('genero_id', genero, '='),
            new Conditional('director.id', director, '='),
            new Conditional('actor_pelicula.id', actor, '=')
        ]

        var whereClause = SqlUtil.buildWhereClause(args, " AND ");
        console.log(whereClause);
        query = `SELECT pelicula.*, director.id as director_id, RAND() as random 
                 FROM pelicula inner join director_pelicula on director_pelicula.peliculaid = pelicula.id
                 inner join actor_pelicula ON pelicula.id = actor_pelicula.pelicula_id
                 ${whereClause} ORDER BY random DESC limit 2;`;
        return database.query(query);
    }).then(peliculasRows => {
        peliculas = peliculasRows;
    }).then(() => {
        var opciones = { peliculas, competencia };
        res.send(opciones);
    }).catch(error => {
        logger.error(error);
        console.log(error);
        res.status(500).send(error);
    });
}

function cargarGeneros(req, res){

    let query = 'SELECT * FROM competencias.genero';
    database.query(query)
    .then(rows => {
        res.send(rows);
    });
}

function cargarDirectores (req, res) {

    let query = 'SELECT * FROM competencias.director';
    database.query(query)
    .then(rows => {
        res.send(rows);
    });

}

function cargarActores(req, res){
    
    let query = 'SELECT * FROM competencias.actor';
    database.query(query)
    .then(rows => {
        res.send(rows);
    });
}


function editarCompetencia(req, res){
    console.log(req.body);
    let nombre = req.body.nombre;
    let competenciaId = req.params.competenciaId;
    console.log("id: " + competenciaId, nombre);
    let query = 'UPDATE competencia SET nombre = ? WHERE id = ? ';
    database.query(query, [nombre, competenciaId])
    .then(rows => {
        res.send(rows);
    }).catch( error => {
        console.log(error);
        res.status(500).send(error);
    });
}

function eliminarCompetencia(req, res){
    let idCompetencia = req.params.competenciaId
    console.log(idCompetencia);
    let query = 'UPDATE competencia SET status = ? WHERE id = ? ;'
    database.query(query, [deshabilitadoStatus, idCompetencia])
    .then(rows => {
        if(rows.affectedRows == 0) {
            logger.info("Competencia " + idCompetencia + " no existe");
            res.status(404).send({message: "No existe competencia"});
            return;
        }
        res.send("");
    }).catch(error => {
        logger.error(error);
        res.status(500).send({message: "Internal server error"});
    });

}



module.exports.cargarCompetencias = cargarCompetencias
module.exports.obtenerDosPeliculas = obtenerDosPeliculas
module.exports.crearCompetencia = crearCompetencia
module.exports.obtenerCompetencia = obtenerCompetencia
module.exports.cargarGeneros = cargarGeneros
module.exports.cargarDirectores = cargarDirectores
module.exports.cargarActores = cargarActores
module.exports.editarCompetencia = editarCompetencia
module.exports.eliminarCompetencia = eliminarCompetencia
