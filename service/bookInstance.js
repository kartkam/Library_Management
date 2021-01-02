var BookInstance = require('../models').BookInstance;

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