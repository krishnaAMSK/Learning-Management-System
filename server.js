const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const authRoutes = require('./routes/auth');
const db = require('./models/index');
require('dotenv').config();

const mysql = require('mysql');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const webRouter=require('./routes/webRoute');
// This route is just for testing purpose. 
app.get('/', (req, res) => {
    return res.json({ message: "Welcome to the home page !!!"});
});
app.use(express.json());
app.use('/api/auth', authRoutes);
//verification route by get
app.use('/',webRouter);

db.connection.connect((error) => {
    if(error){
        console.log('Error connecting to database:', error);
    }else{
        console.log('Successfully connected to database !!!');
    }
})

//error handling
app.use((err,req,res,next)=>{
    err.statusCode=err.statusCode || 500;
    err.message=err.message|| "INTERNAL SERVER ERROR";
    res.status(err.statusCode).json({
        message:err.message,
    });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});