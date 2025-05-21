import { DataSource } from "typeorm";
import { Writer } from "../entity/writers";
import { Book } from "../entity/book";
import * as path from "path";

const isProd = process.env.NODE_ENV === "production";
const dbPath = isProd 
  ? path.join("/tmp", "db.sqlite") 
  : "db.sqlite";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: dbPath,
  synchronize: true,
  logging: false,
  entities: [Writer, Book],
  migrations: [],
  subscribers: []
});