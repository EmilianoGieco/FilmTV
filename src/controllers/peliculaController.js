const path = require('path');
const fs = require ("fs");


const controlador = {
    detallePelicula: (req, res) => {
      const peliculas = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/noticiasPelis.json" ))) 
      const idM = req.params.id;
      let movie = peliculas.find( (pelicula) => pelicula.id == idM )   ;
       console.log(movie)
      
      res.render("movies/detallePelicula", { movie} )
    },



  noticia: (req, res) => {
    res.render(path.resolve(__dirname, '../views/movies/noticias.ejs'));
  },

  peliculas2023: (req, res) => {
    res.render(path.resolve(__dirname, '../views/movies/peliculas2023.ejs'));
  },

  /* peliculas estrenos*/
  estrenos: (req, res) => {
    res.render(path.resolve(__dirname, '../views/movies/estrenos.ejs'))
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

  /* las 5 mejores peliculas*/

  barbie: (req, res) => {
    res.render(path.resolve(__dirname, '../views/movies/las5mejorespelis/barbie.ejs'))
  },

  flash: (req, res) => {
    res.render(path.resolve(__dirname, '../views/movies/las5mejorespelis/flash.ejs'))
  },

  lasirenita: (req, res) => {
    res.render(path.resolve(__dirname, '../views/movies/las5mejorespelis/lasirenita.ejs'))
  },

  rapidoyfuriosox: (req, res) => {
    res.render(path.resolve(__dirname, '../views/movies/las5mejorespelis/rapido-y-furioso-x.ejs'))
  },

  transformers: (req, res) => {
    res.render(path.resolve(__dirname, '../views/movies/las5mejorespelis/transformers.ejs'))
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

  /* rutas carpetas top MOVIES2023*/
    movies2023: (req, res) => {
    const idM = req.params.idMovies;
    let movie;

    for (let obj of noticiasPelis) {
      if (obj.id == idM) {
        movie = obj;
        break;
      }
    }

    res.render("movies/movies2023/noticiasMasVistas", {datos: movie})

  }


  /*Avatar2023: (req, res) => {
    res.render(path.resolve(__dirname, '../views/movies/movies2023/avatar2023.ejs'))
  },
  Exorsista: (req, res) => {
    res.render(path.resolve(__dirname, '../views/movies/movies2023/elexorsista.ejs'))
  },
  Mario2023: (req, res) => {
    res.render(path.resolve(__dirname, '../views/movies/movies2023/mario2023.ejs'))
  },
  Johnwick4: (req, res) => {
    res.render(path.resolve(__dirname, '../views/movies/movies2023/elexorsista.ejs'))
  },
  Laherederadelamafia: (req, res) => {
    res.render(path.resolve(__dirname, '../views/movies/movies2023/lahedereda.ejs'))
  }*/


};

module.exports = controlador;