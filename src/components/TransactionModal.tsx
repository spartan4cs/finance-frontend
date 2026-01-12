import { useState, useEffect } from "react";
import type { CreateTransactionRequest, Transaction, TransactionType, UpdateTransactionRequest } from "../types/transaction";
import { getAccounts } from "../api/accounts.api";
import type { Account } from "../types/account";

interface TransactionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (transaction: CreateTransactionRequest | UpdateTransactionRequest) => Promise<void>;
    transaction?: Transaction | null;
}

export default function TransactionModal({ isOpen, onClose, onSubmit, transaction }: TransactionModalProps) {
    const [amount, setAmount] = useState<number>(0);
    const [type, setType] = useState<TransactionType>("EXPENSE");
    const [accountId, setAccountId] = useState<number>(0);
    const [description, setDescription] = useState<string>("");
    const [accounts, setAccounts] = useState<Account[]>([]);

    useEffect(() => {
        if (isOpen) {
            loadAccounts();
            if (transaction) {
                setAmount(transaction.amount);
                setType(transaction.type);
                setAccountId(transaction.accountId);
                setDescription(transaction.description || "");
            } else {
                resetForm();
            }
        }
    }, [isOpen, transaction]);

    const loadAccounts = async () => {
        try {
            const response = await getAccounts();
            setAccounts(response.data);
            if (!transaction && response.data.length > 0 && accountId === 0) {
                setAccountId(response.data[0].id);
            }
        } catch (error) {
            console.error("Failed to load accounts", error);
        }
    };

    const resetForm = () => {
        setAmount(0);
        setType("EXPENSE");
        setAccountId(accounts.length > 0 ? accounts[0].id : 0);
        setDescription("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit({
            amount: Number(amount),
            type,
            accountId: Number(accountId),
            description,
        });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div style={{
            position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center"
        }}>
            <div className="card" style={{ width: "400px", padding: "var(--spacing-xl)" }}>
                <h2>{transaction ? "Edit Transaction" : "New Transaction"}</h2>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-md)" }}>
                    <div>
                        <label className="label">Amount</label>
                        <input
                            type="number"
                            className="input"
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            required
                        />
                    </div>
                    <div>
                        <label className="label">Type</label>
                        <select
                            className="input"
                            value={type}
                            onChange={(e) => setType(e.target.value as TransactionType)}
                        >
                            <option value="EXPENSE">Expense</option>
                            <option value="INCOME">Income</option>
                            <option value="TRANSFER">Transfer</option>
                        </select>
                    </div>
                    <div>
                        <label className="label">Account</label>
                        <select
                            className="input"
                            value={accountId}
                            onChange={(e) => setAccountId(Number(e.target.value))}
                            required
                        >
                            {accounts.map(account => (
                                <option key={account.id} value={account.id}>{account.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="label">Description</label>
                        <input
                            type="text"
                            className="input"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div style={{ display: "flex", justifyContent: "flex-end", gap: "var(--spacing-sm)", marginTop: "var(--spacing-md)" }}>
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
