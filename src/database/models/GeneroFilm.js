function generoFilm(sequelize, Datatypes) {

    alias = 'generoFilm';

    cols = {
        id: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        id_productoFilm:
            { type: Datatypes.INTEGER },

        id_genero:
            { type: Datatypes.INTEGER },

    }

    // Timestamps
    config = { tableName: "generoFilm", timestamps: false };

    const generoFilm = sequelize.define(alias, cols, config)

    return generoFilm;

} module.exports = generoFilm;