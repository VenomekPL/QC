import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Accept any credentials (per constitution - always successful)
    // Store mock user in localStorage
    const mockUser = {
      name: 'Demo User',
      email: email || '[email protected]',
      role: 'Admin',
      loginTime: new Date().toISOString()
    };
    
    localStorage.setItem('qcrypto_user', JSON.stringify(mockUser));
    
    // Navigate to wallet page
    navigate('/wallet');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(e);
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <div className="login-header">
          <h1 className="login-title">Q Crypto Login</h1>
          <p className="login-subtitle">Custodial Wallet Platform</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="[email protected]"
            autoComplete="email"
          />
          
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            autoComplete="current-password"
          />
          
          <Button
            variant="primary"
            type="submit"
            className="login-button"
          >
            Login
          </Button>
        </form>
        
        <div className="login-footer">
          <p className="login-note">
            💡 Demo Mode: Any credentials will work
          </p>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
