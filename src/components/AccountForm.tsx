import { useEffect, useState } from "react";
import { createAccount, updateAccount } from "../api/accounts.api";
import type { Account } from "../types/account";

interface Props {
  accountToEdit?: Account | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function AccountForm({ accountToEdit, onSuccess, onCancel }: Props) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [balance, setBalance] = useState<number | string>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // When accountToEdit changes, pre-fill form
  useEffect(() => {
    if (accountToEdit) {
      setName(accountToEdit.name);
      setType(accountToEdit.type);
      setBalance(accountToEdit.balance);
    } else {
      resetForm();
    }
  }, [accountToEdit]);

  const resetForm = () => {
    setName("");
    setType("");
    setBalance(0);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (accountToEdit) {
        // UPDATE
        await updateAccount(accountToEdit.id, {
          name,
          type,
          balance: Number(balance),
        });
      } else {
        // CREATE
        await createAccount({
          name,
          type,
          balance: Number(balance),
        });
      }

      resetForm();
      onSuccess();
    } catch (error) {
      console.error("Failed to save account", error);
      alert("Failed to save account");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-md)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--spacing-sm)" }}>
        <h3 style={{ margin: 0 }}>{accountToEdit ? "Edit Account" : "New Account"}</h3>
        {accountToEdit && (
          <button
            type="button"
            onClick={onCancel}
            style={{
              fontSize: "0.75rem",
              padding: "4px 8px",
              backgroundColor: "transparent",
              color: "var(--color-text-muted)"
            }}
          >
            Cancel
          </button>
        )}
      </div>

      <div>
        <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, marginBottom: "var(--spacing-xs)" }}>
          Name
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Primary Checking"
          required
        />
      </div>

      <div>
        <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, marginBottom: "var(--spacing-xs)" }}>
          Type
        </label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
          style={{ width: "100%" }}
        >
          <option value="" disabled>Select Type</option>
          <option value="BANK">Bank</option>
          <option value="SAVINGS">Savings</option>
          <option value="CREDIT_CARD">Credit Card</option>
          <option value="DEBIT_CARD">Debit Card</option>
          <option value="INVESTMENT">Investment</option>
          <option value="E_WALLET">E-Wallet</option>
          <option value="CASH">Cash</option>
        </select>
      </div>

      <div>
        <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, marginBottom: "var(--spacing-xs)" }}>
          Balance
        </label>
        <input
          type="number"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
          placeholder="0.00"
          required
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        style={{
          marginTop: "var(--spacing-sm)",
          backgroundColor: "var(--color-primary)",
          color: "white",
          padding: "var(--spacing-md)",
          opacity: isSubmitting ? 0.7 : 1
        }}
      >
        {isSubmitting ? "Saving..." : (accountToEdit ? "Update Account" : "Create Account")}
      </button>
    </form>
  );
}
