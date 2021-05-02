const Author = require("../models").Author;
const Book = require("../models").Book;

const { body, validationResult } = require("express-validator");

module.exports.create = async (
  first_name,
  family_name,
  date_of_birth,
  date_of_death,
  cb
) => {
  authordetail = { first_name: first_name, family_name: family_name };
  if (date_of_birth != false) authordetail.date_of_birth = date_of_birth;
  if (date_of_death != false) authordetail.date_of_death = date_of_death;

  var author = await Author.create(authordetail);
  author = author.get({ plain: true });
  cb(null, author);
};

// Display list of all Authors.
exports.author_list = function (req, res, next) {
  Author.findAll({})
    .then(function (authorList) {
      authorList = authorList.map((author) => author.get({ plain: true }));
      res.render("author_list", {
        title: "Author List",
        author_list: authorList,
      });
    })
    .catch((error) => {
      next(error);
    });
};

// Display detail page for a specific Author.
exports.author_detail = function (req, res, next) {
  Author.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Book,
        as: "book_details",
      },
    ],
  })
    .then(function (author) {
      if (author == null) {
        var err = new Error("Author not found");
        err.status = 404;
        return next(err);
      }

      author = author.get({ plain: true });
      res.render("author_detail", { title: "Author Detail", author: author });
    })
    .catch((error) => {
      next(error);
    });
};

// Display Author create form on GET.
exports.author_create_get = function (req, res) {
  res.render("author_form", { title: "Create Author" });
};

// Handle Author create on POST.
exports.author_create_post = [
  //Validate and sanitise fields.
  body("first_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("First name must be specified")
    .isAlphanumeric()
    .withMessage("First name has non-alphanumeric characters."),
  body("family_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Family name must be specified")
    .isAlphanumeric()
    .withMessage("Family name has non-alphanumeric characters."),
  body("date_of_birth", "Invalid date of birth")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),
  body("date_of_death", "Invalid date of death")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),

  // Process request after validation and sanitization.
  (req, res, next) => {
    //Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.render("author_form", {
        title: "Create author",
        author: req.body,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.

      // Create an Author object with escaped and trimmed data.
      Author.create({
        first_name: req.body.first_name,
        family_name: req.body.family_name,
        date_of_birth: req.body.date_of_birth,
        date_of_death: req.body.date_of_death,
      })
        .then((authorData) => {
          // Successful - redirect to new author record.
          res.redirect(authorData.url);
        })
        .catch((error) => {
          return next(error);
        });
    }
  },
];

// Display Author delete form on GET.
exports.author_delete_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Author delete GET");
};

// Handle Author delete on POST.
exports.author_delete_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Author delete POST");
};

// Display Author update form on GET.
exports.author_update_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Author update GET");
};

// Handle Author update on POST.
exports.author_update_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Author update POST");
};
