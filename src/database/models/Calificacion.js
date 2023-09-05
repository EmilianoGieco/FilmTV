function calificacion(sequelize, Datatypes) {

    alias = 'calificacion';

    cols = {
        id: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        calificacion:
            { type: Datatypes.INTEGER(10) },

        id_productoFilm:
            { type: Datatypes.INTEGER },

        usuario_id:
            { type: Datatypes.INTEGER },

    }


    // Timestamps
    config = { tableName: "Calificación", timestamps: false };

    const calificacion = sequelize.define(alias, cols, config)

    calificacion.associate = function (models) {
        calificacion.belongsTo(models.productoFilm, {
            as: 'productoFilm',
            foreignKey: "id_productoFilm"
        });

        calificacion.belongsTo(models.usuario, {
            as: 'usuario',
            foreignKey: "usuario_id"
        })

    }



    return calificacion;

} module.exports = calificacion;