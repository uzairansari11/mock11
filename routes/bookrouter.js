const express = require("express");
const { BookModel } = require("../model/bookModel");
const { authMiddleware } = require("../middleware/auth.middleware");

let bookRouter = express.Router();

bookRouter.post("/books", authMiddleware, async (req, res) => {
    const { title, author, category, price, quantity } = req.body;
    try {
        if (title && author && category && price && quantity) {
            let newBook = new BookModel({ title, author, category, price, quantity });
            await newBook.save();
            res.status(201).send({ msg: "Book is Added" });
        } else {
            res.status(404).send({ msg: "Please provide all fields" });
        }
    } catch (error) {
        res.status(404).send({ msg: "Something went wrong" });
    }
});

bookRouter.get("/books", async (req, res) => {
    console.log(req.query);
    const { category, author } = req.query;
    let obj = {};
    if (category) {
        obj.category = category;
    }
    if (author) {
        obj.author = author;
    }
    try {
        let allBooks = await BookModel.find(obj);
        res.status(200).send({ msg: "all books", data: allBooks });
    } catch (error) {
        res.status(404).send({ msg: "something went wrong" });
    }
});

bookRouter.get("/books/:id", async (req, res) => {
    let id = req.params.id;
    try {
        let allBooks = await BookModel.find({ _id: id });

        if (allBooks.length) {
            res.status(200).send({ msg: "all books", data: allBooks });
        } else {
            res.status(404).send({ msg: "this book doesnot exists", data: allBooks });
        }
    } catch (error) {
        res.status(404).send({ msg: "something went wrong" });
    }
});

bookRouter.delete("/books/:id", authMiddleware, async (req, res) => {
    let id = req.params.id;
    try {
        await BookModel.findByIdAndDelete({ _id: id });
        res.status(202).send({ msg: "Book deleted succesfully" });
    } catch (error) {
        res.status(404).send({ msg: "something went wrong" });
    }
});

bookRouter.patch("/books/:id", authMiddleware, async (req, res) => {
    let id = req.params.id;
    let payload = req.body;
    try {

        let isPresent = await BookModel.find({ _id: id })
        if (isPresent.length) {
            await BookModel.findByIdAndUpdate({ _id: id }, payload);


            res.status(201).send({ msg: "Book updated succesfully" });
        } else {
            res.status(404).send({ msg: "book is not presnet" });
        }

    } catch (error) {
        res.status(404).send({ msg: "something went wrong" });
    }
});

module.exports = { bookRouter };
