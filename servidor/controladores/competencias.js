var Database = require('../lib/conexionBaseD');
var config = require('../lib/config');

var database = new Database(config);

function cargarCompetencias(req, res) {


    database.query('SELECT * FROM competencia;').then( rows => {
        res.send(rows);
    });

    return res;

};

module.exports.cargarCompetencias = cargarCompetencias