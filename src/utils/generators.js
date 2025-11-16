// Generator utilities for Q Crypto platform
import { getCurrentPrice } from '../data/prices';

// Generate crypto address based on currency
export function generateAddress(currency, index = 0) {
  const prefixes = {
    'BTC': ['bc1q', '3', '1'],
    'ETH': ['0x'],
    'AVAX': ['X-avax1']
  };
  
  const prefix = prefixes[currency]?.[0] || '0x';
  const randomHex = generateRandomHex(currency === 'BTC' ? 38 : 40);
  
  return `${prefix}${randomHex}`;
}

// Generate random hex string
function generateRandomHex(length) {
  const chars = '0123456789abcdef';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Generate QR code data for address
export function generateQRData(address, currency) {
  const protocols = {
    'BTC': 'bitcoin',
    'ETH': 'ethereum',
    'AVAX': 'avalanche'
  };
  
  const protocol = protocols[currency] || 'crypto';
  return `${protocol}:${address}`;
}

// Calculate EUR value for crypto amount
export function calculateEuroValue(amount, currency, customPrice = null) {
  const price = customPrice ?? getCurrentPrice(currency);
  return amount * price;
}

// Calculate crypto amount from EUR value
export function calculateCryptoAmount(euroValue, currency, customPrice = null) {
  const price = customPrice ?? getCurrentPrice(currency);
  if (price === 0) return 0;
  return euroValue / price;
}

// Generate transaction ID
export function generateTransactionId(prefix = 'tx') {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 5);
  return `${prefix}-${timestamp}${random}`;
}

// Generate transaction hash
export function generateTxHash(currency) {
  if (currency === 'BTC') {
    return generateRandomHex(64);
  } else if (currency === 'ETH') {
    return '0x' + generateRandomHex(64);
  } else if (currency === 'AVAX') {
    return 'avax_tx_' + generateRandomHex(48);
  }
  return generateRandomHex(64);
}

// Generate wallet ID
export function generateWalletId(currency, type = 'main') {
  return `${currency.toLowerCase()}-${type}-${Date.now().toString(36)}`;
}

// Generate staking position ID
export function generateStakingPositionId() {
  return `pos-${Date.now().toString(36)}-${Math.random().toString(36).substr(2, 5)}`;
}

// Calculate percentage change
export function calculatePercentageChange(oldValue, newValue) {
  if (oldValue === 0) return 0;
  return ((newValue - oldValue) / oldValue) * 100;
}

// Calculate profit/loss
export function calculateProfitLoss(buyPrice, sellPrice, amount) {
  return (sellPrice - buyPrice) * amount;
}

// Calculate profit/loss percentage
export function calculateProfitLossPercent(buyPrice, sellPrice) {
  if (buyPrice === 0) return 0;
  return calculatePercentageChange(buyPrice, sellPrice);
}

// Generate mock price with random fluctuation
export function generateMockPrice(basePrice, volatility = 0.01) {
  // volatility = 0.01 means +/- 1%
  const change = (Math.random() * 2 - 1) * volatility;
  return basePrice * (1 + change);
}

// Generate price history array
export function generatePriceHistory(basePrice, days, volatility = 0.01) {
  const history = [];
  let currentPrice = basePrice;
  const now = Date.now();
  const dayMs = 24 * 60 * 60 * 1000;
  
  for (let i = days; i >= 0; i--) {
    const changePercent = (Math.random() * 2 - 1) * volatility;
    currentPrice = currentPrice * (1 + changePercent);
    
    history.push({
      timestamp: now - (i * dayMs),
      price: parseFloat(currentPrice.toFixed(2)),
      date: new Date(now - (i * dayMs)).toISOString().split('T')[0]
    });
  }
  
  return history;
}

// Calculate staking rewards
export function calculateStakingRewards(amount, apy, days) {
  const annualRewards = amount * (apy / 100);
  const dailyRewards = annualRewards / 365;
  return dailyRewards * days;
}

// Calculate projected staking rewards
export function calculateProjectedStakingRewards(amount, apy, lockPeriod) {
  return calculateStakingRewards(amount, apy, lockPeriod);
}

// Calculate daily staking rewards
export function calculateDailyStakingRewards(amount, apy) {
  const annualRewards = amount * (apy / 100);
  return annualRewards / 365;
}

// Generate random amount within range
export function generateRandomAmount(min, max, decimals = 4) {
  const random = Math.random() * (max - min) + min;
  return parseFloat(random.toFixed(decimals));
}

// Generate timestamp within date range
export function generateRandomTimestamp(startDate, endDate) {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  return start + Math.random() * (end - start);
}

// Validate address format
export function validateAddress(address, currency) {
  const patterns = {
    'BTC': /^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,62}$/,
    'ETH': /^0x[a-fA-F0-9]{40}$/,
    'AVAX': /^X-avax1[a-z0-9]{39}$/
  };
  
  const pattern = patterns[currency];
  return pattern ? pattern.test(address) : false;
}

// Generate color for chart/graph
export function generateChartColor(index, total) {
  const hue = (index / total) * 360;
  return `hsl(${hue}, 70%, 60%)`;
}

// Generate gradient for charts
export function generateGradient(startColor, endColor) {
  return `linear-gradient(180deg, ${startColor} 0%, ${endColor} 100%)`;
}
