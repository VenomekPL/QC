// Mock price data for Q Crypto platform
const now = Date.now();
const day = 24 * 60 * 60 * 1000;

// Generate 30-day price history with realistic fluctuations
function generatePriceHistory(basePrice, days = 30) {
  const history = [];
  let currentPrice = basePrice;
  
  for (let i = days; i >= 0; i--) {
    // Random daily change between -1% and +1%
    const changePercent = (Math.random() * 2 - 1) / 100;
    currentPrice = currentPrice * (1 + changePercent);
    
    history.push({
      timestamp: now - (i * day),
      price: parseFloat(currentPrice.toFixed(2)),
      date: new Date(now - (i * day)).toISOString().split('T')[0]
    });
  }
  
  return history;
}

export const prices = [
  {
    currency: 'BTC',
    name: 'Bitcoin',
    symbol: '₿',
    currentPrice: 45750.00,
    change24h: 2.35,
    change7d: 5.82,
    change30d: 12.45,
    priceHistory: generatePriceHistory(44500),
    lastUpdated: now
  },
  {
    currency: 'ETH',
    name: 'Ethereum',
    symbol: 'Ξ',
    currentPrice: 2500.00,
    change24h: 1.85,
    change7d: 4.23,
    change30d: 8.67,
    priceHistory: generatePriceHistory(2450),
    lastUpdated: now
  },
  {
    currency: 'AVAX',
    name: 'Avalanche',
    symbol: 'AVAX',
    currentPrice: 25.00,
    change24h: 3.12,
    change7d: 6.45,
    change30d: 15.23,
    priceHistory: generatePriceHistory(23.50),
    lastUpdated: now
  }
];

// Get price by currency
export function getPriceByCurrency(currency) {
  return prices.find(price => price.currency === currency);
}

// Get current price
export function getCurrentPrice(currency) {
  const priceData = getPriceByCurrency(currency);
  return priceData ? priceData.currentPrice : 0;
}

// Get price history
export function getPriceHistory(currency, days = 30) {
  const priceData = getPriceByCurrency(currency);
  if (!priceData) return [];
  
  return priceData.priceHistory.slice(-days);
}

// Get price change percentage
export function getPriceChange(currency, period = '24h') {
  const priceData = getPriceByCurrency(currency);
  if (!priceData) return 0;
  
  switch(period) {
    case '24h':
      return priceData.change24h;
    case '7d':
      return priceData.change7d;
    case '30d':
      return priceData.change30d;
    default:
      return priceData.change24h;
  }
}

// Calculate EUR value for a crypto amount
export function calculateEuroValue(amount, currency) {
  const price = getCurrentPrice(currency);
  return amount * price;
}

// Get all current prices
export function getAllPrices() {
  return prices.map(p => ({
    currency: p.currency,
    name: p.name,
    symbol: p.symbol,
    price: p.currentPrice,
    change24h: p.change24h
  }));
}

// Simulate price ticker (mock real-time updates)
export function getPriceTicker() {
  // In real app, this would connect to WebSocket
  // For mockup, return static data
  return prices.map(p => ({
    currency: p.currency,
    price: p.currentPrice,
    timestamp: now
  }));
}

// Get price at specific date
export function getPriceAtDate(currency, date) {
  const priceData = getPriceByCurrency(currency);
  if (!priceData) return 0;
  
  const targetDate = new Date(date).toISOString().split('T')[0];
  const historicalPrice = priceData.priceHistory.find(h => h.date === targetDate);
  
  return historicalPrice ? historicalPrice.price : priceData.currentPrice;
}
