var express = require('express');
var populateDbService = require('../service/populatedb');

//Require service modules
var bookService = require('../service/book');
var authorService = require('../service/author');
var genreService = require('../service/genre');
var bookInstanceService = require('../service/bookInstance');


var router = express.Router();

router.post('/populate',function(req,res,next) {
    
    populateDbService.initData(function(){
        res.send("Init book data added successfully");
    });
    
})

/// BOOK ROUTES ///

// GET catalog home page.
router.get('/', bookService.index);

// GET request for creating a Book. NOTE This must come before routes that display Book (uses id).
router.get('/book/create', bookService.book_create_get);

// POST request for creating Book.
router.post('/book/create', bookService.book_create_post);

// GET request to delete Book.
router.get('/book/:id/delete', bookService.book_delete_get);

// POST request to delete Book.
router.post('/book/:id/delete', bookService.book_delete_post);

// GET request to update Book.
router.get('/book/:id/update', bookService.book_update_get);

// POST request to update Book.
router.post('/book/:id/update', bookService.book_update_post);

// GET request for one Book.
router.get('/book/:id', bookService.book_detail);

// GET request for list of all Book items.
router.get('/books', bookService.book_list)

/// AUTHOR ROUTES ///

// GET request for creating Author. NOTE This must come before route for id (i.e. display author).
router.get('/author/create', authorService.author_create_get);

// POST request for creating Author.
router.post('/author/create', authorService.author_create_post);

// GET request to delete Author.
router.get('/author/:id/delete', authorService.author_delete_get);

// POST request to delete Author.
router.post('/author/:id/delete', authorService.author_delete_post);

// GET request to update Author.
router.get('/author/:id/update', authorService.author_update_get);

// POST request to update Author.
router.post('/author/:id/update', authorService.author_update_post);

// GET request for one Author.
router.get('/author/:id', authorService.author_detail);

// GET request for list of all Authors.
router.get('/authors', authorService.author_list);



/// GENRE ROUTES ///

// GET request for creating a Genre. NOTE This must come before route that displays Genre (uses id).
router.get('/genre/create', genreService.genre_create_get);

//POST request for creating Genre.
router.post('/genre/create', genreService.genre_create_post);

// GET request to delete Genre.
router.get('/genre/:id/delete', genreService.genre_delete_get);

// POST request to delete Genre.
router.post('/genre/:id/delete', genreService.genre_delete_post);

// GET request to update Genre.
router.get('/genre/:id/update', genreService.genre_update_get);

// POST request to update Genre.
router.post('/genre/:id/update', genreService.genre_update_post);

// GET request for one Genre.
router.get('/genre/:id', genreService.genre_detail);

// GET request for list of all Genre.
router.get('/genres', genreService.genre_list);

/// BOOKINSTANCE ROUTES ///

// GET request for creating a BookInstance. NOTE This must come before route that displays BookInstance (uses id).
router.get('/bookinstance/create', bookInstanceService.bookinstance_create_get);

// POST request for creating BookInstance.
router.post('/bookinstance/create', bookInstanceService.bookinstance_create_post);

// GET request to delete BookInstance.
router.get('/bookinstance/:id/delete', bookInstanceService.bookinstance_delete_get);

// POST request to delete BookInstance.
router.post('/bookinstance/:id/delete', bookInstanceService.bookinstance_delete_post);

// GET request to update BookInstance.
router.get('/bookinstance/:id/update', bookInstanceService.bookinstance_update_get);

// POST request to update BookInstance.
router.post('/bookinstance/:id/update', bookInstanceService.bookinstance_update_post);

// GET request for one BookInstance.
router.get('/bookinstance/:id', bookInstanceService.bookinstance_detail);

// GET request for list of all BookInstance.
router.get('/bookinstances', bookInstanceService.bookinstance_list);



module.exports = router;