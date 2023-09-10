import winston from "winston";
import { v4 as uuidv4 } from "uuid";
import { Default, IReturnObject, Return } from "../utils/utils";

interface Transaction {
  id: string;
  amount: number;
  destinationWalletID: string;
  timestamp: Date;
}

const transactions: Transaction[] = [];

export async function createTransaction(
  amount: number,
  destinationWalletID: string,
  pin: number,
  otp: number
): Promise<IReturnObject> {
  try {
    if (pin !== Default.DEFAULT_PIN) {
      return Return({
        error: true,
        statusCode: 404,
        errorMessage: "Pin not correct",
      });
    }

    if (otp !== Default.DEFAULT_OTP) {
      return Return({
        error: true,
        statusCode: 404,
        errorMessage: "Otp not correct",
      });
    }

    const newTransaction: Transaction = {
      id: uuidv4(),
      amount,
      destinationWalletID,
      timestamp: new Date(),
    };

    transactions.push(newTransaction);

    winston.info("Transaction created:", newTransaction);

    return Return({
      error: false,
      statusCode: 201,
      successMessage: "created successfully...",
      data: newTransaction,
    });
  } catch (error) {
    return Return({
      error: true,
      statusCode: error?.status || error?.statusCode || 500,
      errorMessage:
        error?.message || error?.errorMessage || `Internal Server Error`,
      trace: error,
    });
  }
}
