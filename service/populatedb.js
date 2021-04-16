#! /usr/bin/env node

console.log('This script populates some test books, authors, genres and bookinstances to your database.');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
var async = require('async');

var authorService = require('../service/author');
var genreService = require('../service/genre');
var bookService = require('../service/book');
var bookInstanceService = require('../service/bookInstance');

module.exports.initData = (cb) => {
    async.series([
        function(callback) {
          authorService.create('Patrick', 'Rothfuss', '1973-06-06', false, callback);
        },
        function(callback) {
          authorService.create('Ben', 'Bova', '1932-11-8', false, callback);
        },
        function(callback) {
          authorService.create('Isaac', 'Asimov', '1920-01-02', '1992-04-06', callback);
        },
        function(callback) {
          authorService.create('Bob', 'Billings', false, false, callback);
        },
        function(callback) {
          authorService.create('Jim', 'Jones', '1971-12-16', false, callback);
        },
        function(callback) {
          genreService.create("Fantasy", callback);
        },
        function(callback) {
          genreService.create("Science Fiction", callback);
        },
        function(callback) {
          genreService.create("French Poetry", callback);
        }
      ],
      // optional callback
      function(err,results) {
          createBooks(cb,results);
      });
           
}


function createBooks(cb,results) {
    async.parallel([
      function(callback) {
        bookService.create('The Name of the Wind (The Kingkiller Chronicle, #1)', 'I have stolen princesses back from sleeping barrow kings. I burned down the town of Trebon. I have spent the night with Felurian and left with both my sanity and my life. I was expelled from the University at a younger age than most people are allowed in. I tread paths by moonlight that others fear to speak of during day. I have talked to Gods, loved women, and written songs that make the minstrels weep.', '9781473211896', results[0], [results[5]], callback);
      },
      function(callback) {
        bookService.create("The Wise Man's Fear (The Kingkiller Chronicle, #2)", 'Picking up the tale of Kvothe Kingkiller once again, we follow him into exile, into political intrigue, courtship, adventure, love and magic... and further along the path that has turned Kvothe, the mightiest magician of his age, a legend in his own time, into Kote, the unassuming pub landlord.', '9788401352836', results[0], [results[5]], callback);
      },
      function(callback) {
        bookService.create("The Slow Regard of Silent Things (Kingkiller Chronicle)", 'Deep below the University, there is a dark place. Few people know of it: a broken web of ancient passageways and abandoned rooms. A young woman lives there, tucked among the sprawling tunnels of the Underthing, snug in the heart of this forgotten place.', '9780756411336', results[0], [results[5]], callback);
      },
      function(callback) {
        bookService.create("Apes and Angels", "Humankind headed out to the stars not for conquest, nor exploration, nor even for curiosity. Humans went to the stars in a desperate crusade to save intelligent life wherever they found it. A wave of death is spreading through the Milky Way galaxy, an expanding sphere of lethal gamma ...", '9780765379528', results[1], [results[6]], callback);
      },
      function(callback) {
        bookService.create("Death Wave","In Ben Bova's previous novel New Earth, Jordan Kell led the first human mission beyond the solar system. They discovered the ruins of an ancient alien civilization. But one alien AI survived, and it revealed to Jordan Kell that an explosion in the black hole at the heart of the Milky Way galaxy has created a wave of deadly radiation, expanding out from the core toward Earth. Unless the human race acts to save itself, all life on Earth will be wiped out...", '9780765379504', results[1], [results[6]], callback);
      },
      function(callback) {
        bookService.create('Test Book 1', 'Summary of test book 1', 'ISBN111111', results[4], [results[5],results[6]], callback);
      },
      function(callback) {
        bookService.create('Test Book 2', 'Summary of test book 2', 'ISBN222222', results[4], false, callback)
      },
      function(callback) {
        bookService.create('Test Book 3', 'Summary of test book 3', 'ISBN333333', results[3], [results[6],results[7]], callback)
      },
      function(callback) {
        bookService.create('Test Book 4', 'Summary of test book 4', 'ISBN444444', results[2], [results[5],results[6],results[7]], callback)
      }
      ],
      // optional callback
      function(err,books) {
        console.log("Books created: ",books);
        createBookInstances(cb,books)
      });
}


function createBookInstances(cb,books) {
    async.parallel([
        function(callback) {
          bookInstanceService.create(books[0], 'London Gollancz, 2014.', false, 'Available', callback)
        },
        function(callback) {
          bookInstanceService.create(books[1], ' Gollancz, 2011.', false, 'Loaned', callback)
        },
        function(callback) {
          bookInstanceService.create(books[2], ' Gollancz, 2015.', false, false, callback)
        },
        function(callback) {
          bookInstanceService.create(books[3], 'New York Tom Doherty Associates, 2016.', false, 'Available', callback)
        },
        function(callback) {
          bookInstanceService.create(books[3], 'New York Tom Doherty Associates, 2016.', false, 'Available', callback)
        },
        function(callback) {
          bookInstanceService.create(books[3], 'New York Tom Doherty Associates, 2016.', false, 'Available', callback)
        },
        function(callback) {
          bookInstanceService.create(books[4], 'New York, NY Tom Doherty Associates, LLC, 2015.', false, 'Available', callback)
        },
        function(callback) {
          bookInstanceService.create(books[4], 'New York, NY Tom Doherty Associates, LLC, 2015.', false, 'Maintenance', callback)
        },
        function(callback) {
          bookInstanceService.create(books[4], 'New York, NY Tom Doherty Associates, LLC, 2015.', false, 'Loaned', callback)
        },
        function(callback) {
          bookInstanceService.create(books[0], 'Imprint XXX2', false, false, callback)
        },
        function(callback) {
          bookInstanceService.create(books[1], 'Imprint XXX3', false, false, callback)
        }
        ],
        // optional callback
        function(err,bookInstances) {
          console.log("Book instances created: ",bookInstances);
          
          //all inserts successful, so calling router callback
          cb();
        }
    );
}




