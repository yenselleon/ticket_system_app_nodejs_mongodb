const express = require('express');
const cors = require('cors');
const { dbConection } = require('../database/db.config.js');

var morgan = require('morgan')


class Server {

    constructor(){
        
        this.app = express();

        this.port = process.env.PORT;
        this.path = {
            ticket: '/api/ticket',
            queue: '/api/queue'
            /* usuariosAuth: '/api/auth',
            buscar: '/api/buscar',
            categorias: '/api/categorias',
            productos: '/api/productos',
            uploads: '/api/uploads' */
        }

        //Conectar a la base de datos mongoose
        this.conectarDB();

        //middlewares
        this.middlewares();

        //routes
        this.routes();
    }

    async conectarDB(){
        await dbConection();
    }

    middlewares(){

        //CORS
        this.app.use(cors());

        //Lectura y Parseo del Body
        this.app.use(express.json({extended:true}));

        //Indicar la ruta del Directorio Público
        this.app.use( express.static('./src/public'));

        //Middleware para la visualizacion de peticiones HTTP desde la consola
        this.app.use(morgan('dev'));

    }

    routes(){

        this.app.use(this.path.ticket, require('../routes/ticket.routes.js'));
        this.app.use(this.path.queue, require('../routes/queue.routes.js'));

    }


    listen(){
        this.app.listen(this.port, ()=> {
            console.log('La aplicacion esta disponible desde el puerto', this.port);
        })
    }

}

module.exports = Server;