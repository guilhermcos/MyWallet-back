import dotenv from "dotenv";
import { connectServer } from "./server/server.js";
import { connectDataBase } from "./database/database.js";
dotenv.config();

const serverConfig = {
  PORT: process.env.PORT,
};
const dataBaseConfig = {
  MONGO_URI: process.env.MONGO_URI,
};

const db = connectDataBase(dataBaseConfig);
const app = connectServer(serverConfig);