/*
 *
 *
 *       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]-----
 *
 */

const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
const server = require("../server");
const mongoose = require("mongoose");
chai.use(chaiHttp);

suite("Functional Tests", function () {
  let testBookId;
  let failTestId = new mongoose.Types.ObjectId();
  /*
   * ----[EXAMPLE TEST]----
   * Each test should completely test the response of the API end-point including response status code!
   */
  /*   test("#example Test GET /api/books", function (done) {
    chai
      .request(server)
      .get("/api/books")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.isArray(res.body, "response should be an array");
        assert.property(
          res.body[0],
          "commentcount",
          "Books in array should contain commentcount"
        );
        assert.property(
          res.body[0],
          "title",
          "Books in array should contain title"
        );
        assert.property(
          res.body[0],
          "_id",
          "Books in array should contain _id"
        );
        done();
      });
  }); */
  /*
   * ----[END of EXAMPLE TEST]----
   */

  suite("Routing tests", function () {
    suite("Routing tests", function () {
      suite(
        "POST /api/books with title => create book object/expect book object",
        function () {
          test("Test POST /api/books with title", function (done) {
            this.timeout(5000);
            chai
              .request(server)
              .post("/api/books")
              .send({
                title: "pokemon",
              })
              .end(function (err, res) {
                testBookId = res.body._id;
                assert.equal(res.status, 200);
                assert.property(res.body, "title");
                done();
              });
          });
          test("Test POST /api/books with no title given", function (done) {
            chai
              .request(server)
              .post("/api/books")
              .send({})
              .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, "missing required field title");
                done();
              });
          });
        }
      );

      suite("GET /api/books => array of books", function () {
        test("Test GET /api/books", function (done) {
          chai
            .request(server)
            .get("/api/books")
            .end(function (err, res) {
              assert.equal(res.status, 200);
              assert.isArray(res.body, "response should be an array");
              res.body.forEach((element) => {
                assert.property(
                  element,
                  "commentcount",
                  "Books in array should contain commentcount"
                );
                assert.property(
                  element,
                  "title",
                  "Books in array should contain title"
                );
                assert.property(
                  element,
                  "_id",
                  "Books in array should contain _id"
                );
              });
              done();
            });
        });
      });

      suite("GET /api/books/[id] => book object with [id]", function () {
        test("Test GET /api/books/[id] with id not in db", function (done) {
          chai
            .request(server)
            .get(`/api/books/${failTestId}`)
            .end(function (err, res) {
              assert.equal(res.status, 200);
              assert.equal(res.body.text, "no book exists");
              done();
            });
        });

        test("Test GET /api/books/[id] with valid id in db", function (done) {
          chai
            .request(server)
            .get(`/api/books/${testBookId}`)
            .end(function (err, res) {
              assert.equal(res.status, 200);
              assert.property(res.body, "title");
              assert.property(res.body, "_id");
              assert.property(res.body, "comment");
              assert.property(res.body, "commentcount");
              done();
            });
        });
      });

      suite(
        "POST /api/books/[id] => add comment/expect book object with id",
        function () {
          test("Test POST /api/books/[id] with comment", function (done) {
            chai
              .request(server)
              .post(`/api/books/${testBookId}`)
              .send({
                comment: "blabla test",
              })
              .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.comment[0], "blabla test");
                done();
              });
          });

          test("Test POST /api/books/[id] without comment field", function (done) {
            chai
              .request(server)
              .post(`/api/books/${testBookId}`)
              .send({})
              .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, "missing required field comment");
                done();
              });
          });

          test("Test POST /api/books/[id] with comment, id not in db", function (done) {
            chai
              .request(server)
              .post(`/api/books/${failTestId}`)
              .send({ comment: "blabla test" })
              .end(function (err, res) {
                console.log("hello");
                console.log(res.body);
                assert.equal(res.status, 200);
                assert.equal(res.body, "no book exists");
                done();
              });
          });
        }
      );

      /*     suite("DELETE /api/books/[id] => delete book object id", function () {
      test("Test DELETE /api/books/[id] with valid id in db", function (done) {
        //done();
      });

      test("Test DELETE /api/books/[id] with  id not in db", function (done) {
        //done();
      });
    });
        */
    });
  });
});
