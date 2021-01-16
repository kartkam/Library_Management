var BookInstance = require('../models').BookInstance;
var Book = require('../models').Book;

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
  res.send('NOT IMPLEMENTED: BookInstance detail: ' + req.params.id);
};

// Display BookInstance create form on GET.
exports.bookinstance_create_get = function(req, res) {
  res.send('NOT IMPLEMENTED: BookInstance create GET');
};

// Handle BookInstance create on POST.
exports.bookinstance_create_post = function(req, res) {
  res.send('NOT IMPLEMENTED: BookInstance create POST');
};

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