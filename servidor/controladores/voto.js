var Database = require('../lib/conexionBaseD');
var config = require('../lib/config');

var database = new Database(config);


function recibirVotos(req, res) {
    let competenciaId = req.params.competenciaId;
    let peliculaId = req.body.idPelicula;
    let query = "INSERT INTO `votos`(pelicula_id, competencia_id) VALUES (?, ?);"
    database.query(query, [peliculaId, competenciaId])
    .then(result => {
        let votoId = result.insertId;
        res.send({votoId});
    }).catch(error => {
        res.status(500).send({error});
    });
}

function eliminarVotos(req, res) {
    let competenciaId = req.params.competenciaId;
    console.log(competenciaId);
    let query = "DELETE FROM  votos WHERE competencia_id = ?;"
    database.query(query, competenciaId )
    .then(competenciaId => {
        res.send(competenciaId);
    }).catch(error => {
        res.status(422).send(error);
    })
}


module.exports.recibirVotos = recibirVotos
module.exports.eliminarVotos = eliminarVotos
