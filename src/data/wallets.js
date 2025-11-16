// Mock wallet data for Q Crypto platform
export const wallets = [
  {
    id: 1,
    currency: 'BTC',
    name: 'Bitcoin',
    totalBalance: 10.5,
    euroValue: 480750.00,
    addresses: [
      {
        id: 'btc-1',
        address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
        qrData: 'bitcoin:bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
        balance: 6.5,
        euroValue: 297375.00,
        label: 'Main BTC Wallet'
      },
      {
        id: 'btc-2',
        address: 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq',
        qrData: 'bitcoin:bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq',
        balance: 3.2,
        euroValue: 146400.00,
        label: 'Trading BTC Wallet'
      },
      {
        id: 'btc-3',
        address: '3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5',
        qrData: 'bitcoin:3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5',
        balance: 0.8,
        euroValue: 36600.00,
        label: 'Cold Storage BTC'
      }
    ]
  },
  {
    id: 2,
    currency: 'ETH',
    name: 'Ethereum',
    totalBalance: 125,
    euroValue: 312500.00,
    addresses: [
      {
        id: 'eth-1',
        address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
        qrData: 'ethereum:0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
        balance: 85.5,
        euroValue: 213750.00,
        label: 'Main ETH Wallet'
      },
      {
        id: 'eth-2',
        address: '0x5aAeb6053F3E94C9b9A09f33669435E7Ef1BeAed',
        qrData: 'ethereum:0x5aAeb6053F3E94C9b9A09f33669435E7Ef1BeAed',
        balance: 39.5,
        euroValue: 98750.00,
        label: 'Staking ETH Wallet'
      }
    ]
  },
  {
    id: 3,
    currency: 'AVAX',
    name: 'Avalanche',
    totalBalance: 5000,
    euroValue: 125000.00,
    addresses: [
      {
        id: 'avax-1',
        address: 'X-avax1qzauyy8rhaqwpe5u6k3q9yzyqwpe5u6k3q9yzy',
        qrData: 'avalanche:X-avax1qzauyy8rhaqwpe5u6k3q9yzyqwpe5u6k3q9yzy',
        balance: 3200,
        euroValue: 80000.00,
        label: 'Main AVAX Wallet'
      },
      {
        id: 'avax-2',
        address: 'X-avax1s65kep4smpr9cnf6uh9cuuud4ndm2z4jguj3gp',
        qrData: 'avalanche:X-avax1s65kep4smpr9cnf6uh9cuuud4ndm2z4jguj3gp',
        balance: 1800,
        euroValue: 45000.00,
        label: 'Trading AVAX Wallet'
      }
    ]
  }
];

// Get wallet by currency
export function getWalletByCurrency(currency) {
  return wallets.find(wallet => wallet.currency === currency);
}

// Get all addresses for a currency
export function getAddressesByCurrency(currency) {
  const wallet = getWalletByCurrency(currency);
  return wallet ? wallet.addresses : [];
}

// Get address by ID
export function getAddressById(addressId) {
  for (const wallet of wallets) {
    const address = wallet.addresses.find(addr => addr.id === addressId);
    if (address) return address;
  }
  return null;
}

// Get total portfolio value in EUR
export function getTotalPortfolioValue() {
  return wallets.reduce((total, wallet) => total + wallet.euroValue, 0);
}

// Get wallet summary
export function getWalletSummary() {
  return wallets.map(wallet => ({
    currency: wallet.currency,
    name: wallet.name,
    balance: wallet.totalBalance,
    euroValue: wallet.euroValue,
    addressCount: wallet.addresses.length
  }));
}
