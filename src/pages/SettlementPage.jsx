import React, { useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import { settlement } from '../data/settlement';
import { formatCurrency } from '../utils/formatters';

const SettlementPage = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [copiedIban, setCopiedIban] = useState(false);

  // Calculate utilization percentage
  const utilization = (Math.abs(settlement.balance) / settlement.maxLimit) * 100;
  
  // Determine utilization status and color
  const getUtilizationStatus = () => {
    if (utilization > 80) return { status: 'danger', color: 'var(--color-danger)' };
    if (utilization > 50) return { status: 'warning', color: 'var(--color-warning)' };
    return { status: 'normal', color: 'var(--color-success)' };
  };

  const utilizationStatus = getUtilizationStatus();

  // Calculate time until settlement due
  const calculateTimeRemaining = () => {
    const now = Date.now();
    const due = new Date(settlement.settlementDue).getTime();
    const diff = due - now;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    return hours;
  };

  const hoursRemaining = calculateTimeRemaining();

  // Handle IBAN copy
  const handleCopyIban = async () => {
    try {
      await navigator.clipboard.writeText(settlement.iban);
      setCopiedIban(true);
      setTimeout(() => setCopiedIban(false), 2000);
    } catch (err) {
      console.error('Failed to copy IBAN:', err);
    }
  };

  return (
    <div className="settlement-page">
      {/* Warning Banner */}
      <div className="warning-banner">
        <div className="warning-icon">⚠️</div>
        <div className="warning-text">
          Settlement due in {hoursRemaining}h
        </div>
        <div 
          className="tooltip-trigger"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <span className="help-icon">?</span>
          {showTooltip && (
            <div className="tooltip">
              Lack of settlement will result in freezing of assets and trading on the account
            </div>
          )}
        </div>
      </div>

      {/* Settlement Grid */}
      <div className="settlement-grid">
        {/* Current Balance Card */}
        <Card>
          <div className="card-header">
            <h2>Current Balance</h2>
            <p className="card-subtitle">Debit balance to be settled</p>
          </div>
          <div className="balance-display">
            <div className="balance-negative">
              {formatCurrency(settlement.balance, settlement.currency)}
            </div>
          </div>
        </Card>

        {/* Maximum Debit Limit Card */}
        <Card>
          <div className="card-header">
            <h2>Maximum Debit Limit</h2>
            <p className="card-subtitle">Total available credit line</p>
          </div>
          <div className="limit-display">
            <div className="limit-value">
              {formatCurrency(settlement.maxLimit, settlement.currency)}
            </div>
          </div>
        </Card>

        {/* Utilization Progress Card */}
        <Card>
          <div className="card-header">
            <h2>Credit Line Utilization</h2>
            <p className="card-subtitle">
              Percentage of available credit used
            </p>
          </div>
          <div className="utilization-container">
            <div className="progress-bar">
              <div 
                className={`progress-fill ${utilizationStatus.status}`}
                style={{ 
                  width: `${utilization}%`,
                  backgroundColor: utilizationStatus.color 
                }}
              ></div>
            </div>
            <div className="utilization-text">
              <span className="utilization-percentage">
                {utilization.toFixed(2)}% utilized
              </span>
              <span className="utilization-amount">
                {formatCurrency(Math.abs(settlement.balance), settlement.currency)} / {formatCurrency(settlement.maxLimit, settlement.currency)}
              </span>
            </div>
          </div>
        </Card>

        {/* Transfer Details Card */}
        <Card>
          <div className="card-header">
            <h2>Settlement Transfer Details</h2>
            <p className="card-subtitle">Bank account for settlement payments</p>
          </div>
          <div className="transfer-details">
            <div className="detail-row">
              <span className="detail-label">Beneficiary:</span>
              <span className="detail-value">{settlement.beneficiary}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Bank:</span>
              <span className="detail-value">{settlement.bankName}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">IBAN:</span>
              <div className="iban-group">
                <span className="detail-value iban-value">{settlement.iban}</span>
                <Button 
                  variant="secondary" 
                  size="sm"
                  onClick={handleCopyIban}
                >
                  {copiedIban ? '✓ Copied' : '📋 Copy'}
                </Button>
              </div>
            </div>
            <div className="detail-row">
              <span className="detail-label">BIC/SWIFT:</span>
              <span className="detail-value">{settlement.bic}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Currency:</span>
              <span className="detail-value">{settlement.currency}</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Settlement Instructions */}
      <Card>
        <div className="card-header">
          <h2>Settlement Instructions</h2>
        </div>
        <div className="instructions-content">
          <p>
            To settle your debit balance, please transfer the required amount to the bank account details provided above.
          </p>
          <ul>
            <li>Transfer the <strong>exact amount</strong> shown in Current Balance</li>
            <li>Use the provided IBAN for the transfer</li>
            <li>Include your <strong>company ID</strong> in the payment reference</li>
            <li>Ensure the transfer is completed before the settlement deadline</li>
            <li>Funds typically clear within 1-2 business days</li>
          </ul>
          <p className="warning-text">
            ⚠️ Failure to settle by the deadline will result in account restrictions including freezing of assets and suspension of trading privileges.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default SettlementPage;
