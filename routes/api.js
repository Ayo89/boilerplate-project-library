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
        return res.status(200).json("missing required field title");
      }

      let newBook = new Book({
        title: title,
      });

      try {
        const savedBook = await newBook.save();
        res.status(200).json({ title: savedBook.title, _id: savedBook._id });
      } catch (error) {
        res
          .status(500)
          .json({ error: "An error occurred while saving the book" });
      }
    })

    .delete(async function (req, res) {
      try {
        await Book.deleteMany();
        return res.status(200).send("complete delete successful");
      } catch (error) {
        return res
          .status(500)
          .json({ error: "An error occurred while removing all items" });
      }
    });

  app
    .route("/api/books/:id")
    .get(async function (req, res) {
      let bookid = req.params.id;
      let book = await Book.findById({ _id: bookid });

      if (!book) {
        return res.status(200).send("no book exists");
      }

      res
        .status(200)
        .json({ _id: book._id, title: book.title, comments: book.comments });

      //json res format: {"_id": bookid, "title": book_title, "comments": [comments,comments,...]}
    })

    .post(async (req, res) => {
      const bookId = req.params.id;
      const comment = req.body.comments;
      console.log(comment);
      if (comment == undefined) {
        return res.json("missing required field comment");
      }

      try {
        const updatedBook = await Book.findByIdAndUpdate(
          bookId,
          { $push: { comments: comment }, $inc: { commentcount: 1 } },
          { new: true } // {new, true} returns the updated version and not the original. (Default is false)
        );
        if (!updatedBook) {
          return res.status(200).json("no book exists");
        } else return res.status(200).json(updatedBook);
      } catch (error) {
        return res.status(200).json("no book exists");
      }
    })

    .delete(async function (req, res) {
      let bookId = req.params.id;
      let book;
      try {
        book = await Book.findById({ _id: bookId });
      } catch (error) {
        return res
          .status(500)
          .json({ error: "An error occurred while retrieving the book" });
      }

      if (!book) {
        return res.status(200).send("no book exists");
      }

      try {
        await book.deleteOne();
        return res.status(200).send("delete successful");
      } catch (error) {
        return res
          .status(500)
          .json({ error: "An error occurred while removing the book" });
      }
    });
};
