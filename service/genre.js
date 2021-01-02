const Genre = require('../models').Genre;

module.exports.create = async (name, cb) => {
   
    var genre = await Genre.create({ name: name });
    genre = genre.get({ plain: true });
    cb(null,genre);
}