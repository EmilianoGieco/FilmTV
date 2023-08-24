function actorFilm(sequelize, Datatypes) {

    alias = 'actorFilm';

    cols = {
        id: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        id_productoFilm:
            { type: Datatypes.INTEGER },

        id_actor:
            { type: Datatypes.INTEGER },

    }

    // Timestamps
    config = { tableName: "actorFilm", timestamps: false };

    const actorFilm = sequelize.define(alias, cols, config)

    return actorFilm;

} module.exports = actorFilm;