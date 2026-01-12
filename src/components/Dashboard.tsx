import { useMemo } from "react";
import type { Account } from "../types/account";

interface DashboardProps {
    accounts: Account[];
}

export default function Dashboard({ accounts }: DashboardProps) {
    const totalBalance = useMemo(() => {
        return accounts.reduce((sum, acc) => sum + acc.balance, 0);
    }, [accounts]);

    const countByType = useMemo(() => {
        const counts: Record<string, number> = {};
        accounts.forEach((acc) => {
            counts[acc.type] = (counts[acc.type] || 0) + 1;
        });
        return counts;
    }, [accounts]);

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "var(--spacing-lg)",
                marginBottom: "var(--spacing-xl)",
            }}
        >
            {/* Total Balance Card */}
            <div className="card">
                <h3 style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Total Balance
                </h3>
                <div style={{ fontSize: "2.5rem", fontWeight: 700, color: "var(--color-primary)" }}>
                    ${totalBalance.toLocaleString()}
                </div>
            </div>

            {/* Account Types Card */}
            <div className="card">
                <h3 style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Active Accounts
                </h3>
                <div style={{ fontSize: "2.5rem", fontWeight: 700 }}>
                    {accounts.length}
                </div>
                <div style={{ display: "flex", gap: "var(--spacing-sm)", marginTop: "var(--spacing-xs)" }}>
                    {Object.entries(countByType).map(([type, count]) => (
                        <span
                            key={type}
                            style={{
                                fontSize: "0.75rem",
                                padding: "2px 8px",
                                borderRadius: "12px",
                                backgroundColor: "var(--color-bg-surface)",
                                color: "var(--color-text-muted)",
                            }}
                        >
                            {type.replace(/_/g, " ")}: {count}
                        </span>
                    ))}
                </div>
            </div>

            {/* Monthly Activity Placeholder */}
            <div className="card">
                <h3 style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Monthly Activity
                </h3>
                <div style={{ height: "40px", display: "flex", alignItems: "flex-end", gap: "4px", marginTop: "10px" }}>
                    {/* Fake bar chart */}
                    {[40, 70, 30, 85, 50, 60, 90].map((h, i) => (
                        <div key={i} style={{
                            flex: 1,
                            height: `${h}%`,
                            backgroundColor: "var(--color-primary)",
                            opacity: 0.5,
                            borderRadius: "2px"
                        }} />
                    ))}
                </div>
            </div>
        </div>
    );
}
