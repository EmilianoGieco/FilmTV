function plataformaFilm(sequelize, Datatypes) {

    alias = 'plataformaFilm';

    cols = {
        id: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        id_productoFilm:
            { type: Datatypes.INTEGER },

        id_plataforma:
            { type: Datatypes.INTEGER },

    }

    // Timestamps
    config = { tableName: "plataformaFilm", timestamps: false };

    const plataformaFilm = sequelize.define(alias, cols, config)

    return plataformaFilm;

} module.exports = plataformaFilm;