function director(sequelize, Datatypes) {

    alias = 'director';

    cols = {
        id: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        nombre:
            { type: Datatypes.STRING(50) },

    }

    // Timestamps
    config = { tableName: "director", timestamps: false };

    const director = sequelize.define(alias, cols, config)

    director.associate = function (models) {
        director.belongsToMany(models.productoFilm, {
            as: 'productoFilm',
            through: 'directorFilm', // tabla intermedia
            foreignKey: 'id_director', // es el FK del modelo en el que estoy
            otherKey: 'id_productoFilm'// es el FK del otro modelo
        })
    }

    return director;

} module.exports = director;