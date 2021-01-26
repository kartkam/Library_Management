var async = require('async');
var Book = require('../models').Book;
var BookInstance = require('../models').BookInstance;
var Author = require('../models').Author;
var Genre = require('../models').Genre;
var GenreAndBook = require('../models').GenreAndBook;

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
    res.send('NOT IMPLEMENTED: Book create GET');
};

// Handle book create on POST.
exports.book_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Book create POST');
};

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