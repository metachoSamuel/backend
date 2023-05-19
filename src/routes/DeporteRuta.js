var express = require('express')
var router = express.Router()

var DeporteModel = require('../models/DeporteModel') 

module.exports = function(){
    
    router.post('/', function(req, res){
        var DeporteData = {
            id_deporte: null,
            deporte: req.body.deporte,
        }

        DeporteModel.insertDeporte(DeporteData, function(error, data){
            if(data){
                res.status(200).json(data)
            }else{
                res.status(500).send({error:":("})
            }
        })
    })

    router.get('/:id', function(req, res){
        var id = req.params.id

        if(!isNaN(id)){
            DeporteModel.getDeporte(id, function(error,data){
                if(typeof data !== 'undefined' && data.length > 0){
                    res.status(200).json(data)
                }else{
                    res.json(404, {"msg":"Registro no existe"})
                }
            })
        }else{
            res.status(500).json({"msg":"No es un numero"})
        }
    })

    router.put('/', function(req, res){
        var DeporteData={
            id_deporte: req.body.id_deporte,
            deporte: req.body.deporte,
        }

        DeporteModel.updateDeporte(DeporteData, function(error, data){
            if(data && data.msg){
                res.status(200).json(data)
            }else{
                res.status(500).send({error:":("})
            }
        })
    })

    router.get('/',function(req, res){
        DeporteModel.getDeportes(function(error, data){
            res.status(200).json(data)
        })
    })

    return router
}