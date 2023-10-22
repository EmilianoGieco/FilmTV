//base de datos conexion
const db = require("../database/models");
const { Op } = require('sequelize');


const indexController = {
  index: async (req, res) => {
    try {

      //const isAdmin = req.session.userLogged && req.session.userLogged.admin === 1;
      
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
        
      

       console.log("User en controlador index:", req.session.userLogged);

       res.render("index", { peliculasSlide, movie, fotoPerfil: req.session.userLogged || null });


    } catch (error) {
      console.log(error);
    }
  },

  fotoPerfil: async (req, res) => {
    try {
      // Obtiene el id del usuario desde la sesión
      const userId = req.session.userLogged ? req.session.userLogged.id : null;
  
      // Consulta para obtener la información del usuario por su id
      const fotoPerfil = await db.usuario.findByPk(userId);
  
      // Renderiza la vista con la información del usuario
      res.render("fotoPerfil", { fotoPerfil });
    } catch (error) {
      console.log(error);
      res.status(500).send("Error en el servidor");
    }
  },



  buscar: async (req, res) => {
    try {
      const { busqueda } = req.body;

      // Realiza la búsqueda en la base de datos utilizando el valor de "busqueda"
      const resultados = await db.productoFilm.findAll({
        where: {
          nombre: {
            [Op.like]: `%${busqueda}%` // Buscar nombres que contengan la cadena de búsqueda
          }
        }
      });

      res.render("resultado", { resultados }); // Renderiza una página de resultados con los datos encontrados
    } catch (error) {
      console.log(error);
    }
  }
};

  

  


module.exports = indexController;






