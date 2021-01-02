module.exports = (sequelize, DataTypes) => {

    const Book = sequelize.define('Book',{
        id : {
            type : DataTypes.UUID,
            primaryKey : true,
            defaultValue: DataTypes.UUIDV4
        },
        title : DataTypes.STRING,
        author_id : DataTypes.UUID,
        summary : DataTypes.STRING,
        isbn : DataTypes.STRING,
        url : DataTypes.STRING
    },{
        tableName : 'Book',
        timestamps: false
    })

    Book.associate = (models) => {
        // associations can be defined here

        Book.belongsTo(models.Author,{
            foreignKey : 'author_id'
        });

        Book.hasMany(models.BookInstance,{
            foreignKey : 'book_id'
        });

        Book.belongsToMany(models.Genre, {
            through: models.GenreAndBook,
            foreignKey : 'book_id'
        })

    }

    return Book;
}