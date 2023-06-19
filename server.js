const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require('mysql');
const authRoutes = require('./routes/auth');
const db = require('./models/index');
require('dotenv').config();


const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// This route is just for testing purpose. 
app.get('/', (req, res) => {
    return res.json({ message: "Welcome to the home page !!!"});
});

app.use('/api/auth', authRoutes);

db.connection.connect((error) => {
    if(error){
        console.log('Error connecting to database:', error);
    }else{
        console.log('Successfully connected to database !!!');
    }
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});