var connection = require('../conexion/index')
var DeporteModel = {}

DeporteModel.insertDeporte = function(CarreraData, callback){
    if(connection){
        var sql = "INSERT INTO Deporte SET ?"
        connection.query(sql, CarreraData, function(error, result){
            if(error){
                throw error
            }else{
                callback(null, {"msg":"Registro insertado"})
            }
        })
    }
}

DeporteModel.getDeporte = function(id, callback){
    if(connection){
        var sql = "SELECT * FROM Deporte WHERE id_deporte="+connection.escape(id)+";"
        connection.query(sql, function(error, row){
            if(error){
                throw error
            }else{
                callback(null, row)
            }
        })
    }
}

DeporteModel.updateDeporte = function(CarreraData, callback){
    if(connection){
        var sql = "UPDATE Deporte SET "
        +"deporte="+connection.escape(CarreraData.nombre_carrera)
        +" WHERE id_deporte="+connection.escape(CarreraData.id_carrera)+";"
        connection.query(sql, function(error, result){
            if(error){
                throw error
            }else{
                callback(null, {"msg":"Registro actualizado"})
            }
        })
    }
}

DeporteModel.getDeportes = function(callback){
    if(connection){
        var sql = "SELECT * FROM Deporte"
        connection.query(sql, function(error, row){
            if(error){
                throw error
            }else{
                callback(null, row)
            }
        })
    }
}

module.exports = DeporteModel