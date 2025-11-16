import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../styles/components.css';

export default function Layout({ user = { name: 'John Trader', role: 'Trader' }, children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('qcrypto_user');
    
    // Navigate to login page
    navigate('/login');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className="layout">
      <header className="layout-header">
        <div className="header-content">
          <div className="header-left">
            <img 
              src="/assets/qcrypto-logo.svg" 
              alt="Q Crypto" 
              className="header-logo"
            />
            <h1 className="header-title">Q Crypto</h1>
          </div>

          <button 
            className="hamburger-menu"
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <nav className={`header-nav ${menuOpen ? 'nav-open' : ''}`}>
            <NavLink 
              to="/wallet" 
              className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
              onClick={closeMenu}
            >
              Wallet
            </NavLink>
            <NavLink 
              to="/transactions" 
              className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
              onClick={closeMenu}
            >
              Transactions
            </NavLink>
            <NavLink 
              to="/settlement" 
              className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
              onClick={closeMenu}
            >
              Settlement
            </NavLink>
            <NavLink 
              to="/staking" 
              className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
              onClick={closeMenu}
            >
              Staking
            </NavLink>
            {user.role === 'Admin' && (
              <NavLink 
                to="/admin" 
                className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
                onClick={closeMenu}
              >
                Admin Panel
              </NavLink>
            )}
          </nav>

          <div className="header-right">
            <div className="user-info">
              <span className="user-name">{user.name}</span>
              <span className="user-role">{user.role}</span>
            </div>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="layout-main">
        {children}
      </main>

      {menuOpen && (
        <div 
          className="nav-overlay"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
