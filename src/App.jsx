import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import WalletPage from './pages/WalletPage';

// Placeholder page components - will be created in Phase 4-8
function LoginPage() {
  return <div className="page-placeholder">Login Page - Coming Soon</div>;
}

function TransactionsPage() {
  return <div className="page-placeholder">Transactions Page - Coming Soon</div>;
}

function SettlementPage() {
  return <div className="page-placeholder">Settlement Page - Coming Soon</div>;
}

function StakingPage() {
  return <div className="page-placeholder">Staking Page - Coming Soon</div>;
}

function AdminPage() {
  return <div className="page-placeholder">Admin Panel - Coming Soon</div>;
}

export default function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Authenticated routes with Layout */}
        <Route element={<Layout />}>
          <Route path="/wallet" element={<WalletPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/settlement" element={<SettlementPage />} />
          <Route path="/staking" element={<StakingPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Route>

        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </HashRouter>
  );
}
