export default function BudgetPage() {
    return (
        <div>
            <h1>Budget</h1>
            <p style={{ color: "var(--color-text-muted)" }}>Budgeting tools coming soon...</p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "var(--spacing-md)", marginTop: "var(--spacing-lg)" }}>
                <div className="card">
                    <h3>Monthly Budget</h3>
                    <div style={{ height: "10px", backgroundColor: "var(--color-bg-surface)", borderRadius: "5px", margin: "10px 0" }}>
                        <div style={{ width: "60%", height: "100%", backgroundColor: "var(--color-primary)", borderRadius: "5px" }}></div>
                    </div>
                    <p>Spent $1,200 of $2,000</p>
                </div>
            </div>
        </div>
    );
}
