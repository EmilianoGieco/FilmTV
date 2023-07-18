const path = require('path');
let noticiasPelis = require(".././data/noticiasPelis.json");
const { noticia } = require('./peliculaController');
let slideNoticia = require(".././data/slide.json");

const controlador = {

    index: (req, res) => {

        res.render(path.resolve(__dirname, '../views/index.ejs'), { datos: noticiasPelis, masEsperadas: slideNoticia });
    }
};

module.exports = controlador;