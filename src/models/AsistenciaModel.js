var connection = require('../conexion/index')
var AsistenciaModel={}

AsistenciaModel.getAsistencias=function(callback){
    if(connection){
        var sql = "SELECT `id_asistencia`, DATE_FORMAT(fecha_asistencia, '%y-%m-%d') as fecha, `estado_asistencia`, P.apellidos, P.nombres, D.deporte FROM"
        +" `asistencia` AS A"
        +" INNER JOIN persona as P ON(A.id_persona = P.id_persona)"
        +" INNER JOIN deporte as D ON(A.id_deporte = D.id_deporte)"
        +" ORDER BY id_asistencia;"

        connection.query(sql, function(error, row){
            if(error){
                throw error
            }else{
                callback(null, row)
            }
        })
    }
}

AsistenciaModel.getAsistencia=function(id, callback){
    if(connection){
        var sql = "SELECT `id_asistencia`,`estado_asistencia`, P.apellido_1, P.nombre_1,  D.deporte FROM"
        +" `asistencia` AS A"
        +" INNER JOIN persona as P ON(A.id_persona = P.id_persona)"
        +" INNER JOIN deporte as D ON(A.id_deporte = D.id_deporte)"
        +" WHERE id_asistencia="+connection.escape(id)+";"
        connection.query(sql, function(error, row){
            if(error){
                throw error
            }else{
                callback(null, row)
            }
        })
    }
}

AsistenciaModel.insertAsistencia=function(AsistenciaData, callback){
    if(connection){
        var sql="INSERT INTO asistencia SET ?"
        connection.query(sql, AsistenciaData, function(error, result){
            if(error){
                throw error
            }else{
                callback(null, {"msg": "Registro Insertado"})
            }
        })
    }
}

AsistenciaModel.updatePersona = function(AsistenciaData, callback){
    if(connection){
        var sql = "UPDATE asistencia SET "
        + " fecha = " + connection.escape(AsistenciaData.fecha)
        + ", observaciones = " + connection.escape(AsistenciaData.observaciones)
        + ", estado = " + connection.escape(AsistenciaData.estado)
        + ", id_persona = " + connection.escape(AsistenciaData.id_persona)
        + ", id_materia = " + connection.escape(AsistenciaData.id_materia)
        + " WHERE  id_asistencia  =  " + connection.escape(AsistenciaData.id_asistencia) + ";";

        connection.query(sql, function(error, result){
            if(error){
                throw error
            }else{
                callback(null, {"msg":"Registro actualizado"})
            }
        })
    }
}

module.exports = AsistenciaModel