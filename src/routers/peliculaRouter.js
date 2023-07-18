const peliculaController = require ('../controllers/peliculaController');
const multer = require ("multer");
const express = require('express');
const router = express.Router();
const path = require("path");

console.log( path.join(__dirname,'../../public/img'))

/*guardado de imagen */
const storage = multer.diskStorage({
    destination: function (req, file, cb)
     {
      cb(null, path.join(__dirname,'../../public/img'))

      },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now()
      cb(null, "imgFilm-" + uniqueSuffix + path.extname(file.originalname))
    }
  })
  
  const upload = multer({ storage: storage })


/* ruta carpeta detalle pelicula*/
router.get("/detalle/:id", peliculaController.detallePelicula); 

router.get("/CrearFilm", peliculaController.getCrearFilm);
router.post("/CrearFilm",upload.single("imagen"), peliculaController.postCrearFilm );




/*peliculas de la carpetas estrenos*/
router.get("/estrenos", peliculaController.estrenos);

/*peliculas del archivo noticias*/
router.get('/noticias', peliculaController.noticia );

/*peliculas del archivo peliculas2023*/
router.get('/peliculas2023', peliculaController.peliculas2023 );

/* rutas carpetas las 5 mejores peliculas*/
router.get("/detalleNoticia/:idN", peliculaController.detalleNoticia);

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

module.exports = router;