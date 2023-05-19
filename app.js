var express = require('express')
var bodyParser = require('body-parser'), port=3000;
var http = require('http')
var path = require('path')



var conexion = require('./src/conexion/index')
var persona = require('./src/routes/PersonaRuta')
var deporte = require('./src/routes/DeporteRuta')
var asistencia = require('./src/routes/AsistenciaRuta')
var informe = require('./src/routes/InformeRuta')

/**var materia = require('./src/rutas/materiaruta')

var prestamo = require('./src/rutas/prestamoruta')
var audioVisual = require('./src/rutas/audiovisualruta')
var contacto = require('./src/rutas/contactoruta')
*/



var app = express()

app.set('port', process.env.PORT || port)
app.use(bodyParser.json(
    {   type: 'application/json',
        limit: '10mb'
    }
))

app.use(bodyParser.urlencoded(
    {
        extended: false
    }
))

app.use(express.static(
    path.join(__dirname, 'public')
))

app.use(function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-requested-With,content-type')
    res.setHeader('Access-Control-Allow-Credentails', true)
    next()
})

app.use('/persona', persona())
app.use('/deporte', deporte())
app.use('/asistencia', asistencia())
app.use('/informe', informe())

/**app.use('/materia', materia())
app.use('/prestamo', prestamo())
app.use('/audiovisual', audioVisual())
app.use('/contacto', contacto())
*/

http.createServer(app).listen(app.get('port'), function(){
    console.log('servidor Express escuchando por el puerto '+app.get('port'))
})

module.exports = app
