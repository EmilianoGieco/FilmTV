const peliculaController = require ('../controllers/peliculaController');
const multer = require ("multer");
const express = require('express');
const router = express.Router();
const path = require("path");

console.log( path.join(__dirname,'../../public/img'))
  const upload = multer();
 
/* ruta carpeta detalle pelicula*/
router.get("/detalle/:id", peliculaController.detallePelicula); 
//guardado de las calificaciones del usuario
router.post("/detalle/:id", peliculaController.guardado); 

/* ruta CrearFilm*/
router.get("/CrearFilm", peliculaController.getCrearFilm);
router.post("/CrearFilm",upload.single("imagen"), peliculaController.postCrearFilm );

/*ruta actualizacionFilm*/
router.get("/actualizarFilm/:id", peliculaController.getActualizarFilm);
router.put("/actualizarFilm/:id",upload.single("imagen"), peliculaController.postActualizarFilm );

/* ruta de borrado pelicula */
router.delete("/delete/:id", peliculaController.delete)

/*peliculas con los ultimos estrenos de ahora*/
router.get("/estrenos", peliculaController.estrenos);

/*detalle de ultimos estrenos*/
router.get("/estrenos/detalle/:id", peliculaController.detalleEstrenos);

/*peliculas noticias*/
router.get('/noticias', peliculaController.noticia );

/*peliculas noticias detalle*/
router.get('/noticias/detalle/:id', peliculaController.detalleNoti);

//para finalizarlo en un futuro proximo Emi
/*peliculas del archivo peliculas2023
router.get('/peliculas2023', peliculaController.peliculas2023 );*/

///* rutas carpetas las 5 mejores peliculas*///
router.get("/detalleNoticia/:idN", peliculaController.detalleNoticia);

/* rutas carpetas recomendacionesDeSeries*/
router.get('/recomendacionesSerieNetflix', peliculaController.recomendacionesSerieNetflix );
router.get('/recomendacionesSerieAmazon', peliculaController.recomendacionesSerieAmazon );
router.get('/recomendacionesSerisDisney', peliculaController.recomendacionesSerisDisney );

/* rutas carpetas top NETFLIX*/
router.get('/Top1', peliculaController.Top1 );
router.get('/Top2', peliculaController.Top2 );
router.get('/Top3', peliculaController.Top3 );

/* rutas carpetas top amazon*/
router.get('/Topa1', peliculaController.Topa1 );
router.get('/Topa2', peliculaController.Topa2 );
router.get('/Topa3', peliculaController.Topa3 );

/* rutas carpetas top DISNEY*/
router.get('/Top1D', peliculaController.Top1D);
router.get('/Top2D', peliculaController.Top2D);
router.get('/Top3D', peliculaController.Top3D);

module.exports = router;
