const path = require('path');
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');

/*let ultimosEstrenos = require(".././data/ultimosEstrenos.json");
let slideNoticia = require(".././data/slide.json");
let noticiasPelis = require(".././data/noticiasPelis.json");*/
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');



//cloudinary       
cloudinary.config({
  cloud_name: 'dlimugyad',
  api_key: '232418438234228',
  api_secret: 'APayZJi7Qqs1U4CbQS2gkE6h1k4'
});

//base de datos conexion
let db = require("../database/models");
const { where } = require('sequelize');

/*detalle de las noticias*/
const controlador = {
  detallePelicula: (req, res) => {
    db.productoFilm.findByPk(req.params.id, {
    }).then(function (movie) {
        res.render("movies/detallePelicula", { movie: movie });
    });
},

  /*prueba de metodo cloudinary*/
  postCrearFilm: (req, res) => {
    const imageBuffer = req.file.buffer;
    const customFilename = ''
    
    const stream = cloudinary.uploader.upload_stream({ resource_type: 'image', public_id: customFilename }, (error, result) => {
      if (error) {
        console.error('Error en Cloudinary:', error); 
      } else {
        console.log('Imagen cargada con éxito')
        db.productoFilm.create({
          
          nombre: req.body.nombre,
          imagen1: result.secure_url,
          resumen: req.body.resumen,
          fecha_estreno: req.body.fecha_estreno,
          calificacion: req.body.calificacion, 
          video: req.body.video,
          subidoPor: req.body.usuario,
          genero: req.body.genero,
          duracion: req.body.duracion
        })
        res.redirect("/");
      }
    });
    streamifier.createReadStream(imageBuffer).pipe(stream);
  },


  getCrearFilm: function (req, res) {
        db.genero.findAll()
      .then(function (generos) {
        return res.render("./user/CrearFilm", { generos: generos })
      })
  },
  

  getActualizarFilm: function (req, res) {
    const peliculas = JSON.parse(fs.readFileSync(peliculaPath, "utf-8"));
    const idM = req.params.id;
    let movie = peliculas.find((pelicula) => pelicula.id == idM);
    console.log(movie);

    res.render("user/actualizarFilm", { movie })
  },

  postActualizarFilm: function (req, res) {
    const peliculas = JSON.parse(fs.readFileSync(peliculaPath, "utf-8"));
    const idM = req.params.id;
    let movie = peliculas.find((pelicula) => pelicula.id == idM);

    if (movie) {
      const imageBuffer = req.file.buffer;
      const customFilename = '';

      const stream = cloudinary.uploader.upload_stream({ resource_type: 'image', public_id: customFilename }, (error, result) => {
        if (error) {
          console.error('Error:', error);
        } else {
          movie.imagen = result.secure_url || movie.imagen;

          /* Guardar los cambios y redireccionar */
          fs.writeFileSync(peliculaPath, JSON.stringify(peliculas, null, " "));
          res.redirect("/");
        }
      });

      streamifier.createReadStream(imageBuffer).pipe(stream);
    } else {
      res.send(`
      <div style="text-align: center; padding-top:30px">
      <h1>La película no se puede editar</h1>
      <img style="width:40%;" src="/img/error-critico.jpg">
      </div>
      `);
    }
  },

  /* proceso de borrado */
  delete: (req, res) => {
    /* Guardo en nuevoFilm todos los juegos que no quiero borrar */
    const peliculas = JSON.parse(fs.readFileSync(peliculaPath, "utf-8"));
    const nuevoFilm = peliculas.filter((movie) => movie.id != req.params.id);
    /* busco el juego a borrar para eliminarle la imagen */
    const filmtoDelete = peliculas.find((movie) => movie.id == req.params.id);
    const publicPath = path.join(__dirname, "../../public");
    /* utilizo fs.existsSync para saber si existe una imagen física en nuestra carpeta estatica, si la tiene que la borre con fsUnlink, sino que no haga nada */
    if (
      fs.existsSync(
        path.join(publicPath, filmtoDelete.imagen)
      )
    ) {
      fs.unlinkSync(
        path.join(publicPath, filmtoDelete.imagen)
      );
    }
    /* reescribo ese listado de juegos excluyendo el que eliminamos y redirecciono */
    fs.writeFileSync(peliculaPath, JSON.stringify(nuevoFilm, null, " "));
    res.redirect("/");
  },


  /*peliculas estrenos*/
  estrenos: async (req, res) => {
    try {
      // Consulta para encontrar películas con nombres específicos.
      const estrenos = await db.productoFilm.findAll({
        where: {
          nombre: {
            [Op.or]: ["Contrareloj", "Escape bajo fuego", "Poderes ocultos", "Sonido de libertad"]
          }
        },
        order: [['fecha_estreno', 'ASC']] // Ordenar por fecha de estreno en orden ascendente.
      });

      // Consultas para obtener imágenes
      const generos = await db.genero.findAll();
      const generosFilm = await db.generoFilm.findAll();

      // Renderizar la vista y los resultados a la plantilla.
      return res.render("movies/estrenos", { estrenos: estrenos, generos: generos, generosFilm: generosFilm });
    } catch (error) {
      console.log(error)
    }

  }
  ,

  /* peliculas noticias*/
  noticia: async (req, res) => {
    await db.productoFilm.findAll({
      where: {
        nombre: {
          [Op.or]: ["The Flash", "Barbie", "La sirenita", "Transformers: el despertar de las bestias", "Rapidos y Furiosos x"]
        }
      },
      order: [['fecha_estreno', 'ASC']] // Ordenar por fecha de estreno en orden ascendente
    })
      .then(function (noticias) {
        return res.render("movies/noticias", { noticias: noticias });
      });
  },

  /* peliculas 2023*/
  peliculas2023: async (req, res) => {

    await db.productoFilm.findAll({
      where: {
        nombre: {
          [Op.or]: ["Super Mario Bros.: la película", "John Wick: Capítulo 4", "Blondi", "Boogeyman: Tu miedo es real"]
        }
      },
      order: [['fecha_estreno', 'ASC']] // Ordenar por fecha de estreno en orden ascendente
    })
      .then(function (peliculas) {
        return res.render("movies/peliculas2023", { peliculas: peliculas });
      });

  },

  /* noticias de peliculas slide principal*/
  detalleNoticia: (req, res) => {

    db.productoFilm.findByPk(req.params.idN)
      .then(function (noticiaDetalle) {
        res.render("movies/detalleNoticia", { noticiaDetalle: noticiaDetalle })
      })
  },

  aspromonte: (req, res) => {
    res.render(path.resolve(__dirname, '../views/movies/estrenos/aspromonte.ejs'))
  },

  blondi: (req, res) => {
    res.render(path.resolve(__dirname, '../views/movies/estrenos/blondi.ejs'))
  },

  boogeyman: (req, res) => {
    res.render(path.resolve(__dirname, '../views/movies/estrenos/boogeyman.ejs'))
  },

  elementos: (req, res) => {
    res.render(path.resolve(__dirname, '../views/movies/estrenos/elementos.ejs'))
  },

  maremoto: (req, res) => {
    res.render(path.resolve(__dirname, '../views/movies/estrenos/maremoto.ejs'))
  },

  misantropo: (req, res) => {
    res.render(path.resolve(__dirname, '../views/movies/estrenos/misantropo.ejs'))
  },

  /* rutas carpetas recomendacionesDeSeries*/
  recomendacionesSerieNetflix: (req, res) => {
    res.render(path.resolve(__dirname, '../views/movies/recomendacionesDeSeries/netflixtop.ejs'))
  },
  recomendacionesSerieAmazon: (req, res) => {
    res.render(path.resolve(__dirname, '../views/movies/recomendacionesDeSeries/amazontop.ejs'))
  },
  recomendacionesSerisDisney: (req, res) => {
    res.render(path.resolve(__dirname, '../views/movies/recomendacionesDeSeries/disneytop.ejs'))
  },

  /* rutas carpetas top NETFLIX*/
  Top1: (req, res) => {
    res.render(path.resolve(__dirname, '../views/movies/top/top1netflix.ejs'))
  },
  Top2: (req, res) => {
    res.render(path.resolve(__dirname, '../views/movies/top/top2netflix.ejs'))
  },
  Top3: (req, res) => {
    res.render(path.resolve(__dirname, '../views/movies/top/top3netflix.ejs'))
  },
  /* rutas carpetas top amazon*/
  Topa1: (req, res) => {
    res.render(path.resolve(__dirname, '../views/movies/top/top1amazon.ejs'))
  },
  Topa2: (req, res) => {
    res.render(path.resolve(__dirname, '../views/movies/top/top2amazon.ejs'))
  },
  Topa3: (req, res) => {
    res.render(path.resolve(__dirname, '../views/movies/top/top3amazon.ejs'))
  },

  /* rutas carpetas top DISNEY*/
  Top1D: (req, res) => {
    res.render(path.resolve(__dirname, '../views/movies/top/top1disney+.ejs'))
  },
  Top2D: (req, res) => {
    res.render(path.resolve(__dirname, '../views/movies/top/top2disney.ejs'))
  },
  Top3D: (req, res) => {
    res.render(path.resolve(__dirname, '../views/movies/top/top3disney.ejs'))
  },
}

module.exports = controlador;