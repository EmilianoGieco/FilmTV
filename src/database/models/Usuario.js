function usuario(sequelize, Datatypes) {

    alias = 'usuario';

    cols = {
        id: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        nombre:
            { type: Datatypes.STRING(255) },

        correo:
            { type: Datatypes.STRING(255) },

        clave:
            { type: Datatypes.STRING(255) },

        administrador:
            { type: Datatypes.STRING.BINARY },

        imagen:
            { type: Datatypes.STRING(255) },

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


