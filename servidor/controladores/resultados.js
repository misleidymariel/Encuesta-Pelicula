var Database = require('../lib/conexionBaseD');
var config = require('../lib/config');

var database = new Database(config);

function resultadoCompetencia(req, res ){
    let id = parseInt(req.params.id);

    let query = `SELECT pelicula_id, pelicula.titulo, pelicula.poster, competencia.nombre, count(pelicula_id) as votos
                        FROM  votos
                        INNER JOIN pelicula ON  votos.pelicula_id = pelicula.id
                        INNER JOIN competencia ON votos.competencia_id = competencia.id
                        WHERE competencia_id = ?
                        GROUP BY pelicula_id
                        order by votos desc
                        limit 3`

    database.query(query,[id] ).then(rows => {
        let competencia = '';
        if (rows.length > 0) {
            competencia = rows[0].nombre
        }
        let body = { resultados: rows, competencia: competencia };
        res.send(body);
    });

}
module.exports.resultadoCompetencia = resultadoCompetencia;