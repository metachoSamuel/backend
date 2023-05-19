var mysql = require('mysql')
var settings = require('./config.json')
var connection

function connectDatabase(){
    if(!connection){
        connection = mysql.createConnection(settings)
        connection.connect(function(err){
            if(!err){
                console.log('Base de datos conectada '+settings.database)
            }else{
                console.log('Error en la conexión con la base de datos'+settings.database)
            }
        });
    }
    return connection
}


//Exporta la conexion
module.exports = connectDatabase();


