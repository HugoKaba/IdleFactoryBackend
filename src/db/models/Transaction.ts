import { Transaction } from "../../types/transaction.types";
import { db } from '../mongo';

export const Transactions = db!.collection<Transaction>('transactions')