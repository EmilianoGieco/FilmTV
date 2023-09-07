const path = require('path');
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');


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
const { Op } = require('sequelize');

/*detalle de las noticias*/
const controlador = {
  detallePelicula: (req, res) => {
    db.productoFilm.findByPk(req.params.id, {include: [{ association: "genero" }] 
    }).then(function (movie) {
      res.render("movies/detallePelicula", { movie: movie });
    });
  },


  /*prueba de metodo cloudinary*/
  postCrearFilm: (req, res) => {
    const imageBuffer = req.file.buffer;
    const customFilename = '';

    const stream = cloudinary.uploader.upload_stream({ resource_type: 'image', public_id: customFilename }, (error, result) => {
      if (error) {
        console.error('Error en Cloudinary:', error);
      } else {
        console.log('Imagen cargada con éxito');
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
          .then((movie) => {
            console.log('Película guardada con éxito:', movie);
            res.redirect("/");
          })
          .catch((error) => {
            console.error('Error al crear la película:', error);
          });
      }
    });
    streamifier.createReadStream(imageBuffer).pipe(stream);
  },


  getCrearFilm: function (req, res) {
    db.genero.findAll()
      .then(function (generos) {
        return res.render("./user/CrearFilm", { generos: generos })
      });
  },

  getActualizarFilm: async function (req, res) {
    const idM = req.params.id;
    try {
      const movie = await db.productoFilm.findByPk(idM);
      if (movie) {
        const generos = await db.genero.findAll();
        return res.render("./user/actualizarFilm", { movie: movie, generos: generos });
      } else {

        res.send('Película no encontrada');
      }
    } catch (error) {
      console.error('Error en getActualizarFilm:', error);
      res.render('error', { message: 'Error al cargar la página' });
    }
  },

  postActualizarFilm: async function (req, res) {
    const idM = req.params.id;

    try {
      const movie = await db.productoFilm.findByPk(idM);

      if (movie) {
        const imageBuffer = req.file.buffer;
        const customFilename = '';

        const stream = cloudinary.uploader.upload_stream({ resource_type: 'image', public_id: customFilename }, async (error, result) => {
          if (error) {
            console.error('Error en Cloudinary:', error);
          } else {
            // Actualizar la imagen en la base de datos
            movie.imagen1 = result.secure_url || movie.imagen1;
            await movie.save();

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
    } catch (error) {
      console.error('Error en postActualizarFilm:', error);
      res.render('error', { message: 'Error al actualizar la película' });
    }
  },

  /* proceso de borrado */
  delete: async (req, res) => {
    const idPelicula = req.params.id;

    try {
      // Buscar la película por su ID en la base de datos
      const pelicula = await db.productoFilm.findByPk(idPelicula);

      if (!pelicula) {
        res.send('Película no encontrada');
      } else {
        // Borrar la película de la base de datos
        await pelicula.destroy();

        res.redirect("/");
      }
    } catch (error) {
      console.error('Error en delete:', error);
      res.render('error', { message: 'Error al eliminar la película' });
    }
  },


  /*peliculas estrenos*/
  estrenos: async (req, res) => {
    try {
      // Consulta para encontrar películas con nombres específicos.
      const estrenos = await db.productoFilm.findAll(

        {
          where: {
            nombre: {
              [Op.or]: ["Contrareloj", "Escape bajo fuego", "Poderes ocultos", "Sonido de libertad"]
            }

          },
          order: [['fecha_estreno', 'ASC']], // Ordenar por fecha de estreno en orden ascendente.
          include: [{ association: "genero" }, { association: "actor" }]
        })

      // Renderizar la vista y los resultados a la plantilla.
      return res.render("movies/estrenos", { estrenos: estrenos });
      //res.send(estrenos)
    } catch (error) {
      console.log(error)
    }

  }
  ,

  /* peliculas noticias*/
  noticia: (req, res) => {
    db.productoFilm.findAll({
      where: {
        nombre: {
          [Op.or]: ["The Flash", "Barbie", "La sirenita", "Transformers: el despertar de las bestias", "Rapidos y Furiosos x"]
        }
      },
      order: [['fecha_estreno', 'ASC']], // Ordenar por fecha de estreno en orden ascendente
      include: [{ association: "genero" }, { association: "actor" }]
    })
      .then(function (noticias) {
        return res.render("movies/noticias", { noticias: noticias });
      });
  },

  /* peliculas 2023*/
  peliculas2023: (req, res) => {

    db.productoFilm.findAll({
      where: {
        nombre: {
          [Op.or]: ["Super Mario Bros", "John Wick: Capítulo 4", "Blondi", "Boogeyman: Tu miedo es real"]
        }
      },
      order: [['fecha_estreno', 'ASC']], // Ordenar por fecha de estreno en orden ascendente
      include: [{ association: "genero" }, { association: "actor" }, { association: "director" }, { association: "guionista" }, { association: "productora" }]
    })
      .then(function (peliculas) {
        return res.render("movies/peliculas2023", { peliculas: peliculas });
      });

  },

  /* noticias de peliculas slide principal*/
  detalleNoticia: (req, res) => {
    db.productoFilm.findByPk(req.params.idN , {
      include: [{ association: "genero" }] // Esto incluirá los detalles de noticias asociados al producto
    })
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