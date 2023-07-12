const path = require('path');

const controlador = {
    usuario: (req, res) => {
        res.render(path.resolve(__dirname, '../views/user/login.ejs'));
    },

   registro: (req, res) => {
        res.render(path.resolve(__dirname, '../views/user/register.ejs'));
    }
 
};

module.exports = controlador;