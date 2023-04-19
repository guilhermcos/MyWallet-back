import { MongoClient } from "mongodb";

export async function connectDataBase(dataBaseConfig) {
  const mongoClient = new MongoClient(process.env.MONGO_URI);

  try {
    await mongoClient.connect();
    return mongoClient.db();
  } catch (err) {
    console.log(err.message);
  }
}
