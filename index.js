const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const dbConnect = require('./config/mongoconnection');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

dbConnect();
const port = process.env.PORT || 7000

app.get ('/',(req,res)=>{
    res.send("hello bunde")
})

app.use('/',require('./routes/contactroute') )

app.listen(port,()=>{
    console.log("running");
})