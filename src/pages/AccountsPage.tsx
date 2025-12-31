import { useState } from "react";
import AccountForm from "../components/AccountForm";
import AccountList from "../components/AccountList";

export default function AccountsPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshAccounts = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div>
      <h1>Accounts</h1>

      <AccountForm onAccountCreated={refreshAccounts} />

      <AccountList key={refreshKey} />
    </div>
  );
}
