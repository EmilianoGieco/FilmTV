function plataforma(sequelize, Datatypes) {

    alias = 'plataforma';

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
    config = { tableName: "plataforma", timestamps: false };

    const plataforma = sequelize.define(alias, cols, config)

    plataforma.associate = function (models) {
        plataforma.belongsToMany(models.productoFilm, {
            as: 'productoFilm',
            through: 'plataformaFilm', // tabla intermedia
            foreignKey: 'id_plataforma', // es el FK del modelo en el que estoy
            otherKey: 'id_productoFilm'// es el FK del otro modelo
        })
    }

    return plataforma;

} module.exports = plataforma;