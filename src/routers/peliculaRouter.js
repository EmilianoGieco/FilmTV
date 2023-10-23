const peliculaController = require('../controllers/peliculaController');
const multer = require("multer");
const express = require('express');
const router = express.Router();
const path = require("path");

const autenticacionMiddleware = require('../middlewares/autenticacionMiddleware');


console.log(path.join(__dirname, '../../public/img'))
const upload = multer();

//ruta carpeta detalle pelicula
router.get("/detalle/:id", peliculaController.detallePelicula);
//guardado de las calificaciones del usuario
router.post("/detalle/:id", peliculaController.guardado);

router.post("/detalle/:id", peliculaController.mostrarCalificaciones);



router.get("/CrearFilm", autenticacionMiddleware, (req, res, next) => {
    if (req.session.userLogged && req.session.userLogged.administrador === 1) {
        return next();
    } else {
        return res.status(403).send("Acceso denegado. No eres un administrador.");
    }
}, peliculaController.getCrearFilm);

router.post("/CrearFilm", upload.single("imagen"), autenticacionMiddleware, (req, res, next) => {
    if (req.session.userLogged && req.session.userLogged.administrador === 1) {
        return next();
    } else {
        return res.status(403).send("Acceso denegado. No eres un administrador.");
    }
}, peliculaController.postCrearFilm);

//ruta actualizacionFilm
router.get("/actualizarFilm/:id", autenticacionMiddleware, (req, res, next) => {
      if (req.session.userLogged && req.session.userLogged.administrador === 1) {
        return next();
    } else {
        return res.status(403).send("Acceso denegado. No eres un administrador.");
    }
}, peliculaController.getActualizarFilm);
router.put("/actualizarFilm/:id", autenticacionMiddleware, (req, res, next) => {
    if (req.session.userLogged && req.session.userLogged.administrador === 1) {
        return next();
    } else {
        return res.status(403).send("Acceso denegado. No eres un administrador.");
    }
},  upload.single("imagen"), peliculaController.postActualizarFilm);

//ruta de borrado pelicula
router.delete("/delete/:id", peliculaController.delete)

//peliculas de "ultimos estrenos"
router.get("/estrenos", peliculaController.estrenos);
/*detalle de ultimos estrenos*/
router.get("/estrenos/detalle/:id", peliculaController.detalleEstrenos);
//guardado de las calificaciones del usuario
router.post("/estrenos/detalle/:id", peliculaController.guardadoEstrenos);

//peliculas noticias
router.get('/noticias', peliculaController.noticia);
//peliculas noticias detalle
router.get('/noticias/detalle/:id', peliculaController.detalleNoti);

/*peliculas del archivo peliculas2023
router.get('/peliculas2023', peliculaController.peliculas2023 );*/

//rutas carpetas las 5 mejores peliculas (slide)
router.get("/detalleNoticia/:idN", peliculaController.detalleNoticia);

//rutas carpetas recomendacionesDeSeries (enrutar como corresponde)
router.get('/recomendacionesSerieNetflix', peliculaController.recomendacionesSerieNetflix);
router.get('/recomendacionesSerieAmazon', peliculaController.recomendacionesSerieAmazon);
router.get('/recomendacionesSerisDisney', peliculaController.recomendacionesSerisDisney);

//rutas carpetas top NETFLIX (enrutar como corresponde)
router.get('/Top1', peliculaController.Top1);
router.get('/Top2', peliculaController.Top2);
router.get('/Top3', peliculaController.Top3);

//rutas carpetas top amazon (enrutar como corresponde)
router.get('/Topa1', peliculaController.Topa1);
router.get('/Topa2', peliculaController.Topa2);
router.get('/Topa3', peliculaController.Topa3);

//rutas carpetas top DISNEY (enrutar como corresponde)
router.get('/Top1D', peliculaController.Top1D);
router.get('/Top2D', peliculaController.Top2D);
router.get('/Top3D', peliculaController.Top3D);

///////////////////////////////APIS/////////////////////////////////////////

//PRODUCTO (PELICULAS Y SERIES)
router.get('/productos',peliculaController.cantidadProductos);
//PRODUCTO POR ID 
router.get('/productos/:id',peliculaController.productoId);

///////////////////////////////FIN APIS PRODUCTO (PELICULAS) /////////////////////////////////////////

//CATEGORIA (GENERO)
router.get('/generos',peliculaController.generosTotal);
//GENERO POR ID 
router.get('/generos/:id',peliculaController.generoId);

///////////////////////////////FIN APIS CATEGORIA (GENERO) /////////////////////////////////////////

router.get("/todo",peliculaController.todo);

router.get("/todo/:id",peliculaController.todoId);


///////////////////////////////comentarios de ALL people /////////////////////////////////////////
//detallePelicula
router.get("/comentarios/:id", peliculaController.obtenerComentarios);

//detalleEstrenos
router.get("/estrenos/detalle/comentarios/:id", peliculaController.obtenerComent);



module.exports = router;
