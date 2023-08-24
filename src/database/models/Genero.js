function genero(sequelize, Datatypes) {

    alias = 'genero';

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
    config = { tableName: "genero", timestamps: false };

    const genero = sequelize.define(alias, cols, config)

    genero.associate = function (models) {
        genero.belongsToMany(models.productoFilm, {
            as: 'productoFilm',
            through: 'generoFilm', // tabla intermedia
            foreignKey: 'id_genero', // es el FK del modelo en el que estoy
            otherKey: 'id_productoFilm'// es el FK del otro modelo
        })
    }

    return genero;

} module.exports = genero;

