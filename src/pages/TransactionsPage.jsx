import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import Dropdown from '../components/Dropdown';
import Tabs from '../components/Tabs';
import Modal from '../components/Modal';
import Notification from '../components/Notification';
import Table from '../components/Table';
import { wallets } from '../data/wallets';
import { transactions as initialTransactions } from '../data/transactions';
import { prices, getCurrentPrice } from '../data/prices';
import { formatCurrency, formatCrypto, formatDate, formatTransactionType, formatStatus } from '../utils/formatters';
import { calculateCryptoAmount, calculateEuroValue, generateTransactionId } from '../utils/generators';

export default function TransactionsPage() {
  const location = useLocation();
  const [mainTab, setMainTab] = useState('trading');
  const [selectedAsset, setSelectedAsset] = useState('BTC');
  const [tradeTab, setTradeTab] = useState('buy');
  const [inputMode, setInputMode] = useState('fiat'); // fiat or crypto
  const [inputValue, setInputValue] = useState('');
  const [estimatedValue, setEstimatedValue] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [notification, setNotification] = useState(null);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [currentPrice, setCurrentPrice] = useState(0);
  
  // Filters
  const [filters, setFilters] = useState({
    dateRange: 'all',
    currency: 'all',
    type: 'all',
    minValue: '',
    maxValue: ''
  });

  // Initialize from navigation state if coming from wallet page
  useEffect(() => {
    if (location.state?.selectedCurrency) {
      setSelectedAsset(location.state.selectedCurrency);
    }
    if (location.state?.tab === 'trading') {
      setMainTab('trading');
    }
  }, [location.state]);

  // Update current price when asset changes
  useEffect(() => {
    const price = getCurrentPrice(selectedAsset);
    setCurrentPrice(price);
  }, [selectedAsset]);

  // Price ticker update (every 1 second, but value stays constant per spec)
  useEffect(() => {
    const interval = setInterval(() => {
      // In real app, this would fetch new price
      // For mockup, just trigger re-render with same price
      setCurrentPrice(getCurrentPrice(selectedAsset));
    }, 1000);
    return () => clearInterval(interval);
  }, [selectedAsset]);

  // Calculate estimated value with debounce (200ms)
  const debounceTimer = useRef(null);
  
  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      if (!inputValue || isNaN(inputValue)) {
        setEstimatedValue(0);
        return;
      }

      const amount = parseFloat(inputValue);
      if (inputMode === 'fiat') {
        // Calculate crypto amount from EUR
        const crypto = calculateCryptoAmount(amount, selectedAsset, currentPrice);
        setEstimatedValue(crypto);
      } else {
        // Calculate EUR from crypto amount
        const euro = calculateEuroValue(amount, selectedAsset, currentPrice);
        setEstimatedValue(euro);
      }
    }, 200);

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [inputValue, inputMode, selectedAsset, currentPrice]);

  // Asset options for dropdown
  const assetOptions = wallets.map(w => ({
    value: w.currency,
    label: `${w.name} (${w.currency})`
  }));

  // Toggle input mode (fiat ↔ crypto)
  const handleToggleInputMode = () => {
    setInputMode(prev => prev === 'fiat' ? 'crypto' : 'fiat');
    setInputValue('');
    setEstimatedValue(0);
  };

  // Validate trading limits
  const validateTrade = () => {
    if (!inputValue || isNaN(inputValue)) {
      showNotification('error', 'Please enter a valid amount');
      return false;
    }

    const amount = parseFloat(inputValue);
    const fiatAmount = inputMode === 'fiat' ? amount : estimatedValue;

    // Trading limit: 4,000,000 EUR
    if (fiatAmount > 4000000) {
      showNotification('warning', 'Trading limit exceeded (max €4,000,000)');
      return false;
    }

    // Balance validation for sell
    if (tradeTab === 'sell') {
      const wallet = wallets.find(w => w.currency === selectedAsset);
      const cryptoAmount = inputMode === 'crypto' ? amount : estimatedValue;
      
      if (cryptoAmount > wallet.totalBalance) {
        showNotification('warning', 'Insufficient balance');
        return false;
      }
    }

    return true;
  };

  // Open confirmation modal
  const handleTrade = () => {
    if (!validateTrade()) return;

    setShowModal(true);
    setCountdown(60);
  };

  // Countdown timer in modal
  useEffect(() => {
    if (!showModal || countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleCancelTrade();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [showModal, countdown]);

  // Cancel trade
  const handleCancelTrade = () => {
    setShowModal(false);
    if (countdown === 0) {
      showNotification('warning', 'Trade cancelled - time expired');
    }
    setCountdown(60);
  };

  // Confirm trade
  const handleConfirmTrade = () => {
    const amount = parseFloat(inputValue);
    const cryptoAmount = inputMode === 'crypto' ? amount : estimatedValue;
    const fiatValue = inputMode === 'fiat' ? amount : estimatedValue;

    const newTransaction = {
      id: generateTransactionId(),
      type: tradeTab,
      currency: selectedAsset,
      amount: cryptoAmount,
      fiatValue: fiatValue,
      timestamp: Date.now(),
      status: 'completed',
      tradePair: `${selectedAsset}/EUR`,
      tradePrice: currentPrice,
      notes: `${tradeTab === 'buy' ? 'Market buy' : 'Market sell'} order`
    };

    setTransactions(prev => [newTransaction, ...prev]);
    setShowModal(false);
    setInputValue('');
    setEstimatedValue(0);
    showNotification('success', `${tradeTab === 'buy' ? 'Buy' : 'Sell'} order executed successfully`);
    setMainTab('history');
  };

  // Show notification helper
  const showNotification = (type, message) => {
    setNotification({ type, message });
  };

  // Filter transactions
  const filteredTransactions = transactions.filter(tx => {
    if (filters.currency !== 'all' && tx.currency !== filters.currency) return false;
    if (filters.type !== 'all' && tx.type !== filters.type) return false;
    
    if (filters.minValue && tx.fiatValue < parseFloat(filters.minValue)) return false;
    if (filters.maxValue && tx.fiatValue > parseFloat(filters.maxValue)) return false;

    if (filters.dateRange !== 'all') {
      const now = Date.now();
      const day = 24 * 60 * 60 * 1000;
      let cutoff = 0;
      
      switch(filters.dateRange) {
        case '7d': cutoff = now - 7 * day; break;
        case '30d': cutoff = now - 30 * day; break;
        case '90d': cutoff = now - 90 * day; break;
        default: cutoff = 0;
      }
      
      if (tx.timestamp < cutoff) return false;
    }

    return true;
  });

  // Table columns for transaction history
  const transactionColumns = [
    {
      key: 'timestamp',
      label: 'Date',
      render: (tx) => formatDate(tx.timestamp, 'short')
    },
    {
      key: 'type',
      label: 'Type',
      render: (tx) => (
        <span className={`tx-type tx-type-${tx.type}`}>
          {formatTransactionType(tx.type)}
        </span>
      )
    },
    {
      key: 'currency',
      label: 'Asset',
      render: (tx) => tx.currency
    },
    {
      key: 'amount',
      label: 'Amount',
      render: (tx) => formatCrypto(tx.amount, tx.currency)
    },
    {
      key: 'fiatValue',
      label: 'EUR Value',
      render: (tx) => formatCurrency(tx.fiatValue, 'EUR')
    },
    {
      key: 'status',
      label: 'Status',
      render: (tx) => (
        <span className={`tx-status tx-status-${tx.status}`}>
          {formatStatus(tx.status)}
        </span>
      )
    }
  ];

  return (
    <div className="transactions-page">
      <h1 className="page-title">Transactions</h1>

      {/* Main Tabs: Trading / History */}
      <Tabs 
        tabs={[
          { id: 'trading', label: 'Trading' },
          { id: 'history', label: 'Transaction History' }
        ]}
        activeTab={mainTab}
        onTabChange={setMainTab}
      />

      {/* Trading Tab */}
      {mainTab === 'trading' && (
        <div className="trading-section">
          <Card title="Trade Cryptocurrency" className="trading-card">
            {/* Asset Selection */}
            <div className="form-group">
              <label className="form-label">Select Asset</label>
              <Dropdown 
                options={assetOptions}
                value={selectedAsset}
                onChange={setSelectedAsset}
                placeholder="Select cryptocurrency..."
              />
            </div>

            {/* Current Price Ticker */}
            <div className="price-ticker">
              <span className="ticker-label">Current Price:</span>
              <span className="ticker-price">{formatCurrency(currentPrice, 'EUR')}</span>
              <span className="ticker-pair">per {selectedAsset}</span>
            </div>

            {/* Buy/Sell Tabs */}
            <Tabs 
              tabs={[
                { id: 'buy', label: 'Buy' },
                { id: 'sell', label: 'Sell' }
              ]}
              activeTab={tradeTab}
              onTabChange={setTradeTab}
            />

            {/* Input Field with Toggle */}
            <div className="form-group">
              <div className="input-with-toggle">
                <Input 
                  label={inputMode === 'fiat' ? 'Amount (EUR)' : `Amount (${selectedAsset})`}
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="0.00"
                />
                <Button 
                  variant="secondary"
                  size="sm"
                  onClick={handleToggleInputMode}
                  className="toggle-btn"
                >
                  ⇄
                </Button>
              </div>
            </div>

            {/* Estimated Value Display */}
            {inputValue && estimatedValue > 0 && (
              <div className="estimated-value">
                <span className="estimate-label">≈</span>
                <span className="estimate-amount">
                  {inputMode === 'fiat' 
                    ? formatCrypto(estimatedValue, selectedAsset)
                    : formatCurrency(estimatedValue, 'EUR')
                  }
                </span>
              </div>
            )}

            {/* Trade Button */}
            <div className="form-actions">
              <Button 
                variant="primary"
                size="lg"
                onClick={handleTrade}
                disabled={!inputValue || parseFloat(inputValue) <= 0}
              >
                {tradeTab === 'buy' ? 'Buy' : 'Sell'} {selectedAsset}
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Transaction History Tab */}
      {mainTab === 'history' && (
        <div className="history-section">
          {/* Filters */}
          <Card title="Filters" className="filters-card">
            <div className="filters-grid">
              <div className="filter-group">
                <label className="filter-label">Date Range</label>
                <Dropdown 
                  options={[
                    { value: 'all', label: 'All Time' },
                    { value: '7d', label: 'Last 7 Days' },
                    { value: '30d', label: 'Last 30 Days' },
                    { value: '90d', label: 'Last 90 Days' }
                  ]}
                  value={filters.dateRange}
                  onChange={(value) => setFilters(prev => ({ ...prev, dateRange: value }))}
                />
              </div>

              <div className="filter-group">
                <label className="filter-label">Currency</label>
                <Dropdown 
                  options={[
                    { value: 'all', label: 'All Currencies' },
                    ...assetOptions
                  ]}
                  value={filters.currency}
                  onChange={(value) => setFilters(prev => ({ ...prev, currency: value }))}
                />
              </div>

              <div className="filter-group">
                <label className="filter-label">Type</label>
                <Dropdown 
                  options={[
                    { value: 'all', label: 'All Types' },
                    { value: 'buy', label: 'Buy' },
                    { value: 'sell', label: 'Sell' },
                    { value: 'deposit', label: 'Deposit' },
                    { value: 'withdrawal', label: 'Withdrawal' },
                    { value: 'trade', label: 'Trade' }
                  ]}
                  value={filters.type}
                  onChange={(value) => setFilters(prev => ({ ...prev, type: value }))}
                />
              </div>

              <div className="filter-group">
                <Input 
                  label="Min Value (EUR)"
                  type="number"
                  value={filters.minValue}
                  onChange={(e) => setFilters(prev => ({ ...prev, minValue: e.target.value }))}
                  placeholder="0"
                />
              </div>

              <div className="filter-group">
                <Input 
                  label="Max Value (EUR)"
                  type="number"
                  value={filters.maxValue}
                  onChange={(e) => setFilters(prev => ({ ...prev, maxValue: e.target.value }))}
                  placeholder="∞"
                />
              </div>
            </div>
          </Card>

          {/* Transaction Table */}
          <Card title={`Transactions (${filteredTransactions.length})`} className="transactions-table-card">
            <Table 
              columns={transactionColumns}
              data={filteredTransactions}
              onRowClick={(tx) => showNotification('success', `Transaction ${tx.id} - ${formatStatus(tx.status)}`)}
            />
          </Card>
        </div>
      )}

      {/* Confirmation Modal */}
      {showModal && (
        <Modal 
          isOpen={showModal}
          onClose={handleCancelTrade}
          title="Confirm Trade"
        >
          <div className="trade-confirmation">
            <div className="confirmation-details">
              <div className="detail-row">
                <span className="detail-label">Type:</span>
                <span className="detail-value">{tradeTab === 'buy' ? 'Buy' : 'Sell'}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Asset:</span>
                <span className="detail-value">{selectedAsset}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Amount:</span>
                <span className="detail-value">
                  {inputMode === 'crypto' 
                    ? formatCrypto(parseFloat(inputValue), selectedAsset)
                    : formatCrypto(estimatedValue, selectedAsset)
                  }
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">EUR Value:</span>
                <span className="detail-value">
                  {inputMode === 'fiat' 
                    ? formatCurrency(parseFloat(inputValue), 'EUR')
                    : formatCurrency(estimatedValue, 'EUR')
                  }
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Price:</span>
                <span className="detail-value">{formatCurrency(currentPrice, 'EUR')} per {selectedAsset}</span>
              </div>
            </div>

            <div className="countdown-timer">
              <span className="countdown-label">Time remaining:</span>
              <span className={`countdown-value ${countdown <= 10 ? 'countdown-warning' : ''}`}>
                {countdown}s
              </span>
            </div>
          </div>

          <div className="modal-actions">
            <Button variant="secondary" onClick={handleCancelTrade}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleConfirmTrade}>
              Confirm Trade
            </Button>
          </div>
        </Modal>
      )}

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
