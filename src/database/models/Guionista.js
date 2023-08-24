function guionista(sequelize, Datatypes) {

    alias = 'guionista';

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
    config = { tableName: "guionista", timestamps: false };

    const guionista = sequelize.define(alias, cols, config)

    guionista.associate = function (models) {
        guionista.belongsToMany(models.productoFilm, {
            as: 'productoFilm',
            through: 'guionistaFilm', // tabla intermedia
            foreignKey: 'id_guionista', // es el FK del modelo en el que estoy
            otherKey: 'id_productoFilm'// es el FK del otro modelo
        })
    }

    return guionista;

} module.exports = guionista;