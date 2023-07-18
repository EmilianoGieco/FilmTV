const path = require('path');
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');
const peliculaPath = path.join(__dirname, "../data/noticiasPelis.json");
let ultimosEstrenos = require(".././data/ultimosEstrenos.json");
let slideNoticia = require(".././data/slide.json");

 /*detalle de las noticias*/
const controlador = {
  detallePelicula: (req, res) => {
    const peliculas = JSON.parse(fs.readFileSync(peliculaPath, "utf-8"));
    const idM = req.params.id;
    let movie = peliculas.find((pelicula) => pelicula.id == idM);
    console.log(movie);

    res.render("movies/detallePelicula", { movie })
  },

   /*carga de producto film*/
  getCrearFilm: function (req, res) {
    res.render("/CrearFilm")
  },

  postCrearFilm: function (req, res) {
    const peliculas = JSON.parse(fs.readFileSync(peliculaPath, "utf-8"));
    console.log(req.body);
    const nuevoFilm = {
      id: uuidv4(),
      nombre: req.body.nombre,
      imagen: req.file.filename,
    };
    peliculas.push(nuevoFilm);
    const peliculasJSON = JSON.stringify(peliculas, null, " ");
    fs.writeFile(peliculaPath, peliculasJSON, error => {
      if (error) {
        console.error(error);
      } else {
        res.redirect("/");
      }
    });
  },

  /* peliculas estrenos*/
  estrenos: (req, res) => {

    res.render('movies/estrenos', { estrenos: ultimosEstrenos })
  },

  /* peliculas noticias*/
  noticia: (req, res) => {
    res.render('movies/noticias.ejs', { noticias: slideNoticia });
  },

  /* peliculas 2023*/
  peliculas2023: (req, res) => {
    res.render('movies/peliculas2023.ejs');
  },

  /* noticias de peliculas slide principal*/
  detalleNoticia: (req, res) => {
    let datoP
    for (let obj of slideNoticia) {
      if (obj.id === parseInt(req.params.idN)) {
        console.log(obj)
        return res.render("movies/detalleNoticia", { data: obj });
      }
    }
    // TODO: Aca estaria bueno mandar a una pagina de error
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