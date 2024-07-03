const { createClient } = require('redis');

const redisClient = createClient({
    url: 'redis://127.0.0.1:6379'
  });

redisClient.on('error', (err) => {
    console.error('Redis error: ', err);
  });

redisClient.connect()
    .then(() => console.log('Connected to Redis'))
    .catch((err) => {
    console.error('Could not connect to Redis: ', err);
    process.exit(1);
    });

module.exports = redisClient;