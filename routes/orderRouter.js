const express = require("express");
const { OrderModel } = require("../model/orderModel");
const { authMiddleware } = require("../middleware/auth.middleware");

const orderRouter = express.Router();

orderRouter.get("/orders", authMiddleware, async (req, res) => {
    try {
        const allOrder = await OrderModel.find();
        res.status(200).send({ msg: "All order data", data: allOrder });
    } catch (error) {
        res.status(404).send({ msg: "something went wrong" });
    }
});

module.exports = { orderRouter };
