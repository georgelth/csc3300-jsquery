const express = require("express")
const cors = require("cors")
const mysql = require("mysql")
const {v4:uuidv4} = require("uuid")

const HTTP_PORT = 8000

var app = express()
app.use(cors())
app.use(express.json())

app.get("/hello", (req, res, next) => {
    res.status(200).json({message:"Hello World"})
})

app.get("/goodbye", (req, res, next) => {
    res.status(200).json({message:"Goodbye World"})
})

app.listen(HTTP_PORT, () => {
    console.log("App listening on port", HTTP_PORT)
})