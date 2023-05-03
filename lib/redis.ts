/* eslint-disable no-console */
import { createClient } from 'redis';
import type { RedisClientType } from 'redis';

const globalForRedis = global as unknown as { redisClient: RedisClientType };

async function getCache(): Promise<RedisClientType | null> {
  let redisClient: RedisClientType;
  try {
    if (!globalForRedis.redisClient) {
      redisClient = createClient({
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

      if (process.env.NODE_ENV !== 'production') {
        globalForRedis.redisClient = redisClient as RedisClientType;
      }
    } else {
      redisClient = globalForRedis.redisClient;
    }

    return redisClient;
  } catch (err) {
    console.log({ err }, 'Failed to connect to Redis');
    return null;
  }
}

export { getCache };
