const express = require('express');
const { dbConection } = require('./db/config');
const cors = require('cors');
require('dotenv').config();

//Crear el servidor de Express

const app = express();

//Base de datos
dbConection();

// CORS
app.use(cors());

//Directorio publico
app.use( express.static('public') );

// Lectura y parseo del Body
app.use( express.json() );

//Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

//Si no encuentra la ruta sirve al archivo index con la original
app.get('*', (req, res) => {
    res.sendFile( __dirname + '/public/index.html');
});

// Escuchar Peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});




//Crear el servidor de Express
// class Server {
//     constructor(){
//         this.app = express();
//         this.port = process.env.PORT;

//         this.paths = {
//             auth: '/api/auth',
//             event: '/api/event'
//         }

//         this.conectarDB();

//         this.middlewares();

//         this.routes();
//     }

//     async conectarDB(){
//         //Base de datos
//         await dbConection();
//     }

//     middlewares(){
//         // CORS
//         this.app.use(cors());
//         // Lectura y parseo del Body
//         this.app.use( express.json() );
//         //Directorio publico
//         this.app.use( express.static('public') );
//     }
    
//     routes(){
//         //Rutas
//         this.app.use( this.paths.auth, require('./routes/auth'));
//         this.app.use( this.paths.event, require('./routes/events'));
//         //Si no encuentra la ruta sirve al archivo index con la original
//         this.app.use('*', (req, res) => {
//             res.sendFile( __dirname + '/public/index.html');
//         });
//     }
    
//     listen(){
//         // Escuchar Peticiones
//         this.app.listen(this.port, () => {
//             console.log(`Servidor corriendo en puerto ${this.port}`)
//         })
//     }
// }





// module.exports = Server;