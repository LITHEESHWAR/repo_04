const redis = require('redis');
const client = redis.createClient({ url: process.env.REDIS_URL });

client.connect();

exports.get = async (key) => {
  const data = await client.get(key);
  return data ? JSON.parse(data) : null;
};

exports.set = async (key, value, ttl = 3600) => {
  await client.setEx(key, ttl, JSON.stringify(value));
};

exports.del = async (key) => {
  await client.del(key);
};
