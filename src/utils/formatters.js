// Formatting utilities for Q Crypto platform

// Format currency amounts
export function formatCurrency(amount, currency = 'EUR', locale = 'en-US') {
  if (amount === null || amount === undefined) return '—';
  
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  
  return formatter.format(amount);
}

// Format crypto amounts with variable decimals
export function formatCrypto(amount, currency, decimals = null) {
  if (amount === null || amount === undefined) return '—';
  
  // Default decimals by currency
  const defaultDecimals = {
    'BTC': 8,
    'ETH': 6,
    'AVAX': 4
  };
  
  const precision = decimals ?? defaultDecimals[currency] ?? 4;
  
  return `${amount.toFixed(precision)} ${currency}`;
}

// Format dates
export function formatDate(timestamp, format = 'full') {
  if (!timestamp) return '—';
  
  const date = new Date(timestamp);
  
  switch(format) {
    case 'full':
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    case 'short':
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    case 'time':
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      });
    case 'relative':
      return formatRelativeTime(timestamp);
    case 'iso':
      return date.toISOString().split('T')[0];
    default:
      return date.toLocaleDateString('en-US');
  }
}

// Format relative time (e.g., "2 hours ago")
export function formatRelativeTime(timestamp) {
  if (!timestamp) return '—';
  
  const now = Date.now();
  const diff = now - timestamp;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (seconds < 60) return 'just now';
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (days < 30) return `${days} day${days > 1 ? 's' : ''} ago`;
  
  return formatDate(timestamp, 'short');
}

// Format numbers with thousand separators
export function formatNumber(value, decimals = 0) {
  if (value === null || value === undefined) return '—';
  
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value);
}

// Format percentage
export function formatPercentage(value, decimals = 2, showSign = true) {
  if (value === null || value === undefined) return '—';
  
  const sign = showSign && value > 0 ? '+' : '';
  return `${sign}${value.toFixed(decimals)}%`;
}

// Format large numbers with abbreviations (K, M, B)
export function formatCompactNumber(value) {
  if (value === null || value === undefined) return '—';
  
  if (Math.abs(value) >= 1e9) {
    return (value / 1e9).toFixed(2) + 'B';
  }
  if (Math.abs(value) >= 1e6) {
    return (value / 1e6).toFixed(2) + 'M';
  }
  if (Math.abs(value) >= 1e3) {
    return (value / 1e3).toFixed(2) + 'K';
  }
  return value.toFixed(2);
}

// Format transaction status
export function formatStatus(status) {
  const statusMap = {
    'completed': 'Completed',
    'pending': 'Pending',
    'failed': 'Failed',
    'active': 'Active',
    'maturing': 'Maturing',
    'cancelled': 'Cancelled'
  };
  
  return statusMap[status] || status;
}

// Format transaction type
export function formatTransactionType(type) {
  const typeMap = {
    'deposit': 'Deposit',
    'withdrawal': 'Withdrawal',
    'trade': 'Trade',
    'transfer': 'Transfer',
    'stake': 'Stake',
    'unstake': 'Unstake',
    'reward': 'Reward'
  };
  
  return typeMap[type] || type;
}

// Format address (shorten with ellipsis)
export function formatAddress(address, startChars = 6, endChars = 4) {
  if (!address) return '—';
  if (address.length <= startChars + endChars) return address;
  
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
}

// Format transaction hash (shorten with ellipsis)
export function formatTxHash(hash, chars = 10) {
  if (!hash) return '—';
  if (hash.length <= chars * 2) return hash;
  
  return `${hash.slice(0, chars)}...${hash.slice(-chars)}`;
}

// Format APY with % symbol
export function formatAPY(apy) {
  if (apy === null || apy === undefined) return '—';
  return `${apy.toFixed(2)}%`;
}

// Format lock period
export function formatLockPeriod(days) {
  if (!days) return '—';
  
  if (days < 30) return `${days} days`;
  if (days === 30) return '1 month';
  if (days < 365) return `${Math.floor(days / 30)} months`;
  
  return `${Math.floor(days / 365)} year${days >= 730 ? 's' : ''}`;
}

// Format days remaining
export function formatDaysRemaining(days) {
  if (days === null || days === undefined) return '—';
  
  if (days === 0) return 'Matures today';
  if (days === 1) return '1 day remaining';
  if (days < 7) return `${days} days remaining`;
  
  const weeks = Math.floor(days / 7);
  if (weeks === 1) return '1 week remaining';
  if (weeks < 4) return `${weeks} weeks remaining`;
  
  const months = Math.floor(days / 30);
  return `${months} month${months > 1 ? 's' : ''} remaining`;
}
