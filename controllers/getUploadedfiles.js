const prisma = require('../prisma/db');
const redisClient = require('../config/redis.config');


const getFiles=async (req, res) => {
    try {
        const cacheKey = `user:${req.user}:route:/files/${req.url}`;
        const cacheData = await redisClient.get(cacheKey);

        if(cacheData){
            return res.status(200).json(JSON.parse(cacheData));
        }

        const username = req.user;
        if(!username)
            return res.status(400).json({"message": "Username not found."});

        const userDetails = await prisma.user.findUnique({
            where:{
                username: username,
            },
        });

        if(!userDetails)
            return res.status(401).json({"message": "User not found."});
        
        const userId = parseInt(req.params.userId);
    
        // Retrieve the user along with their uploaded files using Prisma's include syntax
        const userWithFiles = await prisma.file.findMany({
            where: {
                userId: userId,
            },
        });
    
        if (!userWithFiles) {
            return res.status(404).json({ error: 'User not found' });
        }

        await redisClient.set(cacheKey, JSON.stringify(userWithFiles), "EX", 10);
        res.status(200).json(userWithFiles);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve files' });
    }
};
module.exports = {
    getFiles
};