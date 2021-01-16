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
        url : {
            type : DataTypes.VIRTUAL,
            get() {
                return `/catalog/book/${this.id}`;
            },
            set(value) {
                throw new Error('Do not try to set `url` value!');
            }            
        }
    },{
        tableName : 'Book',
        timestamps: false
    })

    Book.associate = (models) => {
        // associations can be defined here

        Book.belongsTo(models.Author,{
            foreignKey : 'author_id',
            as: 'author_details'
        });

        Book.hasMany(models.BookInstance,{
            foreignKey : 'book_id',
            as : 'book_instance_details'
        });

        Book.belongsToMany(models.Genre, {
            through: models.GenreAndBook,
            foreignKey : 'book_id',
            as : 'genre_details'
        })

    }

    return Book;
}