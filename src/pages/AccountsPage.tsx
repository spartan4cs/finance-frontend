import { useState, useEffect } from "react";
import AccountForm from "../components/AccountForm";
import AccountList from "../components/AccountList";
import Dashboard from "../components/Dashboard";
import { getAccounts, deleteAccount } from "../api/accounts.api";
import type { Account } from "../types/account";

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchAccounts = () => {
    setLoading(true);
    getAccounts()
      .then((res) => setAccounts(res.data))
      .catch(err => console.error("Failed to fetch accounts", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleSuccess = () => {
    fetchAccounts();
    setSelectedAccount(null);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure?")) return;
    try {
      await deleteAccount(id);
      fetchAccounts();
    } catch {
      alert("Delete failed");
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--spacing-lg)" }}>
        <h1>Accounts</h1>
      </div>

      <Dashboard accounts={accounts} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 3fr", gap: "var(--spacing-xl)", alignItems: "start" }}>

        {/* Form Section */}
        <div className="card" style={{ position: "sticky", top: "20px" }}>
          <AccountForm
            accountToEdit={selectedAccount}
            onSuccess={handleSuccess}
            onCancel={() => setSelectedAccount(null)}
          />
        </div>

        {/* List Section */}
        <div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AccountList
              accounts={accounts}
              onEdit={setSelectedAccount}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
}
