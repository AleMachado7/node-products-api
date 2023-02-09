require("dotenv").config()

const express = require("express")
const app = express()

const mongoose = require("mongoose")
mongoose.set("strictQuery", false)
mongoose.connect(process.env.DATABASE_URL)

const db = mongoose.connection
db.on("error", (error) => console.log(error))
db.once("open", () => console.log("Connected to the Database!"))

app.use(express.json())

const productsRouter = require("./routes/products")
app.use("/products", productsRouter)

app.listen(3000, () => console.log("Server started!"))
