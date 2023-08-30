function imagen(sequelize, Datatypes) {

    alias = 'imagen';

    cols = {
        id: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        nombre:
            { type: Datatypes.STRING(150) },

    }

    // Timestamps
    config = { tableName: "imagen", timestamps: false };

    const imagen = sequelize.define(alias, cols, config)

    imagen.associate = function (models) {
        imagen.belongsToMany(models.productoFilm, {
            as: 'productoFilm',
            through: 'imagenFilm', // tabla intermedia
            foreignKey: 'id_imagenFilm', // es el FK del modelo en el que estoy
            otherKey: 'id_productoFilm'  // es el FK del otro modelo
        })
    }


    return imagen;

} module.exports = imagen;