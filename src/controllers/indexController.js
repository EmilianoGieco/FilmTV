
//base de datos conexion
let db = require("../database/models");
const { Op } = require('sequelize');

const controlador = {

    index: async(req, res) => {
            try {
              // Consulta para encontrar películas con nombres específicos.
            await db.productoFilm.findAll({
                where: {
                  nombre: {
                    [Op.or]: ["The Flash", "Barbie", "La sirenita", "Transformers: el despertar de las bestias", "Rapidos y Furiosos x"]
                  }
                },
                order: [['fecha_estreno', 'ASC']] // Ordenar por fecha de estreno en orden ascendente.
              })
              // Renderizar la vista y los resultados a la plantilla.
              .then(function (peliculasSlide) {
                return res.render("index", { peliculasSlide: peliculasSlide });
              });
            } catch (error) {
              console.log(error);
            }
            
          }

        //res.render(path.resolve(__dirname, '../views/index.ejs'), { datos: noticiasPelis, masEsperadas: slideNoticia });
    };

module.exports = controlador;