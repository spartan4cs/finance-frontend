import { useState, useMemo } from "react";
import type { Account } from "../types/account";

interface Props {
  accounts: Account[];
  onEdit: (account: Account) => void;
  onDelete: (id: number) => void;
}

type SortOption = "name" | "balance-high" | "balance-low";

export default function AccountList({ accounts, onEdit, onDelete }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("name");
  const [filterType, setFilterType] = useState<string>("all");

  // Derive unique types for filter dropdown
  const accountTypes = useMemo(() => {
    const types = new Set(accounts.map((a) => a.type));
    return ["all", ...Array.from(types)];
  }, [accounts]);

  const filteredAndSortedAccounts = useMemo(() => {
    let result = [...accounts];

    // Filter by Search
    if (searchTerm) {
      result = result.filter((acc) =>
        acc.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by Type
    if (filterType !== "all") {
      result = result.filter((acc) => acc.type === filterType);
    }

    // Sort
    result.sort((a, b) => {
      if (sortOption === "name") return a.name.localeCompare(b.name);
      if (sortOption === "balance-high") return b.balance - a.balance;
      if (sortOption === "balance-low") return a.balance - b.balance;
      return 0;
    });

    return result;
  }, [accounts, searchTerm, filterType, sortOption]);

  return (
    <div>
      {/* Controls Header */}
      <div
        style={{
          display: "flex",
          gap: "var(--spacing-md)",
          marginBottom: "var(--spacing-lg)",
          flexWrap: "wrap",
        }}
      >
        <input
          placeholder="Search accounts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ flex: 1, minWidth: "200px" }}
        />

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          style={{ width: "auto" }}
        >
          {accountTypes.map((t) => (
            <option key={t} value={t}>
              {t === "all" ? "All Types" : t}
            </option>
          ))}
        </select>

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value as SortOption)}
          style={{ width: "auto" }}
        >
          <option value="name">Name (A-Z)</option>
          <option value="balance-high">Highest Balance</option>
          <option value="balance-low">Lowest Balance</option>
        </select>
      </div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "var(--spacing-md)",
        }}
      >
        {filteredAndSortedAccounts.map((acc) => (
          <div key={acc.id} className="card fade-in" style={{ padding: "var(--spacing-md)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "var(--spacing-sm)" }}>
              <span
                style={{
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                  color: "var(--color-primary)",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                }}
              >
                {acc.type.replace(/_/g, " ")}
              </span>
              <div style={{ display: "flex", gap: "var(--spacing-xs)" }}>
                <button
                  onClick={() => onEdit(acc)}
                  style={{ padding: "4px 8px", fontSize: "0.75rem", backgroundColor: "transparent", border: "1px solid var(--color-border)" }}
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(acc.id)}
                  style={{
                    padding: "4px 8px",
                    fontSize: "0.75rem",
                    backgroundColor: "transparent",
                    color: "var(--color-danger)",
                    border: "1px solid var(--color-danger-border, #fca5a5)" // Fallback or var
                  }}
                >
                  Delete
                </button>
              </div>
            </div>

            <h3 style={{ fontSize: "1.125rem", margin: "0 0 var(--spacing-xs)" }}>{acc.name}</h3>

            <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--color-text-main)" }}>
              ${acc.balance.toLocaleString()}
            </div>
          </div>
        ))}

        {filteredAndSortedAccounts.length === 0 && (
          <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "var(--spacing-xl)", color: "var(--color-text-muted)" }}>
            No accounts found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
}
