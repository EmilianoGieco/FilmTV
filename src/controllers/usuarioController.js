//const { log } = require('console');
const bcryptjs = require('bcryptjs');
//const path = require('path');
const { validationResult } = require('express-validator');
const User = require('../../models/User');
//const { error } = require('console');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');


//cloudinary

          
cloudinary.config({ 
  cloud_name: 'dlimugyad', 
  api_key: '232418438234228', 
  api_secret: 'APayZJi7Qqs1U4CbQS2gkE6h1k4' 
});


const controlador = {
    usuario: (req, res) => {
        res.render('./user/login');
    },

    procesarlogin: (req, res) => {
        const usuarioLogueo = User.findByField('email', req.body.email);

        if (usuarioLogueo) {
            let contrasenaOk = bcryptjs.compareSync(req.body.password, usuarioLogueo.password);
            if (contrasenaOk) {
                //eliminacion de la contraseña en sesion para seguridad
                delete usuarioLogueo.password;
                req.session.userLogged = usuarioLogueo;

                if(req.body.recordarUsuario) {
					res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
				}

                return res.redirect("perfilUsuario");
            } else {

                return res.render('./user/login', {
                    errors: {
                        password: {
                            msg: "Contraseña incorrecta"
                        }
                    },
                    oldData: req.body
                });
            }
        }
        else {

            return res.render('./user/login', {
                errors: {
                    email: {
                        msg: "el email con el que intenta ingresar no existe"
                    }
                },
            });
        }
    },

    registro: (req, res) => {
        res.render('./user/register');
    },
    procesarRegistro: (req, res) => {
      const imageBuffer = req.file.buffer;
      const customFilename = '';
    
      const stream = cloudinary.uploader.upload_stream({ resource_type: 'image', public_id: customFilename}, (error, result) => {
        if (error) {
          console.error('Error:', error);
          return res.render('user/register', {
            errors: {
              imagen: {
                msg: "Error al subir la imagen"
              }
            },
            oldData: req.body
          });
        }
    
   
        const validaciones = validationResult(req);
        const errors = validaciones.mapped();
    
        if (!validaciones.isEmpty()) {
          return res.render('user/register', {
            errors: errors,
            oldData: req.body
          });
        }
    
        let usuarioBD = User.findByField("email", req.body.email);
    
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
    
        let usuarioCreacion = {
          ...req.body,
          password: bcryptjs.hashSync(req.body.password, 10),
          imagen: result.secure_url         
        };
    
        let nuevoUsuario = User.create(usuarioCreacion);
        return res.render('user/login');
      });
    
      streamifier.createReadStream(imageBuffer).pipe(stream);
  },
  
    perfilUsuario: (req, res) => {
        console.log(req.cookies.userEmail)
        return res.render("./user/perfilUsuario", {
            user: req.session.userLogged
        });
    },

    getCrearFilm: (req, res) => {
        res.render('./user/CrearFilm')
    },

    postCrearFilm: function (req, res) {

        console.log(req.body)
    },

    cerrarSesion:function (req, res) {
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect("/")
       
    }
};

module.exports = controlador;