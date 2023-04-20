import { MongoClient } from "mongodb";

let db;
export async function connectDataBase(dataBaseConfig) {
  const mongoClient = new MongoClient(process.env.MONGO_URI);
  try {
    await mongoClient.connect();
    db = mongoClient.db();
  } catch (err) {
    throw err;
  }
}

export function getDataBase() {
  return db;
}
