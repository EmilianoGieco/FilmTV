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

  //////////////////////////////////
  procesarlogin: async (req, res) => {

    //validaciones de login
    try {
      const resultValidation = validationResult(req);
      if (resultValidation.errors.length > 0) {
        console.log("hola3")
        return res.render('./user/login', {
          errors: resultValidation.mapped(),
          old: req.body
        });
      }
      console.log("hola2")
      //buscar usuario
      const userToLogin = await db.usuario.findOne({ where: { correo: req.body.email } });
      if (!userToLogin) {
        console.log("hola4")
        return res.render('./user/login', {
          errors: { email: { msg: 'El email con el que intenta ingresar no existe' } }
        });
      }
      
      console.log(req.body.password)
      
      //comparar contraseñas
      const correctPassword = bcryptjs.compareSync(req.body.password, userToLogin.clave);
      console.log("hola0")
      if (correctPassword) {
        req.session.userLogged = userToLogin;
        console.log("hola")

        if (req.body.remember) {
          res.cookie('userEmail', req.body.email, { maxAge: (((1000 * 60) * 60) * 24) });
        }
        return res.redirect("./perfilUsuario");

      } else {
        return res.render('./user/login', {
          errors: { password: { msg: 'Contraseña incorrecta' } },
          old: req.body
        });
      }

      //busqueda de errores
    } catch (error) {
      console.log(error.message);
    }
  },

  ///////////////////
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
        nombre: req.body.nombreUsuario,
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
