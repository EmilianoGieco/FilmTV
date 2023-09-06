//base de datos conexion
let db = require("../database/models");
const { Op } = require('sequelize');


const indexController = {
  index: async (req, res) => {
    try {
      let movie = null;

      if (req.params.id) {
        movie = await db.productoFilm.findByPk(req.params.id);

        if (!movie) {
          console.log('Película no encontrada');
        }
      }
      // Consulta para encontrar películas con nombres específicos.
      const peliculasSlide = await db.productoFilm.findAll({
        where: {
          nombre: {
            [Op.or]: ["The Flash", "Barbie", "La sirenita", "Transformers: el despertar de las bestias", "Rápidos y Furiosos x"]
          }
        },
        order: [['fecha_estreno', 'ASC']] // Ordenar por fecha de estreno en orden ascendente.
      });

      console.log(movie);

      res.render("index", { peliculasSlide: peliculasSlide, movie: movie });
    } catch (error) {
      console.error('Error en indexController:', error);
      // Maneja el error adecuadamente (por ejemplo, muestra una página de error)
      res.render('error', { message: 'Error al cargar la página' });
    }
  },
};


module.exports = indexController;


        //res.render(path.resolve(__dirname, '../views/index.ejs'), { datos: noticiasPelis, masEsperadas: slideNoticia });


