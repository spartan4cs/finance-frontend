import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div style={{ display: "flex", minHeight: "100vh" }}>
            {/* Sidebar */}
            <aside
                style={{
                    width: "260px",
                    backgroundColor: "var(--color-bg-card)",
                    borderRight: "1px solid var(--color-border)",
                    padding: "var(--spacing-xl)",
                    display: "flex",
                    flexDirection: "column",
                    position: "sticky",
                    top: 0,
                    height: "100vh",
                }}
            >
                <div style={{ marginBottom: "var(--spacing-xl)" }}>
                    <h2 style={{ fontSize: "1.5rem", color: "var(--color-primary)" }}>
                        FinanceFlow
                    </h2>
                </div>

                <nav style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
                    <NavItem to="/accounts">Accounts</NavItem>
                    <NavItem to="/transactions">Transactions</NavItem>
                    <NavItem to="/budget">Budget</NavItem>
                    <NavItem to="/settings">Settings</NavItem>
                </nav>

                <div style={{ marginTop: "auto", color: "var(--color-text-muted)", fontSize: "0.875rem" }}>
                    © 2026 FinanceFlow
                </div>
            </aside>

            {/* Main Content */}
            <main
                style={{
                    flex: 1,
                    padding: "var(--spacing-xl)",
                    maxWidth: "1200px",
                    margin: "0 auto",
                    width: "100%",
                }}
            >
                <div className="fade-in">{children}</div>
            </main>
        </div>
    );
}

function NavItem({ children, to }: { children: ReactNode; to: string }) {
    return (
        <NavLink
            to={to}
            style={({ isActive }) => ({
                padding: "var(--spacing-sm) var(--spacing-md)",
                borderRadius: "var(--radius-sm)",
                cursor: "pointer",
                backgroundColor: isActive ? "var(--color-primary-light)" : "transparent",
                color: isActive ? "var(--color-primary)" : "var(--color-text-muted)",
                fontWeight: isActive ? 600 : 500,
                transition: "var(--transition)",
                textDecoration: "none",
                display: "block"
            })}
            className="nav-item"
        >
            {children}
        </NavLink>
    );
}
