function productoraFilm(sequelize, Datatypes) {

    alias = 'productoraFilm';

    cols = {
        id: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        id_productoFilm:
            { type: Datatypes.INTEGER },

        id_productora:
            { type: Datatypes.INTEGER },

    }

    // Timestamps
    config = { tableName: "productoraFilm", timestamps: false };

    const productoraFilm = sequelize.define(alias, cols, config)

    return productoraFilm;

} module.exports = productoraFilm;