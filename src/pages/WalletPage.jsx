import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import Graph from '../components/Graph';
import QRCode from '../components/QRCode';
import Dropdown from '../components/Dropdown';
import Notification from '../components/Notification';
import { wallets as initialWallets } from '../data/wallets';
import { prices, getPriceHistory } from '../data/prices';
import { getStakingPositionsByCurrency } from '../data/staking';
import { formatCurrency, formatCrypto, formatPercentage } from '../utils/formatters';
import { generateAddress, generateQRData, calculateEuroValue } from '../utils/generators';

export default function WalletPage() {
  const navigate = useNavigate();
  const [wallets, setWallets] = useState(initialWallets);
  const [expandedCurrencies, setExpandedCurrencies] = useState(['BTC', 'ETH', 'AVAX']);
  const [notification, setNotification] = useState(null);
  const [showAddCurrencyDropdown, setShowAddCurrencyDropdown] = useState(false);
  
  // Available currencies not yet in wallet
  const availableCurrencies = [
    { value: 'MATIC', label: 'Polygon (MATIC)' },
    { value: 'DOT', label: 'Polkadot (DOT)' },
    { value: 'BASE', label: 'Base (BASE)' },
    { value: 'BNB', label: 'Binance Coin (BNB)' },
    { value: 'USDC', label: 'USD Coin (USDC)' },
    { value: 'EURC', label: 'Euro Coin (EURC)' }
  ].filter(curr => !wallets.find(w => w.currency === curr.value));

  // Calculate total portfolio value
  const totalPortfolioValue = wallets.reduce((sum, wallet) => sum + wallet.euroValue, 0);

  // Calculate 30-day change (aggregate from mock data with 0.1%-1% random daily changes)
  const [portfolioChange, setPortfolioChange] = useState({ amount: 0, percentage: 0 });

  useEffect(() => {
    // Simulate 30-day portfolio change calculation
    // In real app, this would use historical data
    // For mock: use average of individual currency changes weighted by portfolio value
    const weightedChange = wallets.reduce((sum, wallet) => {
      const weight = wallet.euroValue / totalPortfolioValue;
      const currencyPrice = prices.find(p => p.currency === wallet.currency);
      const change30d = currencyPrice ? currencyPrice.change30d : 10.0;
      return sum + (change30d * weight);
    }, 0);

    const changeAmount = (totalPortfolioValue * weightedChange) / 100;
    setPortfolioChange({
      amount: changeAmount,
      percentage: weightedChange
    });
  }, [wallets, totalPortfolioValue]);

  // Generate portfolio performance graph data (30 days)
  const [portfolioGraphData, setPortfolioGraphData] = useState([]);

  useEffect(() => {
    // Aggregate price history for all currencies
    const historyData = [];
    const days = 30;
    
    for (let i = 0; i <= days; i++) {
      const date = new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000);
      const dateStr = date.toISOString().split('T')[0];
      
      let totalValue = 0;
      wallets.forEach(wallet => {
        const priceData = prices.find(p => p.currency === wallet.currency);
        if (priceData && priceData.priceHistory[i]) {
          totalValue += wallet.totalBalance * priceData.priceHistory[i].price;
        }
      });
      
      historyData.push({
        date: dateStr,
        value: totalValue
      });
    }
    
    setPortfolioGraphData(historyData);
  }, [wallets]);

  // Toggle currency expansion
  const toggleCurrencyExpansion = (currency) => {
    setExpandedCurrencies(prev => 
      prev.includes(currency) 
        ? prev.filter(c => c !== currency)
        : [...prev, currency]
    );
  };

  // Generate new address for currency
  const handleGenerateAddress = (currencyCode) => {
    const wallet = wallets.find(w => w.currency === currencyCode);
    if (!wallet) return;

    const newAddress = {
      id: `${currencyCode.toLowerCase()}-${wallet.addresses.length + 1}`,
      address: generateAddress(currencyCode, wallet.addresses.length),
      qrData: generateQRData(generateAddress(currencyCode, wallet.addresses.length), currencyCode),
      balance: 0,
      euroValue: 0,
      label: `${currencyCode} Address ${wallet.addresses.length + 1}`
    };

    setWallets(prev => prev.map(w => 
      w.currency === currencyCode 
        ? { ...w, addresses: [...w.addresses, newAddress] }
        : w
    ));

    showNotification('success', `New ${currencyCode} address generated successfully`);
  };

  // Copy address to clipboard
  const handleCopyAddress = async (address) => {
    try {
      await navigator.clipboard.writeText(address);
      showNotification('success', 'Address copied to clipboard');
    } catch (err) {
      showNotification('error', 'Failed to copy address');
    }
  };

  // Navigate to trading page
  const handleBuySell = (currency) => {
    navigate('/transactions', { state: { selectedCurrency: currency, tab: 'trading' } });
  };

  // Deposit/Withdrawal placeholder
  const handleDepositWithdrawal = (type, currency) => {
    showNotification('success', `${type} feature simulated for ${currency}`);
  };

  // Add new currency to wallet
  const handleAddCurrency = (currencyCode) => {
    const currencyNames = {
      'MATIC': 'Polygon',
      'DOT': 'Polkadot',
      'BASE': 'Base',
      'BNB': 'Binance Coin',
      'USDC': 'USD Coin',
      'EURC': 'Euro Coin'
    };

    const newWallet = {
      id: wallets.length + 1,
      currency: currencyCode,
      name: currencyNames[currencyCode],
      totalBalance: 0,
      euroValue: 0,
      addresses: []
    };

    setWallets(prev => [...prev, newWallet]);
    setExpandedCurrencies(prev => [...prev, currencyCode]);
    setShowAddCurrencyDropdown(false);
    showNotification('success', `${currencyNames[currencyCode]} (${currencyCode}) added to wallet`);
  };

  // Show notification helper
  const showNotification = (type, message) => {
    setNotification({ type, message });
  };

  // Get balance breakdown (Available/Locked for staking)
  const getBalanceBreakdown = (currency, totalBalance) => {
    const stakingPositions = getStakingPositionsByCurrency(currency);
    const lockedAmount = stakingPositions.reduce((sum, pos) => sum + pos.amount, 0);
    const availableAmount = totalBalance - lockedAmount;

    if (lockedAmount > 0) {
      return {
        available: availableAmount,
        locked: lockedAmount,
        hasLocked: true
      };
    }

    return {
      available: totalBalance,
      locked: 0,
      hasLocked: false
    };
  };

  return (
    <div className="wallet-page">
      {/* Portfolio Header */}
      <div className="wallet-header">
        <div className="portfolio-summary">
          <h1 className="page-title">Portfolio Overview</h1>
          <div className="portfolio-value">
            <span className="value-label">Total Value</span>
            <span className="value-amount">{formatCurrency(totalPortfolioValue, 'EUR')}</span>
            <span className={`value-change ${portfolioChange.amount >= 0 ? 'positive' : 'negative'}`}>
              {formatPercentage(portfolioChange.percentage, 2, true)} 
              {' '}({formatCurrency(Math.abs(portfolioChange.amount), 'EUR')})
              <span className="change-period">30d</span>
            </span>
          </div>
        </div>

        {/* 30-Day Performance Graph */}
        <Card title="30-Day Performance" className="performance-card">
          <Graph 
            data={portfolioGraphData}
            xKey="date"
            yKey="value"
            color="var(--color-chart-line)"
          />
        </Card>
      </div>

      {/* Currency Wallets */}
      <div className="wallet-currencies">
        <div className="currencies-header">
          <h2>Your Cryptocurrencies</h2>
          {availableCurrencies.length > 0 && (
            <Button 
              variant="primary" 
              size="sm"
              onClick={() => setShowAddCurrencyDropdown(!showAddCurrencyDropdown)}
            >
              + Add Currency
            </Button>
          )}
        </div>

        {showAddCurrencyDropdown && (
          <div className="add-currency-dropdown">
            <Dropdown 
              options={availableCurrencies}
              value=""
              onChange={(value) => handleAddCurrency(value)}
              placeholder="Select currency to add..."
            />
          </div>
        )}

        {wallets.map(wallet => {
          const isExpanded = expandedCurrencies.includes(wallet.currency);
          const breakdown = getBalanceBreakdown(wallet.currency, wallet.totalBalance);

          return (
            <Card 
              key={wallet.currency} 
              className="currency-card"
            >
              <div className="currency-header">
                <div className="currency-info">
                  <h3 className="currency-name">{wallet.name} ({wallet.currency})</h3>
                  <div className="currency-balance">
                    {breakdown.hasLocked ? (
                      <>
                        <span className="balance-available">
                          Available: {formatCrypto(breakdown.available, wallet.currency)}
                        </span>
                        <span className="balance-divider">/</span>
                        <span className="balance-locked">
                          Locked: {formatCrypto(breakdown.locked, wallet.currency)}
                        </span>
                      </>
                    ) : (
                      <span className="balance-total">
                        {formatCrypto(wallet.totalBalance, wallet.currency)}
                      </span>
                    )}
                    <span className="balance-euro">
                      {formatCurrency(wallet.euroValue, 'EUR')}
                    </span>
                  </div>
                </div>
                <div className="currency-actions">
                  <Button 
                    variant="primary" 
                    size="sm"
                    onClick={() => handleBuySell(wallet.currency)}
                  >
                    Buy/Sell
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="sm"
                    onClick={() => toggleCurrencyExpansion(wallet.currency)}
                  >
                    {isExpanded ? '▲ Collapse' : '▼ Expand'}
                  </Button>
                </div>
              </div>

              {isExpanded && (
                <div className="currency-details">
                  <div className="addresses-header">
                    <h4>Addresses ({wallet.addresses.length})</h4>
                    <Button 
                      variant="secondary" 
                      size="sm"
                      onClick={() => handleGenerateAddress(wallet.currency)}
                    >
                      + Generate Address
                    </Button>
                  </div>

                  <div className="addresses-list">
                    {wallet.addresses.length === 0 ? (
                      <p className="no-addresses">No addresses yet. Click "Generate Address" to create one.</p>
                    ) : (
                      wallet.addresses.map(addr => (
                        <div key={addr.id} className="address-row">
                          <div className="address-info">
                            <span className="address-id">{addr.id}</span>
                            <span className="address-string">{addr.address}</span>
                            <span className="address-label">{addr.label}</span>
                          </div>
                          <div className="address-balance">
                            <span className="addr-balance-crypto">
                              {formatCrypto(addr.balance, wallet.currency)}
                            </span>
                            <span className="addr-balance-euro">
                              {formatCurrency(addr.euroValue, 'EUR')}
                            </span>
                          </div>
                          <div className="address-actions">
                            <QRCode value={addr.address} size={128} />
                            <Button 
                              variant="secondary" 
                              size="sm"
                              onClick={() => handleCopyAddress(addr.address)}
                            >
                              Copy
                            </Button>
                            <Button 
                              variant="secondary" 
                              size="sm"
                              onClick={() => handleDepositWithdrawal('Deposit', wallet.currency)}
                            >
                              Deposit
                            </Button>
                            <Button 
                              variant="secondary" 
                              size="sm"
                              onClick={() => handleDepositWithdrawal('Withdrawal', wallet.currency)}
                            >
                              Withdraw
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Notification */}
      {notification && (
        <Notification 
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
}
