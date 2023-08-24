function guionistaFilm(sequelize, Datatypes) {

    alias = 'guionistaFilm';

    cols = {
        id: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        id_productoFilm:
            { type: Datatypes.INTEGER },

        id_guionista:
            { type: Datatypes.INTEGER },

    }

    // Timestamps
    config = { tableName: "guionistaFilm", timestamps: false };

    const guionistaFilm = sequelize.define(alias, cols, config)

    return guionistaFilm;

} module.exports = guionistaFilm;