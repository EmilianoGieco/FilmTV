/* require */
const express = require('express');
const session = require('express-session');
const cookies = require('cookie-parser');
const path = require('path');
const methodOverride = require("method-override");
const usuarioLogueoMiddleware = require('./middlewares/usuarioLogueoMiddleware');
const cors = require('cors');

/* app */
const app = express();
app.use(cors())

/* middleware de session */
app.use(session( {
    secret: "Este es mi secreto",
    resave:false,
    saveUninitialized:false
} )); 

/* middleware cookie */
app.use(cookies());

app.use(usuarioLogueoMiddleware);

/* rutas importadas */
const rutaIndex = require('./routers/indexRouter');
const rutaUsuario = require('./routers/usuarioRouter');
const rutaPeliculas = require('./routers/peliculaRouter');

/* config carpeta public */
app.use(express.static(path.join(__dirname, '../public')));

/*motor de plantilla ejs*/
app.set('view engine', 'ejs');

/*en que carpeta se encuentra la carpeta "views"*/
app.set("views", path.join(__dirname, "/views"));

/* formulario configuracion */
app.use(express.json());

/* capturar informacion del formulario */
app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'));

/* router */
app.use('/', rutaIndex);
app.use('/usuarios', rutaUsuario);
app.use('/peliculas', rutaPeliculas);

  

/* servidor */
const port = 3020
app.listen(port, () => console.log('Servidor corriendo http://localhost:' + port));








