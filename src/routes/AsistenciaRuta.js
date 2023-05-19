var express = require('express')
var router = express.Router()

var AsistenciaModel = require('../models/AsistenciaModel')

module.exports = function () {
    router.get('/', function (req, res) {
        AsistenciaModel.getAsistencias(function (error, data) {
            res.status(200).json(data)
        })
    })

    router.get('/:id', function (req, res) {
        var id = req.params.id

        if (!isNaN(id)) {
            AsistenciaModel.getAsistencia(id, function (error, data) {
                if (typeof data !== 'undefined' && data.length > 0) {
                    res.status(200).json(data)
                } else {
                    res.json(404, { "msg": "Registro no existe" })
                }
            })
        } else {
            res.status(500).json({ "msg": "No es un numero" })
        }
    })

    router.post('/', function (req, res) {
        var AsistenciaData = {
            estado_asistencia: req.body.estado_asistencia,
            id_asistencia: null,
            id_persona: req.body.id_persona
        }

        AsistenciaModel.insertAsistencia(AsistenciaData, function(error, data){
            if(data){
                res.status(200).json(data)

            }else{
                res.status(500).send({error: "Yucas"})
            }
        })
    })

    router.put('/', function(req, res){
        var AsistenciaData = {
            estado_asistencia: req.body.estado_asistencia,
            id_asistencia: null,
            id_persona: req.body.id_persona
        }

        AsistenciaModel.updatePersona(AsistenciaData, function(error, data){
            if(data && data.msg){
                res.status(200).json(data)
            }else{
                res.status(500).send({error: "Yucas"})
            }
        })
    })

    return router
}