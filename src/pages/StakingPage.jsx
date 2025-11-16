import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import Modal from '../components/Modal';
import Notification from '../components/Notification';
import Graph from '../components/Graph';
import { availableStaking, stakingPositions as initialPositions, generateEarningsHistory } from '../data/staking';
import { wallets } from '../data/wallets';
import { prices } from '../data/prices';
import { formatCurrency, formatCrypto, formatDate } from '../utils/formatters';

const StakingPage = () => {
  const [stakingPositions, setStakingPositions] = useState(initialPositions);
  const [showStakeModal, setShowStakeModal] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [stakeAmount, setStakeAmount] = useState('');
  const [notification, setNotification] = useState(null);
  
  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };
  
  // Calculate total locked value
  const totalLockedValue = stakingPositions.reduce((total, position) => {
    const price = prices.find(p => p.currency === position.currency)?.currentPrice || 0;
    return total + (position.amountStaked * price);
  }, 0);
  
  // Generate earnings history
  const earningsHistory = generateEarningsHistory(stakingPositions, prices);
  
  // Handle Stake button click
  const handleStakeClick = (currency) => {
    setSelectedCurrency(currency);
    setStakeAmount('');
    setShowStakeModal(true);
  };
  
  // Get available balance for selected currency
  const getAvailableBalance = () => {
    if (!selectedCurrency) return 0;
    const wallet = wallets.find(w => w.currency === selectedCurrency);
    return wallet?.totalBalance || 0;
  };
  
  // Calculate estimated yearly earnings
  const calculateEstimatedEarnings = () => {
    if (!stakeAmount || !selectedCurrency) return 0;
    const amount = parseFloat(stakeAmount);
    if (isNaN(amount)) return 0;
    
    const stakingOption = availableStaking.find(s => s.currency === selectedCurrency);
    const price = prices.find(p => p.currency === selectedCurrency)?.currentPrice || 0;
    
    return amount * price * (stakingOption.apy / 100);
  };
  
  // Validate balance
  const isBalanceSufficient = () => {
    const amount = parseFloat(stakeAmount);
    if (isNaN(amount) || amount <= 0) return false;
    return amount <= getAvailableBalance();
  };
  
  // Handle Confirm Staking
  const handleConfirmStaking = () => {
    if (!isBalanceSufficient()) {
      showNotification('error', 'Insufficient balance');
      return;
    }
    
    const stakingOption = availableStaking.find(s => s.currency === selectedCurrency);
    const amount = parseFloat(stakeAmount);
    
    const newPosition = {
      id: Date.now(),
      currency: selectedCurrency,
      amountStaked: amount,
      apy: stakingOption.apy,
      lockPeriod: stakingOption.lockPeriod,
      lockPeriodMs: stakingOption.lockPeriodMs,
      expirationDate: new Date(Date.now() + stakingOption.lockPeriodMs),
      earnedAmount: 0,
      startDate: new Date()
    };
    
    setStakingPositions([...stakingPositions, newPosition]);
    setShowStakeModal(false);
    setStakeAmount('');
    showNotification('success', 'Staking successful');
  };
  
  // Handle Unstake
  const handleUnstake = (position) => {
    const now = Date.now();
    const expirationTime = new Date(position.expirationDate).getTime();
    
    if (expirationTime > now) {
      const hoursRemaining = Math.ceil((expirationTime - now) / (1000 * 60 * 60));
      showNotification('warning', `Lock period not expired. ${hoursRemaining}h remaining.`);
      return;
    }
    
    setStakingPositions(stakingPositions.filter(p => p.id !== position.id));
    showNotification('success', `Unstaked ${formatCrypto(position.amountStaked, position.currency)}`);
  };
  
  // Get time remaining for lock period
  const getTimeRemaining = (expirationDate) => {
    const now = Date.now();
    const expiration = new Date(expirationDate).getTime();
    const diff = expiration - now;
    
    if (diff <= 0) return 'Expired';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 24) {
      const days = Math.floor(hours / 24);
      return `${days}d ${hours % 24}h`;
    }
    return `${hours}h ${minutes}m`;
  };
  
  // Check if unstake is available
  const canUnstake = (expirationDate) => {
    return new Date(expirationDate).getTime() <= Date.now();
  };
  
  return (
    <div className="staking-page">
      <div className="page-header">
        <h1 className="page-title">Staking & Passive Income</h1>
        <p className="page-subtitle">Stake your assets to earn passive rewards</p>
      </div>
      
      {/* Notification */}
      {notification && (
        <Notification type={notification.type} message={notification.message} />
      )}
      
      {/* Staking Header */}
      <Card className="staking-header">
        <div className="header-content">
          <div className="locked-value">
            <h2>Total Locked Assets</h2>
            <div className="value-display">
              {formatCurrency(totalLockedValue, 'EUR')}
            </div>
            <p className="value-subtitle">Total staked across all assets</p>
          </div>
        </div>
        
        {/* 30-Day Earnings Graph */}
        {earningsHistory.length > 0 && (
          <div className="earnings-graph">
            <h3>30-Day Earnings History</h3>
            <Graph
              data={earningsHistory}
              xKey="date"
              yKey="earnings"
              color="var(--color-accent)"
              height={200}
            />
          </div>
        )}
      </Card>
      
      {/* Staking Panels */}
      <div className="staking-grid">
        {availableStaking.map(option => {
          const position = stakingPositions.find(p => p.currency === option.currency);
          const wallet = wallets.find(w => w.currency === option.currency);
          const price = prices.find(p => p.currency === option.currency)?.currentPrice || 0;
          
          return (
            <Card key={option.currency} className="staking-panel">
              <div className="panel-header">
                <h3>{option.currency} Staking</h3>
                <span className="apy-badge">{option.apy}% APY</span>
              </div>
              
              <p className="panel-description">{option.description}</p>
              
              <div className="lock-warning">
                🔒 Lock period: {option.lockPeriod}
              </div>
              
              <div className="available-balance">
                Available: {formatCrypto(wallet?.totalBalance || 0, option.currency)}
              </div>
              
              {!position && (
                <Button
                  variant="primary"
                  onClick={() => handleStakeClick(option.currency)}
                  className="stake-button"
                >
                  Stake {option.currency}
                </Button>
              )}
              
              {position && (
                <div className="staked-info">
                  <div className="info-row">
                    <span className="info-label">Amount Staked:</span>
                    <span className="info-value">
                      {formatCrypto(position.amountStaked, position.currency)}
                    </span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Lock Expires:</span>
                    <span className="info-value">
                      {formatDate(position.expirationDate, 'long')}
                    </span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Time Remaining:</span>
                    <span className="info-value time-remaining">
                      {getTimeRemaining(position.expirationDate)}
                    </span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Earned:</span>
                    <span className="info-value earned-amount">
                      {formatCurrency(position.earnedAmount, 'EUR')}
                    </span>
                  </div>
                  
                  <Button
                    variant={canUnstake(position.expirationDate) ? 'primary' : 'secondary'}
                    onClick={() => handleUnstake(position)}
                    disabled={!canUnstake(position.expirationDate)}
                    className="unstake-button"
                    title={!canUnstake(position.expirationDate) ? 'Lock period not expired' : ''}
                  >
                    {canUnstake(position.expirationDate) ? 'Unstake' : `Locked (${getTimeRemaining(position.expirationDate)})`}
                  </Button>
                </div>
              )}
            </Card>
          );
        })}
      </div>
      
      {/* Stake Modal */}
      {showStakeModal && selectedCurrency && (
        <Modal
          title={`Stake ${selectedCurrency}`}
          onClose={() => setShowStakeModal(false)}
        >
          <div className="modal-form">
            <div className="balance-info">
              <span>Available Balance:</span>
              <strong>{formatCrypto(getAvailableBalance(), selectedCurrency)}</strong>
            </div>
            
            <Input
              label="Amount"
              type="number"
              value={stakeAmount}
              onChange={(e) => setStakeAmount(e.target.value)}
              placeholder="0.00"
              step="0.01"
            />
            
            {stakeAmount && (
              <div className="estimated-earnings">
                <div className="earnings-label">Estimated Yearly Earnings:</div>
                <div className="earnings-value">
                  {formatCurrency(calculateEstimatedEarnings(), 'EUR')}
                </div>
              </div>
            )}
            
            <div className="lock-period-reminder">
              ⚠️ Your funds will be locked for{' '}
              <strong>
                {availableStaking.find(s => s.currency === selectedCurrency)?.lockPeriod}
              </strong>
            </div>
            
            {stakeAmount && !isBalanceSufficient() && (
              <div className="error-message">
                Insufficient balance
              </div>
            )}
            
            <div className="modal-actions">
              <Button variant="secondary" onClick={() => setShowStakeModal(false)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleConfirmStaking}
                disabled={!stakeAmount || !isBalanceSufficient()}
              >
                Confirm Staking
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default StakingPage;
