const models = require('../models');

module.exports = (sequelize, DataTypes) => {

    const GenreAndBook = sequelize.define('GenreAndBook',{
        genre_id : {
            type : DataTypes.UUID,
            references : {
                model : models.Genre,
                key : 'id'
            }
        },
        book_id : {
            type : DataTypes.UUID,
            references : {
                model : models.Book,
                key : 'id'
            }
        }
    },{
        tableName : 'GenreAndBook',
        timestamps: false
    })

    return GenreAndBook;
}