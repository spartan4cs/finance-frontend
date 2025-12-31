export type TransactionType = "INCOME" | "EXPENSE" | "TRANSFER";

export interface Transaction {
  id: number;
  amount: number;
  type: TransactionType;
  accountId: number;
  description?: string;
  createdAt: string;
}
