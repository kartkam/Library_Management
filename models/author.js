module.exports = (sequelize, DataTypes) => {

    const Author = sequelize.define('Author',{
        id : {
            type : DataTypes.UUID,
            primaryKey : true,
            defaultValue: DataTypes.UUIDV4
        },
        first_name : DataTypes.STRING,
        family_name : DataTypes.STRING,
        date_of_birth : DataTypes.DATE,
        date_of_death : DataTypes.DATE,
        name : DataTypes.STRING,
        lifespan : DataTypes.STRING,
        url : DataTypes.STRING
    },{
        tableName : 'Author',
        timestamps: false
    })

    Author.associate = (models) => {
        // associations can be defined here

        Author.hasMany(models.Book, {
            foreignKey : 'author_id'
        })
    }

    return Author;
}