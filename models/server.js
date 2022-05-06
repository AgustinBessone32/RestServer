const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/config')

class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.usersRoutesPath = '/api/users'

        //Conectar BD
        this.conectarDB()

        //Middlewares
        this.middlewares()

        //Rutas
        this.routes()
    }

    async conectarDB(){
        await dbConnection()
    }

    middlewares(){
        //CORS
        this.app.use(cors())
        //Parseo
        this.app.use(express.json())
        //Directorio publico
        this.app.use(express.static('public'))
    }

    routes(){
        this.app.use(this.usersRoutesPath,require('../routes/user') )
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Escuchando en el puerto ${this.port}`)
          })
    }


}

module.exports = Server