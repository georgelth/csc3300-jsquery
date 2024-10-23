const express = require('express');
const cors = require('cors')
const mysql = require('mysql')
const {v4:uuidv4} = require('uuid')
 
const HTTP_PORT = 8000
 
const conTicket = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"Howard3247",
    database:"test1"
})

var app = express()
app.use(cors())
app.use(express.json())
 
app.get("/hello",(req,res,next) =>{
    let strCommand = 'SELECT * FROM tblTickets'
    conTicket.getConnection(function(err,connection){
        if(err){
            console.log(err)
            res.status(500).json({status:"error",message:err})
        } else {
            conTicket.query(strCommand,function(err,result){
                if(err){
                    console.log(err)
                    res.status(500).json({status:"error",message:err})
                } else {
                    res.status(200).json(result)
                }
            })
        }
        connection.release();
    })
})
 
app.get("/goodbye",(req,res, next) => {
    res.status(200).json({message:"Goodbye World"})
})
 
app.get("/goodbyename",(req,res,next) => {
    let strName = req.query.name
    res.status(200).json({message:"Goodbye " + strName})
})
 
app.get("/name",(req,res,next) => {
    let strName = req.query.name
    res.status(200).json({message:"Hello " + strName})
})
 
app.listen(HTTP_PORT, () => {
    console.log('App listening on port', HTTP_PORT)
})