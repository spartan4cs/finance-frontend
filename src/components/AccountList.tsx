import { useEffect, useState } from "react";

import { deleteAccount, getAccounts } from "../api/accounts.api";
import type { Account } from "../types/account";

interface Props {
  onEdit: (account: Account) => void;
}

export default function AccountList({ onEdit }: Props) {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAccounts()
      .then((res) => setAccounts(res.data))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteAccount(id);
      getAccounts().then((res) => setAccounts(res.data));
    } catch {
      alert("Delete failed");
    }
  };

  if (loading) return <p>Loading accounts...</p>;

  return (
    <div>
      <h2>Accounts</h2>
      <ul>
        {accounts.map((acc) => (
          <li key={acc.id}>
            {acc.name} - {acc.type} - ${acc.balance}
            <button onClick={() => onEdit(acc)}>Edit</button>
            <button onClick={() => handleDelete(acc.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
