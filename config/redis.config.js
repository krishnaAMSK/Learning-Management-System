const Redis = require('redis');
require('dotenv').config();

const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_PORT = process.env.REDIS_PORT;

const REDIS_URL = `redis://${REDIS_HOST}:${REDIS_PORT}`;

const redisClient = Redis.createClient(REDIS_URL);
redisClient.connect();

redisClient.on('ready', () => {
    console.log(`Connected to redis server on port ${REDIS_PORT}`);
})

redisClient.on("error", (err) => {
    console.error("Redis Error:", err);
  });

module.exports = redisClient;