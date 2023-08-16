/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict";

module.exports = function (app) {
  const Book = require("../models/book");

  app
    .route("/api/books")
    .get(async function (req, res) {
      try {
        const books = await Book.find();
        res.status(200).json(books);
      } catch (error) {}
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
    })

    .post(async function (req, res) {
      let title = req.body.title;

      if (!title) {
        return res.status(200).json({ error: "missing required field title" });
      }

      let newBook = new Book({
        title: title,
      });

      try {
        const savedBook = await newBook.save();
        res.status(200).json(savedBook);
      } catch (error) {
        console.error(error);
        res
          .status(500)
          .json({ error: "An error occurred while saving the book" });
      }
    })

    .delete(function (req, res) {
      //if successful response will be 'complete delete successful'
    });

  app
    .route("/api/books/:id")
    .get(async function (req, res) {
      let bookid = req.params.id;
      let book = await Book.findById({ _id: bookid });

      if (!book) {
        return res.status(200).json({ text: "no book exists" });
      }

      res.status(200).json(book);

      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })

    .post(async (req, res) => {
      const bookId = req.params.id;
      const comment = req.body.comment;
      const book = await Book.findById({ _id: bookId });

      if (!book) {
        return res.status(200).json("no book exists");
      }
      if (!comment) {
        return res
          .status(200)
          .json({ error: "missing required field comment" });
      }

      try {
        // Assume the book model has an array field 'comments'
        book.comment.push(comment);
        book.commentcount = book.comment.length; // Update comment count

        const updatedBook = await book.save();

        res.status(200).json(updatedBook);
      } catch (error) {
        console.error(error);
        res
          .status(200)
          .json({ error: "An error occurred while adding the comment" });
      }
    })

    .delete(function (req, res) {
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
    });
};
