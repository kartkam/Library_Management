var Book = require('../models').Book;
var GenreAndBook = require('../models').GenreAndBook;

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