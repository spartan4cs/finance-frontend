import api from "./axios";
import type { Transaction, CreateTransactionRequest, UpdateTransactionRequest, TransactionType } from "../types/transaction";

export const getTransactions = async (): Promise<Transaction[]> => {
    const response = await api.get("/api/transactions");
    return response.data;
};

export const getTransactionById = async (id: number): Promise<Transaction> => {
    const response = await api.get(`/api/transactions/${id}`);
    return response.data;
};

export const createTransaction = async (transaction: CreateTransactionRequest): Promise<Transaction> => {
    const response = await api.post("/api/transactions", transaction);
    return response.data;
};

export const updateTransaction = async (id: number, transaction: UpdateTransactionRequest): Promise<Transaction> => {
    const response = await api.put(`/api/transactions/${id}`, transaction);
    return response.data;
};

export const deleteTransaction = async (id: number): Promise<void> => {
    await api.delete(`/api/transactions/${id}`);
};

export const getTransactionsByType = async (type: TransactionType): Promise<Transaction[]> => {
    const response = await api.get(`/api/transactions/by-type/${type}`);
    return response.data;
};

export const getTransactionsByAccount = async (accountId: number): Promise<Transaction[]> => {
    const response = await api.get(`/api/transactions/account/${accountId}`);
    return response.data;
};

export const getOutgoingTransfers = async (sourceAccountId: number): Promise<Transaction[]> => {
    const response = await api.get(`/api/transactions/transfers/from/${sourceAccountId}`);
    return response.data;
};

export const getIncomingTransfers = async (destAccountId: number): Promise<Transaction[]> => {
    const response = await api.get(`/api/transactions/transfers/to/${destAccountId}`);
    return response.data;
};
