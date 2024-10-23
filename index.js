const express = require("express")
const cors = require("cors")
const mysql = require("mysql")
const {v4:uuidv4} = require("uuid")

const HTTP_PORT = 8000

var app = express()
app.use(cors())
app.use(express.json())

app.listen(HTTP_PORT, () => {
    console.log("App listening on port", HTTP_PORT)
})