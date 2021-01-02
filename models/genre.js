module.exports = (sequelize, DataTypes) => {

    const Genre = sequelize.define('Genre',{
        id : {
            type : DataTypes.UUID,
            primaryKey : true,
            defaultValue: DataTypes.UUIDV4
        },
        name : DataTypes.STRING,
        url : DataTypes.STRING
    },{
        tableName : 'Genre',
        timestamps: false
    })

    Genre.associate = (models) => {
        // associations can be defined here

        Genre.belongsToMany(models.Book, {
            through: models.GenreAndBook,
            foreignKey: 'genre_id'
        })

    }

    return Genre;
}