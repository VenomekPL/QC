// Mock staking data for Q Crypto platform
const now = Date.now();
const day = 24 * 60 * 60 * 1000;

// Available staking options (simplified for Phase 7)
export const availableStaking = [
  {
    currency: 'ETH',
    symbol: 'Ξ',
    apy: 3.5,
    lockPeriod: '72 hours',
    lockPeriodMs: 72 * 60 * 60 * 1000, // 72 hours in milliseconds
    description: 'Stake Ethereum for passive rewards'
  },
  {
    currency: 'AVAX',
    symbol: 'AVAX',
    apy: 9,
    lockPeriod: '2 weeks',
    lockPeriodMs: 14 * 24 * 60 * 60 * 1000, // 2 weeks in milliseconds
    description: 'Stake Avalanche for higher APY returns'
  }
];

// Current staking positions
export const stakingPositions = [];

// Generate 30-day earnings history (mock data)
export const generateEarningsHistory = (positions, prices) => {
  const history = [];
  const today = new Date();
  let cumulativeEarnings = 0;
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Calculate daily earnings from all positions
    let dailyEarnings = 0;
    positions.forEach(position => {
      const price = prices.find(p => p.currency === position.currency)?.currentPrice || 0;
      const yearlyEarnings = position.amountStaked * price * (position.apy / 100);
      dailyEarnings += yearlyEarnings / 365;
    });
    
    cumulativeEarnings += dailyEarnings;
    
    history.push({
      date: date.toISOString().split('T')[0],
      earnings: cumulativeEarnings
    });
  }
  
  return history;
};

export default {
  availableStaking,
  stakingPositions,
  generateEarningsHistory
};
