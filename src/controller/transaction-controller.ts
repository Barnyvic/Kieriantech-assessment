import { logger } from "../app";
import { createTransaction } from "../services/transaction-service";
import { schema } from "../validator/validator";
import { Request, Response } from "express";

export async function createTransactionHandler(
  req: Request,
  res: Response
): Promise<Response> {
  const { error, value } = schema.validate(req.body);

  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }

  const { amount, destinationWalletID, pin, otp } = value;

  const result = await createTransaction(amount, destinationWalletID, pin, otp);

  logger.info("Transaction created:", result);

  res.status(result.statusCode).send(result);
}
