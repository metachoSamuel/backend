var connection = require('../conexion/index')
var InformeModel = {}


InformeModel.postInformeAsistencia = function (parametros, callback) {
    if (connection) {
        var sql = "SELECT id_asistencia, DATE_FORMAT(fecha_asistencia, '%y-%m-%d') as fecha_informeA, P.nombres, P.apellidos, D.deporte"
        +" FROM asistencia AS A"
        +"      INNER JOIN persona AS P ON(P.id_persona=A.id_persona)"
        +"      INNER JOIN deporte AS D ON(A.id_deporte=D.id_deporte)"
        +"          WHERE(P.id_persona="+connection.escape(parametros.id)+" AND A.fecha BETWEEN "+connection.escape(parametros.fechaInicio)+" AND "+connection.escape(parametros.fechaFin)+")"
        +"              ORDER BY A.fecha"
        
        connection.query(sql, function (error, row) {
            if (error) {
                throw error
            } else {
                callback(null, row)
            }
        })
    }
}


module.exports = InformeModel

