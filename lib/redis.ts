/* eslint-disable no-console */
import { createClient } from 'redis';
import type { RedisClientType } from 'redis';

const globalForRedis = global as unknown as { redisClient: RedisClientType };

async function getCache(): Promise<RedisClientType> {
  const redisClient: RedisClientType = createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
      host: process.env.REDIS_HOST ?? 'locahost',
      port: parseInt(process.env.REDIS_PORT ?? '6379'),
    },
  });
  redisClient.on('error', err => console.log(`Redis Error: ${err}`));
  redisClient.on('connect', () => console.log('Redis connected'));
  redisClient.on('reconnecting', () => console.log('Redis reconnecting'));
  redisClient.on('ready', () => {
    console.log('Redis ready!');
  });
  await redisClient.connect();
  return redisClient;
}

getCache()
  .then(client => {
    if (process.env.NODE_ENV !== 'production') {
      if (!globalForRedis.redisClient) {
        globalForRedis.redisClient = client as RedisClientType;
      }
    }
  })
  .catch(err => {
    console.log({ err }, 'Failed to connect to Redis');
  });

export { getCache };
