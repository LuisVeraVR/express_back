

import "reflect-metadata";
import { AppDataSource } from "./src/config/database";
import app from './src/app';

let isDbInitialized = false;

const initializeDb = async () => {
  if (!isDbInitialized) {
    try {
      await AppDataSource.initialize();
      console.log("Database has been initialized!");
      isDbInitialized = true;
    } catch (error) {
      console.error("Error during Data Source initialization:", error);
    }
  }
};

const handler = async (req, res) => {
  await initializeDb();
  
  return app(req, res);
};

export default handler;