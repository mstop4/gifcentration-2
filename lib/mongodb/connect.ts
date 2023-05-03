/* eslint-disable no-console */
import mongoose, { Mongoose } from 'mongoose';

type MongooseSetupObj = {
  conn: null | Mongoose;
  promise: null | Promise<Mongoose>;
};

declare global {
  // eslint-disable-next-line no-var
  var mongooseClient: MongooseSetupObj;
}

const opts = {
  bufferCommands: false,
  dbName: process.env.MONGODB_DBNAME,
  user: process.env.MONGODB_USERNAME,
  pass: process.env.MONGODB_PASSWORD,
};

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
const mongoDBURL = `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}`;
const isProd = process.env.NODE_ENV === 'production';
let cached: MongooseSetupObj;

if (!isProd) {
  cached = global.mongooseClient;

  if (!cached) {
    cached = global.mongooseClient = { conn: null, promise: null };
  }
}

async function _setupMongooseDev() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(mongoDBURL, opts).then(mongoose => {
      return mongoose;
    });

    mongoose.connection.on('connected', () => console.log('Connected to DB'));
    mongoose.connection.on('reconnected', () =>
      console.log('Reconnected to DB')
    );
    mongoose.connection.on('error', () => console.log('Error in DB'));
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

async function _setupMongooseProd() {
  mongoose.connection.on('connected', () => console.log('Connected to DB'));
  mongoose.connection.on('reconnected', () => console.log('Reconnected to DB'));
  mongoose.connection.on('error', () => console.log('Error in DB'));

  const promise = mongoose.connect(mongoDBURL, opts).then(mongoose => {
    return mongoose;
  });
  let conn;

  try {
    conn = await promise;
  } catch (e) {
    throw e;
  }

  return conn;
}

async function dbConnect() {
  if (isProd) return await _setupMongooseProd();
  else return await _setupMongooseDev();
}

export default dbConnect;
