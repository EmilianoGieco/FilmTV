function productora(sequelize, Datatypes) {

    alias = 'productora';

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
    config = { tableName: "productora", timestamps: false };

    const productora = sequelize.define(alias, cols, config)

    productora.associate = function (models) {
        productora.belongsToMany(models.productoFilm, {
            as: 'productoFilm',
            through: 'productoraFilm', // tabla intermedia
            foreignKey: 'id_productora', // es el FK del modelo en el que estoy
            otherKey: 'id_productoFilm'// es el FK del otro modelo
        })
    }

    return productora;

} module.exports = productora;