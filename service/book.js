var async = require('async');
var Book = require('../models').Book;
var BookInstance = require('../models').BookInstance;
var Author = require('../models').Author;
var Genre = require('../models').Genre;
var GenreAndBook = require('../models').GenreAndBook;
var db = require('../models');

const {body, validationResult } = require('express-validator');

//creating a new book
module.exports.create = async (title, summary, isbn, author, genreList, cb) => {
    var bookdetail = { 
      title: title,
      summary: summary,
      author_id: author.id,
      isbn: isbn
    }
    
    var book = await Book.create(bookdetail);
    book = book.get({ plain: true });
    
    if (genreList != false){

      for(var genreIndex =0; genreIndex < genreList.length; genreIndex++) {

        var genreAndBook = await GenreAndBook.create({
            genre_id: genreList[genreIndex].id,
            book_id: book.id
        });

      }

    } 
    
    cb(null,book);
    
  }

//home page data
exports.index = function(req, res) {

    async.parallel({
        book_count: function(callback){
            Book.count()
            .then(function(bookCount){
                callback(null,bookCount);
            });
        },
        book_instance_count: function(callback){
            BookInstance.count()
            .then(function(bookInstanceCount){
                callback(null,bookInstanceCount);
            });
        },
        book_instance_available_count: function(callback){
            BookInstance.count({
                where: {
                    status: 'Available'
                }
            })
            .then(function(bookInstanceCount){
                callback(null,bookInstanceCount);
            });
        },
        genre_count: function(callback){
            Genre.count()
            .then(function(genreCount){
                callback(null,genreCount);
            });
        },
        author_count: function(callback){
            Author.count()
            .then(function(authorCount){
                callback(null,authorCount);
            });
        }
    }, function(err,results){
        res.render('index', {title: 'Local Library Home', error: err, data: results});

    });


};

// Display list of all books.
exports.book_list = function(req, res, next) {

    Book.findAll({
        attributes:[
            'id',
            'title',
            'url'
        ],
        include: [
            {
                model: Author,
                as: 'author_details',
                attributes:[
                    'first_name',
                    'family_name',
                    'name'
                ]
            }
        ]
    })
    .then(function(bookList){
        bookList = bookList.map(book => book.get({ plain: true }));
        res.render('book_list', {title: 'Book List', book_list: bookList});
    })
    .catch(error => {
        next(error);
    })
    
};

// Display detail page for a specific book.
exports.book_detail = function(req, res, next) {
    Book.findOne({
        where: {
            id : req.params.id
        },
        include : [
            {
                model : BookInstance,
                as : 'book_instance_details'
            },
            {
                model : Genre,
                as : 'genre_details'
            },
            {
                model : Author,
                as : 'author_details'
            }

        ]
    })
    .then(function(book){

        if(book == null){
            var err = new Error('Book not found');
            err.status = 404;
            return next(err);
        }

        book = book.get({ plain : true });
        res.render('book_detail', {title: 'Book Detail', book: book});
    })
    .catch(error => {
        next(error);
    });
    
};

// Display book create form on GET.
exports.book_create_get = function(req, res, next) {
    
    // Get all authors and genres, which we can use for adding to our book.
    async.parallel({
        authors: function(callback){
            Author.findAll()
            .then(authorData => {
                authorData = authorData.map(author => author.get({ plain: true}));
                callback(null,authorData);
            })
        },
        genres: function(callback){
            Genre.findAll()
            .then(genreData => {
                genreData = genreData.map(genre => genre.get({plain: true}));
                callback(null,genreData);
            })
        }, 
    }, function(err, results) {
        if(err) {
            return next(err);
        }
        res.render('book_form', { title: 'Create Book', authors: results.authors, genres: results.genres});
    });
    
};

// Handle book create on POST.
exports.book_create_post = [
    //Convert the genre to an array.
    (req, res, next) => {
        if(!(req.body.genre instanceof Array)){
            if(typeof req.body.genre === 'undefined')
            req.body.genre = [];
            else
            req.body.genre = new Array(req.body.genre);
        }
        next();
    },

    //Validate and sanitise fields
    body('title', 'Title must not be empty.').trim().isLength({ min: 1}).escape(),
    body('author', 'Author must not be empty.').trim().isLength({ min: 1}).escape(),
    body('summary', 'Summary must not be empty.').trim().isLength({ min: 1}).escape(),
    body('isbn', 'ISBN must not be empty.').trim().isLength({ min: 1}).escape(),
    body('genre.*').escape(),

    //Process request after validation and sanitization.
    (req, res, next) => {

        //Extract the validation errors from a request.
        const errors = validationResult(req);

        if(!errors.isEmpty()){

            // Create a Book object with escaped and trimmed data.
            var book = {
                title: req.body.title,
                author: req.body.author,
                summary: req.body.summary,
                isbn: req.body.isbn,
                genre: req.body.genre
            };

            //There are errors. Render form again with sanitized values/error messages.

            //Get all author and genres for form.
            async.parallel({
                authors: function(callback){
                    Author.findAll()
                    .then(authorData => {
                        authorData = authorData.map(author => author.get({ plain: true}));
                        callback(null,authorData);
                    })
                },
                genres: function(callback){
                    Genre.findAll()
                    .then(genreData => {
                        genreData = genreData.map(genre => genre.get({plain: true}));
                        callback(null,genreData);
                    })
                }, 
            }, function(err, results) {
                if(err) {
                    return next(err);
                }

                //Mark our selected genres as checked.
                for (let i=0; i< results.genres.length; i++){
                    if(req.body.genre.indexOf(results.genres[i].id) > -1){
                        results.genres[i].checked = 'true';
                    }
                }

                res.render('book_form', { title: 'Create Book', authors: results.authors, genres: results.genres, book: book, error: errors.array() });
            });

        }
        else{
            // Data from form is valid. Save book and genreAndBook data.

            try{
                const result = db.sequelize.transaction(async (t) => {

                    //Add book entry in table
                    const book = await Book.create({
                        title: req.body.title,
                        author_id: req.body.author,
                        summary: req.body.summary,
                        isbn: req.body.isbn
                    });

                    //Map genres to the book in GenreAndBook

                    for (let i=0; i< req.body.genre.length; i++){
                        await GenreAndBook.create({
                            genre_id: req.body.genre[i],
                            book_id: book.id
                        });
                    }

                    
                    return book;

                })
                .then(bookData => {
                    bookData = bookData.get({ plain: true});
                    
                    //successful - redirect to new book record.
                    res.redirect(bookData.url);
                })

            } catch(error){
                return next(error);
            }
                       
        }
    }
]

// Display book delete form on GET.
exports.book_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Book delete GET');
};

// Handle book delete on POST.
exports.book_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Book delete POST');
};

// Display book update form on GET.
exports.book_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Book update GET');
};

// Handle book update on POST.
exports.book_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Book update POST');
};