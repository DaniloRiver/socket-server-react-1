
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');
const cors = require('cors');




class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        //Http server
        this.server = http.createServer(this.app);
        
        //configuracion del socket server
        this.io = socketio( this.server, { /*configuraciones*/ } );
    }

    middlewares(){
        //Desplegar directorio publico
         this.app.use( express.static(path.resolve( __dirname,'../public' )));
         
         //CORS
         this.app.use( cors());
    }

    configurarSockets(){
        new Sockets(this.io);
    }

    execute(){
        //inicializar middlewares
        this.middlewares();

        //Inicializar sockets
        this.configurarSockets();

        //inicializar servers
        this.server.listen( this.port , () =>{
            console.log('Corriendo en el puerto:'+ this.port)
        });
    }
}

module.exports = Server;