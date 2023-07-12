const peliculaController = require ('../controllers/peliculaController');

const express = require('express');
const router = express.Router();

router.get("/detalle/:id", peliculaController.detallePelicula);


router.get('/noticias', peliculaController.noticia );
router.get('/peliculas2023', peliculaController.peliculas2023 );
router.get('/estrenos', peliculaController.estrenos );

/*peliculas de la carpetas estrenos*/
router.get('/aspromonte', peliculaController.aspromonte );
router.get('/blondi', peliculaController.blondi );
router.get('/boogeyman', peliculaController.boogeyman );
router.get('/elementos', peliculaController.elementos );
router.get('/maremoto', peliculaController.maremoto );
router.get('/misantropo', peliculaController.misantropo );

/* rutas carpetas las 5 mejores peliculas*/
router.get('/barbie', peliculaController.barbie );
router.get('/flash', peliculaController.flash );
router.get('/lasirenita', peliculaController.lasirenita );
router.get('/rapido-y-furioso-x', peliculaController.rapidoyfuriosox );
router.get('/transformers', peliculaController.transformers );

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

/* rutas carpetas top MOVIES2023*/
router.get("/noticiasMasVistas/:idMovies", peliculaController.movies2023)
/*/router.get('/Avatar2023', peliculaController.Avatar2023 );
router.get('/Exorsista', peliculaController.Exorsista );
router.get('/Mario2023', peliculaController.Mario2023 );
router.get('/Johnwick4', peliculaController.Johnwick4 );
router.get('/Laherederadelamafia', peliculaController.Laherederadelamafia );*/




module.exports = router;