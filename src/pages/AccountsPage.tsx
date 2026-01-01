import { useState } from "react";
import AccountForm from "../components/AccountForm";
import AccountList from "../components/AccountList";

import type { Account } from "../types/account";
export default function AccountsPage() {
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshAccounts = () => {
    setRefreshKey((prev) => prev + 1);
    setSelectedAccount(null); // exit edit mode
  };

  return (
    <div>
      <h1>Accounts</h1>

      <AccountForm
        accountToEdit={selectedAccount}
        onSuccess={refreshAccounts}
      />

      <AccountList key={refreshKey} onEdit={setSelectedAccount} />
    </div>
  );
}
