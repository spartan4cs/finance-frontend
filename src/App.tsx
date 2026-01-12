import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AccountsPage from "./pages/AccountsPage";
import TransactionsPage from "./pages/TransactionsPage";
import BudgetPage from "./pages/BudgetPage";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/accounts" replace />} />
          <Route path="/accounts" element={<AccountsPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/budget" element={<BudgetPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
