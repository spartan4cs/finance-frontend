import { useEffect, useState } from "react";
import { getTransactions, createTransaction, updateTransaction, deleteTransaction } from "../api/transactions";
import type { Transaction, CreateTransactionRequest, UpdateTransactionRequest } from "../types/transaction";
import TransactionModal from "../components/TransactionModal";

export default function TransactionsPage() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTransaction, setCurrentTransaction] = useState<Transaction | null>(null);

    useEffect(() => {
        loadTransactions();
    }, []);

    const loadTransactions = async () => {
        try {
            const data = await getTransactions();
            setTransactions(data);
        } catch (err) {
            setError("Failed to load transactions");
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = () => {
        setCurrentTransaction(null);
        setIsModalOpen(true);
    };

    const handleEdit = (transaction: Transaction) => {
        setCurrentTransaction(transaction);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this transaction?")) return;
        try {
            await deleteTransaction(id);
            await loadTransactions();
        } catch (err) {
            alert("Failed to delete transaction");
        }
    };

    const handleSubmit = async (data: CreateTransactionRequest | UpdateTransactionRequest) => {
        try {
            if (currentTransaction) {
                await updateTransaction(currentTransaction.id, data as UpdateTransactionRequest);
            } else {
                await createTransaction(data as CreateTransactionRequest);
            }
            await loadTransactions();
            setIsModalOpen(false);
        } catch (err) {
            console.error(err);
            alert("Failed to save transaction");
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div style={{ color: "red" }}>{error}</div>;

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h1>Transactions</h1>
                <button className="btn btn-primary" onClick={handleAdd}>Add Transaction</button>
            </div>

            <div className="card" style={{ marginTop: "var(--spacing-lg)", padding: "var(--spacing-xl)" }}>
                {transactions.length === 0 ? (
                    <p style={{ textAlign: "center" }}>No transactions found.</p>
                ) : (
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr style={{ textAlign: "left", borderBottom: "1px solid var(--color-border)" }}>
                                <th style={{ padding: "var(--spacing-sm)" }}>Date</th>
                                <th style={{ padding: "var(--spacing-sm)" }}>Description</th>
                                <th style={{ padding: "var(--spacing-sm)" }}>Type</th>
                                <th style={{ padding: "var(--spacing-sm)" }}>Amount</th>
                                <th style={{ padding: "var(--spacing-sm)" }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((t) => (
                                <tr key={t.id} style={{ borderBottom: "1px solid var(--color-border)" }}>
                                    <td style={{ padding: "var(--spacing-sm)" }}>{new Date(t.createdAt).toLocaleDateString()}</td>
                                    <td style={{ padding: "var(--spacing-sm)" }}>{t.description || "-"}</td>
                                    <td style={{ padding: "var(--spacing-sm)" }}>{t.type}</td>
                                    <td style={{ padding: "var(--spacing-sm)", color: t.type === "INCOME" ? "green" : t.type === "EXPENSE" ? "red" : "inherit" }}>
                                        ${t.amount.toFixed(2)}
                                    </td>
                                    <td style={{ padding: "var(--spacing-sm)" }}>
                                        <button className="btn btn-secondary" style={{ marginRight: "var(--spacing-xs)", padding: "4px 8px", fontSize: "0.8rem" }} onClick={() => handleEdit(t)}>Edit</button>
                                        <button className="btn btn-danger" style={{ padding: "4px 8px", fontSize: "0.8rem", backgroundColor: "#ff4d4f", color: "white", border: "none" }} onClick={() => handleDelete(t.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <TransactionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                transaction={currentTransaction}
            />
        </div>
    );
}
