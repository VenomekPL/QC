// Mock transaction data for Q Crypto platform
// Generate timestamps for the last 30 days
const now = Date.now();
const day = 24 * 60 * 60 * 1000; // milliseconds in a day

export const transactions = [
  // Recent transactions (last 7 days)
  {
    id: 'tx-001',
    type: 'deposit',
    currency: 'BTC',
    amount: 0.5,
    fiatValue: 22875.00,
    timestamp: now - 1 * day,
    status: 'completed',
    address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    txHash: '3a7bd3e2360a3d29eea436fcfb7e44c735d117c42d1c1835420294a6cf8a1c',
    notes: 'Client deposit'
  },
  {
    id: 'tx-002',
    type: 'withdrawal',
    currency: 'ETH',
    amount: 5.2,
    fiatValue: 13000.00,
    timestamp: now - 2 * day,
    status: 'completed',
    address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    txHash: '0x9f4e8a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f',
    notes: 'Client withdrawal request'
  },
  {
    id: 'tx-003',
    type: 'trade',
    currency: 'BTC',
    amount: 0.2,
    fiatValue: 9150.00,
    timestamp: now - 3 * day,
    status: 'completed',
    tradePair: 'BTC/EUR',
    tradePrice: 45750.00,
    notes: 'Market buy order'
  },
  {
    id: 'tx-004',
    type: 'deposit',
    currency: 'AVAX',
    amount: 1000,
    fiatValue: 25000.00,
    timestamp: now - 4 * day,
    status: 'completed',
    address: 'X-avax1qzauyy8rhaqwpe5u6k3q9yzyqwpe5u6k3q9yzy',
    txHash: 'avax_tx_4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
    notes: 'Institutional deposit'
  },
  {
    id: 'tx-005',
    type: 'trade',
    currency: 'ETH',
    amount: 10.5,
    fiatValue: 26250.00,
    timestamp: now - 5 * day,
    status: 'completed',
    tradePair: 'ETH/EUR',
    tradePrice: 2500.00,
    notes: 'Limit sell order'
  },
  {
    id: 'tx-006',
    type: 'withdrawal',
    currency: 'BTC',
    amount: 0.15,
    fiatValue: 6862.50,
    timestamp: now - 6 * day,
    status: 'pending',
    address: '3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5',
    notes: 'Awaiting approval'
  },
  
  // Older transactions (8-30 days ago)
  {
    id: 'tx-007',
    type: 'deposit',
    currency: 'ETH',
    amount: 25.0,
    fiatValue: 62500.00,
    timestamp: now - 10 * day,
    status: 'completed',
    address: '0x5aAeb6053F3E94C9b9A09f33669435E7Ef1BeAed',
    txHash: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
    notes: 'Large client deposit'
  },
  {
    id: 'tx-008',
    type: 'trade',
    currency: 'AVAX',
    amount: 500,
    fiatValue: 12500.00,
    timestamp: now - 12 * day,
    status: 'completed',
    tradePair: 'AVAX/EUR',
    tradePrice: 25.00,
    notes: 'Market sell order'
  },
  {
    id: 'tx-009',
    type: 'withdrawal',
    currency: 'ETH',
    amount: 8.5,
    fiatValue: 21250.00,
    timestamp: now - 15 * day,
    status: 'completed',
    address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    txHash: '0x9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b',
    notes: 'Client withdrawal'
  },
  {
    id: 'tx-010',
    type: 'deposit',
    currency: 'BTC',
    amount: 1.2,
    fiatValue: 54900.00,
    timestamp: now - 18 * day,
    status: 'completed',
    address: 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq',
    txHash: '7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d',
    notes: 'Trading account funding'
  },
  {
    id: 'tx-011',
    type: 'trade',
    currency: 'BTC',
    amount: 0.8,
    fiatValue: 36600.00,
    timestamp: now - 20 * day,
    status: 'completed',
    tradePair: 'BTC/EUR',
    tradePrice: 45750.00,
    notes: 'Limit buy order'
  },
  {
    id: 'tx-012',
    type: 'deposit',
    currency: 'AVAX',
    amount: 2000,
    fiatValue: 50000.00,
    timestamp: now - 22 * day,
    status: 'completed',
    address: 'X-avax1s65kep4smpr9cnf6uh9cuuud4ndm2z4jguj3gp',
    txHash: 'avax_tx_8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e',
    notes: 'Staking deposit'
  },
  {
    id: 'tx-013',
    type: 'withdrawal',
    currency: 'AVAX',
    amount: 750,
    fiatValue: 18750.00,
    timestamp: now - 24 * day,
    status: 'completed',
    address: 'X-avax1qzauyy8rhaqwpe5u6k3q9yzyqwpe5u6k3q9yzy',
    txHash: 'avax_tx_2f3g4h5i6j7k8l9m0n1o2p3q4r5s6t7u8v9w0x1y2z3a',
    notes: 'Profit taking'
  },
  {
    id: 'tx-014',
    type: 'trade',
    currency: 'ETH',
    amount: 15.0,
    fiatValue: 37500.00,
    timestamp: now - 26 * day,
    status: 'completed',
    tradePair: 'ETH/EUR',
    tradePrice: 2500.00,
    notes: 'Market buy order'
  },
  {
    id: 'tx-015',
    type: 'deposit',
    currency: 'BTC',
    amount: 2.5,
    fiatValue: 114375.00,
    timestamp: now - 28 * day,
    status: 'completed',
    address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    txHash: '5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a',
    notes: 'Initial portfolio funding'
  }
];

// Get transactions by type
export function getTransactionsByType(type) {
  return transactions.filter(tx => tx.type === type);
}

// Get transactions by currency
export function getTransactionsByCurrency(currency) {
  return transactions.filter(tx => tx.currency === currency);
}

// Get transactions by status
export function getTransactionsByStatus(status) {
  return transactions.filter(tx => tx.status === status);
}

// Get transactions in date range
export function getTransactionsInRange(startDate, endDate) {
  return transactions.filter(tx => 
    tx.timestamp >= startDate && tx.timestamp <= endDate
  );
}

// Get recent transactions (last N days)
export function getRecentTransactions(days = 7) {
  const cutoffDate = now - (days * day);
  return transactions.filter(tx => tx.timestamp >= cutoffDate);
}

// Get transaction by ID
export function getTransactionById(id) {
  return transactions.find(tx => tx.id === id);
}

// Get pending transactions count
export function getPendingTransactionsCount() {
  return transactions.filter(tx => tx.status === 'pending').length;
}

// Calculate total volume by currency
export function getTotalVolumeByCurrency(currency, days = 30) {
  const cutoffDate = now - (days * day);
  return transactions
    .filter(tx => tx.currency === currency && tx.timestamp >= cutoffDate)
    .reduce((total, tx) => total + tx.fiatValue, 0);
}
