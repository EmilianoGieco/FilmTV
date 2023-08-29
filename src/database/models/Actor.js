function actor(sequelize, Datatypes) {

    alias = 'actor';

    cols = {
        id: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        nombre:
            { type: Datatypes.STRING(100) },

    }

    // Timestamps
    config = { tableName: "actor", timestamps: false };

    const actor = sequelize.define(alias, cols, config)

    actor.associate = function (models) {
        actor.belongsToMany(models.productoFilm, {
            as: 'productoFilm',
            through: 'actorFilm', // tabla intermedia
            foreignKey: 'id_actor', // es el FK del modelo en el que estoy
            otherKey: 'id_productoFilm'// es el FK del otro modelo 
        })
    }

    return actor;

} module.exports = actor;

