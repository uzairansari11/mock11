const express = require("express");
const { UserModel } = require("../model/userModel");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
    const data = req.body;
    const { name, email, password, isAdmin } = data;
    let isUserExists = await UserModel.find({ email: email });
    if (isUserExists.length) {
        return res.send({ msg: "user already registered" });
    }
    if (name && email && password && isAdmin != undefined) {
        try {
            bcrypt.hash(password, 5, async (err, hash) => {
                let newUser = new UserModel({ name, email, password: hash, isAdmin });
                await newUser.save();

                res.status(201).send({ msg: "userCreated" });
            });
        } catch (error) {
            res.status(404).send({ msg: "something went wrong" });
        }
    } else {
        res.status(404).send({ msg: "please provide all details" });
    }
});

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const isUserPresent = await UserModel.find({ email });
    console.log(isUserPresent)
    try {
        if (isUserPresent.length) {
            bcrypt.compare(password, isUserPresent[0].password, (err, result) => {
                result
                    ? res
                        .status(201)
                        .send({
                            msg: "loging succesfully",
                            token: jwt.sign({ userID: isUserPresent[0]._id }, "ironman"),
                        })
                    : res.status(404).send({ msg: "wrong crediential" });
            });
        } else {
            res.status(404).send({ msg: "no user found" });
        }
    } catch (error) {
        res.status(404).send({ msg: "something went wrong" });
    }
});

module.exports = { userRouter };
