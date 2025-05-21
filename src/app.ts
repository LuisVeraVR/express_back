import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { AppDataSource } from "./config/database";
import writerRouter from "./routes/writter.routes";
import bookRouter from "./routes/book.routes";

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

app.get("/health", (_req: Request, res: Response) => {
  res.json({ ok: true });
});

app.use("/writers", writerRouter);
app.use("/books", bookRouter);

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Not Found", path: req.path });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ message: err.message });
});

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  AppDataSource.initialize()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
      });
    })
    .catch((err) => { 
      console.error("DB init error:", err); 
      process.exit(1); 
    });
} else {
  AppDataSource.initialize()
    .then(() => {
      console.log("Database initialized");
    })
    .catch((err) => {
      console.error("DB init error:", err);
    });
}

export default app;