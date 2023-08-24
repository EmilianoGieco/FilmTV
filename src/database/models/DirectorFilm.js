function directorFilm(sequelize, Datatypes) {

    alias = 'directorFilm';

    cols = {
        id: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        id_productoFilm:
            { type: Datatypes.INTEGER },

        id_director:
            { type: Datatypes.INTEGER },

    }

    // Timestamps
    config = { tableName: "directorFilm", timestamps: false };

    const directorFilm = sequelize.define(alias, cols, config)

    return directorFilm;

} module.exports = directorFilm;