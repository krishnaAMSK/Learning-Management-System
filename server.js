const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const prisma = require('./prisma/db');
const cookieParser = require('cookie-parser');
const verifyJWT = require('./middleware/jwtTokenMiddleware');
require('dotenv').config();

const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/login'));
app.use('/logout', require('./routes/logout'));
app.use('/mail-verification', require('./routes/verifyEmail'));

app.use('/classroom', require("./routes/classroom"));

app.use(verifyJWT);
app.get('/', (req, res) => {
    return res.json({ message: "Welcome to the home page !!!"});
});

prisma.$connect()
    .then(()=>{
        console.log('Successfully connected to database !!!');
    })
    .catch((err)=>{
        console.error('Error connecting to the database:', err);
    })
    
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});