//base de datos conexion
const db = require("../database/models");
const { Op } = require('sequelize');

const indexController = {
  index: async (req, res) => {
    try {

      /*const usuario = await db.Usuario.findOne({
        where: { correo: "emiliano_jobs@hotmail.com" }
      });*/

      // Consulta para obtener las películas más recientes
      const movie = await db.productoFilm.findAll({
        limit: 8,
        order: [['fecha_estreno', 'DESC']] // Ordenar por fecha de estreno en orden descendente.
      });

      // Consulta para encontrar películas con nombres específicos.
      const peliculasSlide = await db.productoFilm.findAll({
        where: {
          nombre: {
            [Op.or]: ["The Flash", "Barbie", "La sirenita", "Transformers: el despertar de las bestias", "Rápidos y Furiosos x"]
          }
        },
        order: [['fecha_estreno', 'ASC']] // Ordenar por fecha de estreno en orden ascendente.
      });

      res.render("index", { peliculasSlide: peliculasSlide, movie: movie});
    } catch (error) {
      console.log(error);
    }

  }
};

module.exports = indexController;






