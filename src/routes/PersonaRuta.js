var express = require('express')
var router = express.Router()

var PersonaModel = require('../models/PersonaModel')

module.exports = function(){
    
    router.get('/', function(req, res){
        PersonaModel.getPersonas(function(error, data){
            res.status(200).json(data)
        })
    })

    //CRUL Read(Leer)
    router.get('/:id', function(req, res){
        var id = req.params.id
        //si es un numero
        if (!isNaN(id)){
            PersonaModel.getPersona(id, function(error, data){
                if (typeof data !==  'undefined' && data.length > 0){
                    res.status(200).json(data)
                }else{
                    res.json(404, {
                        "msg":"Registro no existe"
                    })
                }
            })
        }else {
            res.status(500).json({"msg":"No es un numero"})
        }
    })
    //CRUL Create(Crear)
    router.post('/', function(req, res){
        //Objeto JSON con los datos del nuevo registro
        var PersonaData={
            id_persona: null,
            apellidos: req.body.apellidos,
            nombres: req.body.nombres,
            fecha_nacimiento: req.body.fecha_nacimiento,
            id_deporte: req.body.id_deporte,
            id_email: req.body.id_email,
            id_telefono: req.body.id_telefono,
            id_tipoDocumento: req.body.id_tipoDocumento,
            numero_documento: req.body.numero_documento
        }

        PersonaModel.insertPersona(PersonaData, function(error, data){
            if(data){
                res.status(200).json(data)
            }else{
                res.status(500).send({error: "Pailas llave"})
            }
        })

    })

    //

    router.put("/", function(req, res){
        var PersonaData={
            id_persona: null,
            apellidos: req.body.apellidos,
            nombres: req.body.nombres,
            fecha_nacimiento: req.body.fecha_nacimiento,
            id_deporte: req.body.id_deporte,
            id_email: req.body.id_email,
            id_telefono: req.body.id_telefono,
            id_tipoDocumento: req.body.id_tipoDocumento,
            numero_documento: req.body.numero_documento
        }

        PersonaModel.updatePersona(PersonaData, function(error, data){
            if(data && data.msg){
                res.status(200).json(data)
            }else{
                res.status(500).send({error: "Pailas socio"})
            }
        })
    })

    return router
}

