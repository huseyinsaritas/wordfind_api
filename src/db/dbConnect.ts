import { connect, Mongoose } from "mongoose";
import { initDotenv } from "../dotenv";

initDotenv();

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) throw new Error("Please define the MONGODB_URI environment variable inside .env.local");

const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME;
if (!MONGODB_DB_NAME) throw new Error("Please define the MONGODB_DB_NAME environment variable inside .env.local");

console.log(MONGODB_URI, MONGODB_DB_NAME);

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached: {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
} = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export const dbConnect = async (): Promise<Mongoose | null> => {
  // console.log("db çağrıldı");

  if (cached.conn) {
    console.debug("cached connection returned at " + new Date());
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = { bufferCommands: false, dbName: MONGODB_DB_NAME };
    cached.promise = connect(MONGODB_URI, opts).then((mongoose: Mongoose) => {
      // console.debug("First connection for cached promise at " + new Date());
      return mongoose;
    });
  } else {
    // console.debug("cached promise has been get at " + new Date());
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    console.error(error);
  }
  return null;
};
