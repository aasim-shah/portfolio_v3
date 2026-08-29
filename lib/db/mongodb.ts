import "server-only";

import { MongoClient, type Db } from "mongodb";

declare global {
  // eslint-disable-next-line no-var
  var __aasimMongoClientPromise: Promise<MongoClient> | undefined;
}

function getMongoClientPromise(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is required.");

  if (!global.__aasimMongoClientPromise) {
    global.__aasimMongoClientPromise = new MongoClient(uri).connect();
  }

  return global.__aasimMongoClientPromise;
}

export async function getDatabase(): Promise<Db> {
  const databaseName = process.env.MONGODB_DB_NAME;
  if (!databaseName) {
    throw new Error("MONGODB_DB_NAME is required; the database is never inferred.");
  }

  const client = await getMongoClientPromise();
  return client.db(databaseName);
}
