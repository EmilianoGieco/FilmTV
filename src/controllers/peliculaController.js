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

/*comentarios de ALL people*/ 





/*detalle de las peliculas*/
const controlador = {
  detallePelicula: (req, res) => {
    db.productoFilm.findByPk(req.params.id, {
      include: [{ association: "genero" }]
    }).then(function (movie) {
      res.render("movies/detallePelicula", { movie: movie });

    });
  },

  //guardado de calificacion
  guardado: async (req, res) => {
    try {
      const calificacion = req.body.calificacion;
      const peliculaId = req.params.id;  // Obtener el ID de la película desde la URL
      const usuarioId = req.body.usuarioId; // Obtener el ID del usuario desde el body
      const comentarioUsuario = req.body.comentarioUsuario // Obtener el comentario del cuerpo de la solicitud

      if (!calificacion) {
        return res.status(400).send('La calificación es requerida.');
      }

      // Crear la calificación y el comentario asociada a la película/serie
      await db.calificacion.create({
        calificacion: calificacion, // Guardar la calificacion en la base de datos
        id_productoFilm: peliculaId,  // Asociar la calificación con la película
        usuario_id: usuarioId,  // establecer el ID del usuario 
        comentario: comentarioUsuario // Guardar el comentario en la base de datos
      });

      res.redirect('/');
    } catch (error) {
      console.error('Error al guardar la calificación:', error);
      res.status(500).send('Error al guardar la calificación');
    }
  },
  //guardado de calificacion final


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
            movie.nombre = req.body.nombre;
            movie.resumen = req.body.resumen;
            movie.fecha_estreno = req.body.fecha_estreno;
            movie.calificacion = req.body.calificacion;
            movie.video = req.body.video;
            movie.subidoPor = req.body.usuario;
            movie.genero = req.body.genero;
            movie.duracion = req.body.duracion;
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
          limit: 13,
          order: [['fecha_estreno', 'DESC']] // Ordenar por fecha de estreno en orden descendente.
        })

      // Renderizar la vista y los resultados a la plantilla.
      return res.render("movies/estrenos", { estrenos: estrenos });
      //res.send(estrenos)
    } catch (error) {
      console.log(error)
    }
  },

  /*detalle de los estrenos*/
  detalleEstrenos: (req, res) => {
    db.productoFilm.findByPk(req.params.id, { include: [{ association: "genero" }, { association: "actor" }, { association: "guionista" }, { association: "director" }] })
      .then(function (pelicula) {
        res.render("movies/detalleEstrenos", { pelicula: pelicula })
      })
  },

  /* guardado  en la base de datos de ultimos estrenos*/
  guardadoEstrenos: async (req, res) => {
    try {
      const calificacion = req.body.calificacion;
      const peliculaId = req.params.id;  // Obtener el ID de la película desde la URL
      const usuarioId = req.body.usuarioId; // Obtener el ID del usuario desde el body
      const comentarioUsuario = req.body.comentarioUsuario // Obtener el comentario del cuerpo de la solicitud

      if (!calificacion) {
        return res.status(400).send('La calificación es requerida.');
      }

      // Crear la calificación y el comentario asociada a la película/serie
      await db.calificacion.create({
        calificacion: calificacion, // Guardar la calificacion en la base de datos
        id_productoFilm: peliculaId,  // Asociar la calificación con la película
        usuario_id: usuarioId,  // establecer el ID del usuario 
        comentario: comentarioUsuario // Guardar el comentario en la base de datos
      });

      res.redirect('/');
    } catch (error) {
      console.error('Error al guardar la calificación:', error);
      res.status(500).send('Error al guardar la calificación');
    }
  },


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


  /*Detalle de las noticias*/
  detalleNoti: (req, res) => {
    db.productoFilm.findByPk(req.params.id, { include: [{ association: "genero" }, { association: "actor" }, { association: "guionista" }, { association: "director" }] })
      .then(function (noticia) {
        res.render("movies/detalleNoti", { noticia: noticia })
      })
  },
  //para finalizarlo  en un futuro proximo Emi
  /* peliculas 2023
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

  },*/

  /* noticias de peliculas slide principal*/
  detalleNoticia: (req, res) => {
    db.productoFilm.findByPk(req.params.idN, {
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


  ///////////////////////////////APIS/////////////////////////////////////////

  //PRODUCTO (PELICULAS Y SERIES)
  cantidadProductos: (req, res) => {
    db.productoFilm.findAll({ //obtengo todos los productos de la bd
      include: [{ association: "tipo" }, { association: "genero" }] //incluyo la tabla asociada a productoFilm
    })
      .then(peliculas => {
        const productosConTipo = peliculas.map(producto => ({
          id: producto.id,
          nombre: producto.nombre,
          duracion: producto.duracion,
          fecha_estreno: producto.fecha_estreno,
          imagen: producto.imagen1,
          tipo: producto.tipo && producto.tipo.nombre, // Obtenngo el nombre del tipo (película o serie)
        }));

        return res.status(200).json({
          productoTotal: productosConTipo.length,
          data: productosConTipo,
          status: 200
        });
      })
  },

  //PRODUCTO POR ID 
  productoId: (req, res) => {
    db.productoFilm.findByPk(req.params.id, {
      include: [{ association: "tipo" }]
    })
      .then(producto => {
        return res.status(200).json({
          id: producto.id,
          nombre: producto.nombre,
          duracion: producto.duracion,
          fecha_estreno: producto.fecha_estreno,
          imagen: producto.imagen1,
          tipo: producto.tipo && producto.tipo.nombre,
          status: 200
        })
      })
  },

  ///////////////////////////////FIN APIS PRODUCTO/////////////////////////////////////////

  //CATEGORIAS (GENERO)
  generosTotal: (req, res) => {
    db.genero.findAll({ //obtengo todos los generos de la bd
      include: [{ association: "productoFilm" }]
    })
      .then(generos => {
        const generosConProductoFilm = generos.map(genero => ({
          id: genero.id,
          genero: genero.nombre,
          productos: genero.productoFilm.map(producto => ({
            id: producto.id,
            nombre: producto.nombre
          })),
        }));

        return res.status(200).json({
          productoTotal: generosConProductoFilm.length,
          data: generosConProductoFilm,
          status: 200
        });
      })
  },

  //GENERO POR ID 
  generoId: (req, res) => {
    db.genero.findByPk(req.params.id, {
      include: [{ association: "productoFilm" }]
    })
      .then(genero => {
        if (!genero.productoFilm || genero.productoFilm.length === 0) {
          return res.status(200).json({
            mensaje: "No hay productos asociados a este género",
            status: 200
          });
        }

        return res.status(200).json({
          id: genero.id,
          genero: genero.nombre,
          productos: genero.productoFilm.map(producto => ({
            id: producto.id,
            nombre: producto.nombre
          })),
          status: 200
        });
      });
  },

///////////////////////////////FIN APIS CATEGORIA (GENERO)/////////////////////////////////////////

todo: (req, res) => {
  db.calificacion.findAll({
    include: [{ association: "productoFilm" }]
  })
    .then(calificaciones => {  
      return res.status(200).json({
        total: calificaciones.length,
        data: calificaciones,
        status: 200
      })
     })
},

todoId: (req, res) => {
  db.calificacion.findByPk(req.params.id, {
    include: [{ association: "productoFilm" }]
  })
    .then(calificaciones => {
        return res.status(200).json({
         data: calificaciones
      });
    });
}

}

module.exports = controlador;