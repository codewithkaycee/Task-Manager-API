//env file
require('dotenv').config();
require('./db/mongoose');
//dependencies
const express = require('express');


//express app
const app = express()

//middleware
app.use(express.json());



module.exports=app;