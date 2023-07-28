const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const prisma = require('./prisma/db');
const redisClient = require('./config/redis.config');
const cookieParser = require('cookie-parser');
const verifyJWT = require('./middleware/jwtTokenMiddleware');
const checkRole = require('./middleware/checkRoleMiddleware');
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

app.get('/', checkRole(['student', 'teacher', 'admin']), async (req, res) => {
    const cacheKey = `user:${req.user}:route:${req.url}`;
    try {
        const cacheData = await redisClient.get(cacheKey);

        if(cacheData){
            return res.status(200).json(JSON.parse(cacheData));
        }

        const response = {
            message: "Welcome to the home page !!!",
        };

        await redisClient.set(cacheKey, JSON.stringify(response), "EX", 10);
        
        return res.status(200).json(response);

    } catch (error) {
        return res.status(500).json({ error: 'An error occurred' });
    }
});

app.use('/profile', require('./routes/profile'));
app.use('/files',require('./routes/getUploads'));
app.use('/classroom', require("./routes/classroom"));
app.use('/upload', require('./routes/upload'));
    
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});