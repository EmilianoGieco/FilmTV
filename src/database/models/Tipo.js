function tipo(sequelize, Datatypes) {

    alias = 'tipo';

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
    config = { tableName: "tipo", timestamps: false };

    const tipo = sequelize.define(alias, cols, config)

    tipo.associate = function (models) {
        tipo.hasMany(models.productoFilm, {
            as: 'productoFilm',
            foreignKey: "id_tipo"
        })
    }

    return tipo;

} module.exports = tipo;