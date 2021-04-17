var BookInstance = require('../models').BookInstance;
var Book = require('../models').Book;

const {body, validationResult} = require('express-validator');


module.exports.create = async (book, imprint, due_back, status, cb) => {
    bookinstancedetail = { 
      book_id : book.id,
      imprint: imprint
    }    
    if (due_back != false) bookinstancedetail.due_back = due_back
    if (status != false) bookinstancedetail.status = status
    
    var bookInstance = await BookInstance.create(bookinstancedetail);    
    bookInstance = bookInstance.get({ plain: true });

    cb(null,bookInstance);
    
  }


// Display list of all BookInstances.
exports.bookinstance_list = function(req, res, next) {

  BookInstance.findAll({
      attributes:[
        'id',
        'url',
        'imprint',
        'status',
        'due_back'
      ],
      include: [
          {
              model: Book,
              as: 'book_details',
              attributes:[
                  'title'
              ]
          }
      ]
  })
  .then(function(bookInstanceList){
      bookInstanceList = bookInstanceList.map(bookInstance => bookInstance.get({ plain: true }));
      res.render('bookinstance_list', {title: 'Book Instance List', bookinstance_list: bookInstanceList});
  })
  .catch(error => {
      next(error);
  })
};

// Display detail page for a specific BookInstance.
exports.bookinstance_detail = function(req, res) {

    BookInstance.findOne({
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
    .then(function(bookInstance){

        if(bookInstance == null){
            var err = new Error('Book copy not found');
            err.status = 404;
            return next(err);
        }

        bookInstance = bookInstance.get({ plain : true });
        res.render('bookinstance_detail', {title: 'Book Instance Detail', bookinstance: bookInstance});
    })
    .catch(error => {
        next(error);
    });
};


// Display BookInstance create form on GET.
exports.bookinstance_create_get = function(req, res, next) {

  Book.findAll({
      attributes:[
          'id',
          'title',
          'url'
      ]
  })
  .then(function(bookList){
      bookList = bookList.map(book => book.get({ plain: true }));
      res.render('bookinstance_form', {title: 'Create BookInstance', book_list: bookList});
  })
  .catch(error => {
      return next(error);
  })

};

// Handle BookInstance create on POST.
exports.bookinstance_create_post = [

  //Validate and sanitise fields
  body('book', 'Book must be specified').trim().isLength({ min: 1 }).escape(),
  body('imprint', 'Imprint must be specified').trim().isLength({ min: 1 }).escape(),
  body('status').escape(),
  body('due_back', 'Invalid date').optional({ checkFalsy: true }).isISO8601().toDate(),

  //Process request after validation and sanitization.
  (req,res,next) => {

    //Extract the validation errors from a request.
    const errors = validationResult(req);

    console.log(errors);
    if(!errors.isEmpty()){

      //There are errors. Render form again with sanitized values and error messages.

      //Create a BookInstance object with escaped and trimmed data.
      var bookinstance = {
        book_id : req.body.book,
        imprint: req.body.imprint,
        status: req.body.status,
        due_back: req.body.due_back
      }

      Book.findAll({
          attributes:[
              'id',
              'title',
              'url'
          ]
      })
      .then(function(bookList){
          bookList = bookList.map(book => book.get({ plain: true }));

          //Successful, so render.
          res.render('bookinstance_form', {title: 'Create BookInstance', book_list: bookList, selected_book: bookinstance.book_id, errors: errors.array(), bookinstance: bookinstance});
      })
      .catch(error => {
          return next(error);
      })

    } else {
      
      //Data from form is valid.
      BookInstance.create({
        book_id : req.body.book,
        imprint: req.body.imprint,
        status: req.body.status,
        due_back: req.body.due_back
      })
      .then(bookInstanceData => {
        // Successful - redirect to new record
        res.redirect(bookInstanceData.url);
      })
      .catch(error => {
        return next(error);
      })
    }
  }
  
];

// Display BookInstance delete form on GET.
exports.bookinstance_delete_get = function(req, res) {
  res.send('NOT IMPLEMENTED: BookInstance delete GET');
};

// Handle BookInstance delete on POST.
exports.bookinstance_delete_post = function(req, res) {
  res.send('NOT IMPLEMENTED: BookInstance delete POST');
};

// Display BookInstance update form on GET.
exports.bookinstance_update_get = function(req, res) {
  res.send('NOT IMPLEMENTED: BookInstance update GET');
};

// Handle bookinstance update on POST.
exports.bookinstance_update_post = function(req, res) {
  res.send('NOT IMPLEMENTED: BookInstance update POST');
};