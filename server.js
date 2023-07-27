const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const prisma = require('./prisma/db');
const cookieParser = require('cookie-parser');
const verifyJWT = require('./middleware/jwtTokenMiddleware');
const checkRole = require('./middleware/checkRoleMiddleware');
const taskRoutes = require('./routes/taskRoutes');
require('dotenv').config();

const app = express();

prisma.$connect()
    .then(()=>{
        console.log('Successfully connected to database !!!');
    })
    .catch((err)=>{
        console.error('Error connecting to the database:', err);
    })

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/login'));
app.use('/logout', require('./routes/logout'));
app.use('/mail-verification', require('./routes/verifyEmail'));

app.use(verifyJWT);
app.get('/', checkRole(['student', 'teacher', 'admin']), (req, res) => {
    return res.json({ message: "Welcome to the home page !!!"});
});

app.use('/profile', require('./routes/profile'));
app.use('/files',require('./routes/getUploads'));
app.use('/classroom', require("./routes/classroom"));
app.use('/api/tasks', taskRoutes);
app.use('/upload', require('./routes/upload'));
    
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});