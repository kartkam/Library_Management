const Genre = require('../models').Genre;

module.exports.create = async (name, cb) => {
   
    var genre = await Genre.create({ name: name });
    genre = genre.get({ plain: true });
    cb(null,genre);
}


// Display list of all Genre.
exports.genre_list = function(req, res, next) {
    Genre.findAll({
        
    })
    .then(function(genreList){
        genreList = genreList.map(genre => genre.get({ plain: true }));
        res.render('genre_list', {title: 'Genre List', genre_list: genreList});
    })
    .catch(error => {
        next(error);
    })
};

// Display detail page for a specific Genre.
exports.genre_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre detail: ' + req.params.id);
};

// Display Genre create form on GET.
exports.genre_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre create GET');
};

// Handle Genre create on POST.
exports.genre_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre create POST');
};

// Display Genre delete form on GET.
exports.genre_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre delete GET');
};

// Handle Genre delete on POST.
exports.genre_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre delete POST');
};

// Display Genre update form on GET.
exports.genre_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre update GET');
};

// Handle Genre update on POST.
exports.genre_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre update POST');
};