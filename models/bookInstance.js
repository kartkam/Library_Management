const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {

    const BookInstance = sequelize.define('BookInstance',{
        id : {
            type : DataTypes.UUID,
            primaryKey : true,
            defaultValue: DataTypes.UUIDV4
        },
        book_id : DataTypes.UUID,
        imprint : DataTypes.STRING,
        status : {
            type: DataTypes.ENUM('Available', 'Maintenance', 'Loaned', 'Reserved'),
            defaultValue: 'Maintenance'
        },
        due_back : {
            type: DataTypes.DATE,
            defaultValue: Sequelize.NOW
        },
        url : DataTypes.STRING
    },{
        tableName : 'BookInstance',
        timestamps: false
    })

    BookInstance.associate = (models) => {
        // associations can be defined here

        BookInstance.belongsTo(models.Book,{
            foreignKey : 'book_id'
        });

    }

    return BookInstance;
}