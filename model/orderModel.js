const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    user: { type: String, ref: String },
    books: [{ type: String, ref: String }],
    totalAmount: Number


})

const OrderModel = mongoose.model("order", orderSchema)

module.exports = { OrderModel }