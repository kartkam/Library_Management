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
        name : {
            type: DataTypes.VIRTUAL,
            get() {
                return `${this.family_name}, ${this.first_name}`;
            },
            set(value) {
                throw new Error('Do not try to set `fullName` value!');
            }
        },
        lifespan : DataTypes.STRING,
        url : {
            type : DataTypes.VIRTUAL,
            get() {
                return `/catalog/author/${this.id}`;
            },
            set(value) {
                throw new Error('Do not try to set `url` value!');
            }            
        }
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