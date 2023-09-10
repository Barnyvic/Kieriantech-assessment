import express, { Application, Request, Response } from "express";
import winston from "winston";
import { createTransactionHandler } from "./controller/transaction-controller";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "transactions.log" }),
  ],
});

app.post("/api/v1/transactions", createTransactionHandler);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
