const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

//base de datos conexion
let db = require("../database/models");

// Configuración de Cloudinary
cloudinary.config({
  cloud_name: 'dlimugyad',
  api_key: '232418438234228',
  api_secret: 'APayZJi7Qqs1U4CbQS2gkE6h1k4'
});

const controlador = {
  usuario: (req, res) => {
    res.render('./user/login');
  },

  procesarlogin: async (req, res) => {
    const usuarioLogueo = await db.usuario.findOne(
      { where: { correo: req.body.email } });
  
    if (usuarioLogueo) {
      if (usuarioLogueo.clave) {
        let contrasenaOk = bcryptjs.compareSync(req.body.password, usuarioLogueo.clave);
        if (contrasenaOk) {
          // Eliminación de la contraseña en la sesión para seguridad
          delete usuarioLogueo.clave; 
          req.session.userLogged = usuarioLogueo;
  
          if (req.body.recordarUsuario) {
            res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
          }
          // Redireccionar directamente al perfil del usuario
          return res.redirect("/perfilUsuario"); 

        } else {
          // Eliminar la contraseña en el caso de un inicio de sesión fallido
          delete req.body.password;
  
          return res.render('./user/login', {
            errors: {
              password: {
                msg: "Contraseña incorrecta"
              }
            },
            oldData: req.body
          });
        }
      } else {
        return res.render('./user/login', {
          errors: {
            email: {
              msg: "El email con el que intenta ingresar no existe"
            }
          },
        });
      }}
  },
  
  registro: (req, res) => {
    res.render('./user/register');
  },

  procesarRegistro: async (req, res) => {
    try {
      const validaciones = validationResult(req);
      const errors = validaciones.array();

      if (errors.length > 0) {
        return res.render('user/register', {
          errors: errors,
          oldData: req.body
        });
      }

      const usuarioBD = await db.usuario.findOne({ where: { correo: req.body.email } });

      if (usuarioBD) {
        return res.render('user/register', {
          errors: {
            email: {
              msg: "Este email ya está registrado"
            }
          },
          oldData: req.body
        });
      }

      const hashedPassword = bcryptjs.hashSync(req.body.password, 10);

      // Subir imagen a Cloudinary
      const imageBuffer = req.file.buffer;
      const customFilename = ''; // Personaliza el nombre del archivo según tus necesidades

      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({ resource_type: 'image', public_id: customFilename }, (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        });
        streamifier.createReadStream(imageBuffer).pipe(stream);
      });

      const nuevoUsuario = await db.usuario.create({
        nombre:req.body.nombreUsuario,
        correo: req.body.email,
        clave: hashedPassword,
        imagen: result.secure_url // Almacena la URL de la imagen de Cloudinary en la base de datos
      });

      // Crear la sesión del usuario después del registro
      req.session.userLogged = nuevoUsuario; // Asigna el usuario recién creado a la sesión

      return res.render('user/login');
    } catch (error) {
      console.error(error);
      return res.status(500).send("Error en el servidor");
    }
  },

  perfilUsuario: (req, res) => {
    console.log(req.cookies.userEmail)
    return res.render("./user/perfilUsuario", {
      user: req.session.userLogged
    });
  },

  postCrearFilm: function (req, res) {
    console.log(req.body)
  },

  cerrarSesion: function (req, res) {
    res.clearCookie('userEmail');
    req.session.destroy();
    return res.redirect("/")
  }
};

module.exports = controlador;
