function imagenFilm(sequelize, Datatypes) {

    alias = 'imagenFilm';

    cols = {
        id: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        
        id_productoFilm:
            { type: Datatypes.INTEGER },

        id_imagenFilm:
            { type: Datatypes.INTEGER },

    }

    // Timestamps
    config = { tableName: "imagenFilm", timestamps: false };

    const imagenFilm = sequelize.define(alias, cols, config)

    return imagenFilm;

} module.exports = imagenFilm;