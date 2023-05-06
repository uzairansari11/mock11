require('dotenv').config()
const express = require('express')
const { connection } = require('./db')
const { userRouter } = require('./routes/userRouter')
const { bookRouter } = require('./routes/bookrouter')
const { orderRouter } = require('./routes/orderRouter')

const app = express()

app.use(express.json())
app.get("/", (req, res) => {

    res.send({ message: "Welcome to Books" })
})

app.use("/", userRouter)
app.use("/", bookRouter)
app.use("/", orderRouter)
app.listen(process.env.port, async () => {
    try {
        await connection()
        console.log("connected to db")
    } catch (error) {
        console.log("could not connected to db")
        console.log("error: ", error)
    }
    console.log(`server is running`)
})