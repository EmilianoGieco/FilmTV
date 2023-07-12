const path = require('path');
let noticiasPelis = require(".././data/noticiasPelis.json");
const { noticia } = require('./peliculaController');


const controlador = {

    index: (req, res) => {
        
        res.render(path.resolve(__dirname, '../views/index.ejs'), { datos: noticiasPelis });
    }
};

module.exports = controlador;