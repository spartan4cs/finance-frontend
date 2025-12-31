import type { Account } from "../types/account";
import api from "./axios";


export const getAccounts = () =>
  api.get<Account[]>("/api/accounts/");

export const getAccountById = (id: number) =>
  api.get<Account>(`/api/accounts/${id}`);

export const createAccount = (data: Partial<Account>) =>
  api.post<Account>("/api/accounts/", data);

export const updateAccount = (id: number, data: Partial<Account>) =>
  api.put<Account>(`/api/accounts/${id}`, data);

export const deleteAccount = (id: number) =>
  api.delete(`/api/accounts/${id}`);

export const searchByName = (name: string) =>
  api.post<Account[]>("/api/accounts/by-name", { name });

export const searchByType = (type: string) =>
  api.post<Account[]>("/api/accounts/by-type", { type });
