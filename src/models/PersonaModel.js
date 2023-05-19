var connection = require('../conexion/index')

var PersonaModel = {}

PersonaModel.getPersonas = function (callback) {
    if (connection) {
        var sql = "SELECT `nombres`,`apellidos`, `fecha_nacimiento`, D.tipoDocumento, `numero_documento`,E.email, T.telefono FROM"
        +" `persona` AS P"
        +" INNER JOIN documentos as D ON(P.id_persona = D.id_persona)"
        +" INNER JOIN emails as E ON(P.id_persona = E.id_persona)"
        +" INNER JOIN telefonos as T ON(P.id_persona = T.id_persona);"

        connection.query(sql, function (error, row) {
            if (error) {
                throw error
            } else {
                callback(null, row)
            }
        })
    }
}

PersonaModel.getPersona = function(id, callback){
    if (connection){
        var sql = "SELECT `nombres`,`apellidos`, `fecha_nacimiento`, D.tipoDocumento, `numero_documento`,E.email, T.telefono FROM"
        +" `persona` AS P"
        +" INNER JOIN documentos as D ON(P.id_persona = D.id_persona)"
        +" INNER JOIN emails as E ON(P.id_persona = E.id_persona)"
        +" INNER JOIN telefonos as T ON(P.id_persona = T.id_persona)"
        +" WHERE id_persona="+connection.escape(id)+";"
        connection.query(sql, function(error, row){
            if (error){
                throw error
            }else{
                callback(null, row)
            }
        })
    }
}

PersonaModel.insertPersona = function(PersonaData, callback){
    if(connection){
        var sql="INSERT INTO persona SET ?"
        connection.query(sql, PersonaData, function(error, result){
            if(error){
                throw error
            }else{
                callback(null, {"msg": "Registro Insertado"})
            }
        })
    }
}

PersonaModel.updatePersona= function(PersonaData, callback){
    if (connection){
        var sql="UPDATE persona SET "
        + " apellidos = " + connection.escape(PersonaData.apellidos)
        + ", nombres = " + connection.escape(PersonaData.nombres)
        + ", fecha_nacimiento = " + connection.escape(PersonaData.fecha_nacimiento)
        + ", no_documento = " + connection.escape(PersonaData.no_documento)
        + ", tipo_persona = " + connection.escape(PersonaData.tipo_persona)
        + " WHERE  id_persona  =  " + connection.escape(PersonaData.id_persona) + ";";

        connection.query(sql, function(error, result){
            if(error){
                throw error
            }else{
                callback(null, {"msg":"Registro actualizado"})
            }
        })
    }
}

module.exports = PersonaModel
