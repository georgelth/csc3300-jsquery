const express = require('express');
const cors = require('cors')
const mysql = require('mysql')
const {v4:uuidv4} = require('uuid')
 
const HTTP_PORT = 8000
 
const conDibbs = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"Howard3247",
    database:"dibbs"
})

var app = express()
app.use(cors())
app.use(express.json())

app.post("/users", (req, res, next) => {
    let strFirstName = req.body.FirstName;
    console.log(strFirstName)
    let strLastName = req.body.LastName;
    console.log(strLastName)
    let strPassword = req.body.Password;
    console.log(strPassword)
    let strEmail = req.body.Email;
    console.log(strEmail)
    let strUserID = uuidv4();
    let strCommand = "INSERT INTO tblUsers VALUES (?, ?, ?, ?, 1, ?)"
    conDibbs.getConnection(function(err, connection){
        if(err){
            console.log(err)
            res.status(500).json({status:"error", message:err})
        }
        else{
            conDibbs.query(strCommand, [strUserID, strEmail, strFirstName, strLastName, strPassword], function(err, result){
                if(err){
                    console.log(err)
                    res.status(500).json({status:"error", message:err})
                }
                else{
                    res.status(201).json({status:"success", userid:strUserID})
                }
            })
        }
    })
})
 
app.get("/hello",(req,res,next) => {
    let strCommand = 'SELECT * FROM tblTickets'
    conDibbs.getConnection(function(err,connection){
        if(err){
            console.log(err)
            res.status(500).json({status:"error",message:err})
        } else {
            conDibbs.query(strCommand,function(err,result){
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