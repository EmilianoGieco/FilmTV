function usuario(sequelize, DataTypes) {

    alias = 'usuario';

    cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        nombre:
            { type: DataTypes.STRING(255) },

        correo:
            { type: DataTypes.STRING(255) },

        clave:
            { type: DataTypes.STRING(255) },

        administrador:
            { type: DataTypes.BOOLEAN },

        imagen:
            { type: DataTypes.STRING(255) },

    }
    
  
    // Timestamps
    config = { tableName: "usuario", timestamps: false };

    const usuario1 = sequelize.define(alias, cols, config)

    usuario1.associate = function (models) {
        usuario1.hasMany(models.calificacion, {
            as: 'calificacion',
            foreignKey: "usuario_id"
        })
    }

    return usuario1;

} module.exports = usuario;


