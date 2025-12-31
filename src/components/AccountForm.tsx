import { useState } from "react";
import { createAccount } from "../api/accounts.api";

// Props definition
// onAccountCreated is a callback sent from parent
interface Props {
  onAccountCreated: () => void;
}

export default function AccountForm({ onAccountCreated }: Props) {

  // Form state (controlled inputs)
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [balance, setBalance] = useState<number>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // prevent page reload

    await createAccount({
      name,
      type,
      balance
    });

    // Reset form after success
    setName("");
    setType("");
    setBalance(0);

    // Notify parent to refresh account list
    onAccountCreated();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create Account</h3>

      <input
        type="text"
        placeholder="Account Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Account Type"
        value={type}
        onChange={(e) => setType(e.target.value)}
      />

      <input
        type="number"
        placeholder="Balance"
        value={balance}
        onChange={(e) => setBalance(Number(e.target.value))}
      />

      <button type="submit">Create</button>
    </form>
  );
}
