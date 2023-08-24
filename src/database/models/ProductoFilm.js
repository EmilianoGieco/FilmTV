function productoFilm(sequelize, Datatypes) {

    alias = 'productoFilm';

    cols = {
        id: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        nombre:
            { type: Datatypes.STRING(255) },

        duracion:
            { type: Datatypes.INTEGER(3) },

        resumen:
            { type: Datatypes.STRING(255) },

        critica:
            { type: Datatypes.STRING(255) },

        fecha_estreno:
            { type: Datatypes.DATE },

        fecha_creacion:
            { type: Datatypes.DATE },

        fecha_modificacion:
            { type: Datatypes.DATE },

        fecha_modificacion:
            { type: Datatypes.DATE },

        fecha_baja:
            { type: Datatypes.DATE },

        temporada:
            { type: Datatypes.INTEGER(2) },

        id_tipo:
            { type: Datatypes.INTEGER },

    }

    // Timestamps
    config = { tableName: "productoFilm", timestamps: false };

    const productoFilm = sequelize.define(alias, cols, config)

    productoFilm.associate = function (models) {
        productoFilm.belongsTo(models.tipo, {
            as: 'tipo',
            foreignKey: "id_tipo"
        })
    },

        productoFilm.associate = function (models) {
            productoFilm.hasMany(models.calificacion, {
                as: 'calificacion',
                foreignKey: "id_productoFilm"
            })
        },

        productoFilm.associate = function (models) {
            productoFilm.belongsToMany(models.actor, {
                as: 'actor',
                through: 'actorFilm', // tabla intermedia
                foreignKey: 'id_productoFilm', // es el FK del modelo en el que estoy
                otherKey: 'id_actor'// es el FK del otro modelo
            })
        },

        productoFilm.associate = function (models) {
            productoFilm.belongsToMany(models.genero, {
                as: 'genero',
                through: 'generoFilm', // tabla intermedia
                foreignKey: 'id_productoFilm', // es el FK del modelo en el que estoy
                otherKey: 'id_genero'// es el FK del otro modelo
            })
        },

        productoFilm.associate = function (models) {
            productoFilm.belongsToMany(models.productora, {
                as: 'productora',
                through: 'productoraFilm', // tabla intermedia
                foreignKey: 'id_productoFilm', // es el FK del modelo en el que estoy
                otherKey: 'id_productora'// es el FK del otro modelo
            })
        },

        productoFilm.associate = function (models) {
            productoFilm.belongsToMany(models.director, {
                as: 'director',
                through: 'directorFilm', // tabla intermedia
                foreignKey: 'id_productoFilm', // es el FK del modelo en el que estoy
                otherKey: 'id_director' // es el FK del otro modelo
            })
        },

        productoFilm.associate = function (models) {
            productoFilm.belongsToMany(models.guionista, {
                as: 'guionista',
                through: 'guionistaFilm', // tabla intermedia
                foreignKey: 'id_productoFilm', // es el FK del modelo en el que estoy
                otherKey: 'id_guionista' // es el FK del otro modelo
            })
        },

        productoFilm.associate = function (models) {
            productoFilm.belongsToMany(models.plataforma, {
                as: 'plataforma',
                through: 'plataformaFilm', // tabla intermedia
                foreignKey: 'id_productoFilm', // es el FK del modelo en el que estoy
                otherKey: 'id_plataforma' // es el FK del otro modelo
            })
        }

    return productoFilm;

} module.exports = productoFilm;
