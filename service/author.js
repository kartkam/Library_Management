const Author = require('../models').Author;

module.exports.create = async (first_name, family_name, date_of_birth, date_of_death, cb) => {
    authordetail = {first_name:first_name , family_name: family_name }
    if (date_of_birth != false) authordetail.date_of_birth = date_of_birth
    if (date_of_death != false) authordetail.date_of_death = date_of_death
     
    var author = await Author.create(authordetail);
    author = author.get({ plain: true });
    cb(null,author);
    
}

