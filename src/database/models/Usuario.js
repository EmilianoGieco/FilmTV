function usuario(sequelize, Datatypes) {

    alias = 'usuario';

    cols = {
        id: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        nombre:
            { type: Datatypes.STRING(50) },

        correo:
            { type: Datatypes.STRING(50) },

        clave:
            { type: Datatypes.STRING(50) },

        administrador:
            { type: Datatypes.STRING.BINARY },

        imagen:
            { type: Datatypes.STRING(100) },

    }


    // Timestamps
    config = { tableName: "Usuario", timestamps: false };

    const usuario = sequelize.define(alias, cols, config)

    usuario.associate = function (models) {
        usuario.hasMany(models.calificacion, {
            as: 'calificacion',
            foreignKey: "usuario_id"
        })
    }

    return usuario;

} module.exports = usuario;


