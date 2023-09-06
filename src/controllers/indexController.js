//base de datos conexion
let db = require("../database/models");
const { Op } = require('sequelize');


const indexController = {
  index: async (req, res) => {
    try {
       {
      let movie = await db.productoFilm.findAll ({
            limit: 5,
            order: [['fecha_estreno', 'DESC']] // Ordenar por fecha de estreno en orden descendente.}
          })
       
       console.log("hola", movie);  

          // Consulta para encontrar películas con nombres específicos.
      const peliculasSlide = await db.productoFilm.findAll({
        where: {
          nombre: {
            [Op.or]: ["The Flash", "Barbie", "La sirenita", "Transformers: el despertar de las bestias", "Rápidos y Furiosos x"]
          }
        },
        order: [['fecha_estreno', 'ASC']] // Ordenar por fecha de estreno en orden ascendente.
      });

      
      res.render("index", { peliculasSlide: peliculasSlide, movie: movie });
    }} catch (error) {
      console.log(error) }
    }    
    };



module.exports = indexController;


        //res.render(path.resolve(__dirname, '../views/index.ejs'), { datos: noticiasPelis, masEsperadas: slideNoticia });
    

