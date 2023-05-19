var express = require('express')
var router = express.Router()

var InformeModel = require('../models/InformeModel')

module.exports = function(){

    router.post('/asistencia', function(req, res){
        var parametros = {
            id: req.body.id,
            fechaInicio: req.body.fechaInicio,
            fechaFin: req.body.fechaFin
        }
        InformeModel.postInformeAsistencia(parametros, function(error, data){
            if(data){
                res.status(200).json(data)
            }else{
                res.status(500).send({error:"pailas"})
            }
        })
    })

    return router
}