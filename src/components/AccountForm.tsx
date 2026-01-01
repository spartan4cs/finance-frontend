import { useEffect, useState } from "react";
import { createAccount, updateAccount } from "../api/accounts.api";
import type { Account } from "../types/account";


interface Props {
  accountToEdit?: Account | null;
  onSuccess: () => void;
}

export default function AccountForm({ accountToEdit, onSuccess }: Props) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [balance, setBalance] = useState<number>(0);

  // When accountToEdit changes, pre-fill form
  useEffect(() => {
    if (accountToEdit) {
      setName(accountToEdit.name);
      setType(accountToEdit.type);
      setBalance(accountToEdit.balance);
    }
  }, [accountToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (accountToEdit) {
      // UPDATE
      await updateAccount(accountToEdit.id, {
        name,
        type,
        balance,
      });
    } else {
      // CREATE
      await createAccount({
        name,
        type,
        balance,
      });
    }

    // Reset form
    setName("");
    setType("");
    setBalance(0);

    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{accountToEdit ? "Edit Account" : "Create Account"}</h3>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />

      <input
        value={type}
        onChange={(e) => setType(e.target.value)}
        placeholder="Type"
      />

      <input
        type="number"
        value={balance}
        onChange={(e) => setBalance(Number(e.target.value))}
        placeholder="Balance"
      />

      <button type="submit">{accountToEdit ? "Update" : "Create"}</button>
    </form>
  );
}
