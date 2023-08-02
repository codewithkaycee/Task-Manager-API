// Require dotenv and load configuration from .env file
require('dotenv').config();

// Import other modules using CommonJS require
const express = require('express');
const mongoose = require('./db/mongoose');
const userRoute = require('./routes/user')

const app = express();

//register middleware 
app.use(express.json());

app.use((req,res,next)=>{
    console.log(req.path,req.method);
    next()
})
// Register Routes
app.use('/api/user', userRoute)



module.exports = app;