const Genre = require('../models').Genre;
const Book = require('../models').Book;
const { body,validationResult } = require("express-validator");

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
exports.genre_detail = function(req, res, next) {
    Genre.findOne({
        where: {
            id : req.params.id
        },
        include : [
            {
                model : Book,
                as : 'book_details'
            }

        ]
    })
    .then(function(genre){

        if(genre == null){
            var err = new Error('Genre not found');
            err.status = 404;
            return next(err);
        }

        genre = genre.get({ plain : true });
        res.render('genre_detail', {title: 'Genre Detail', genre: genre});
    })
    .catch(error => {
        return next(error);
    });
    
};

// Display Genre create form on GET.
exports.genre_create_get = function(req, res) {
    res.render('genre_form', { title: 'Create Genre'});
};

// Handle Genre create on POST.
exports.genre_create_post = [
    
    // Validate and santise the name field.
    body('name', 'Genre name required').trim().isLength({ min: 1 }).escape(),
    
    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        //Create a genre object with escaped and trimmed data.
        var request_genre = {
            name : req.body.name
        }

        if(!errors.isEmpty()){
            // There are errors. Render the form again with sanitized values/error messages.
            res.render('genre_form', { title: 'Create genre', genre: request_genre, errors: errors.array()});
            return;
        }
        else {
            // Data from form is valid.
            // Check if Genre with same name already exists.
            Genre.findOne({
                where: {
                    name: req.body.name
                }
            })
            .then(function(found_genre){
                if(found_genre){
                    // Genre exists, redirect to its detail page.
                    found_genre = found_genre.get({plain: true});
                    res.redirect(found_genre.url)
                } else {
                    Genre.create(request_genre)
                    .then(genreData => {
                        // Genre saved. Redirect to genre detail page.
                        res.redirect(genreData.url);
                    })
                    .catch(error => {
                        return next(error);
                    });
                }
            })
            .catch(error => {
                return next(error);
            });
        }
        
    }
]

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