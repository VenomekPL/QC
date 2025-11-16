// Mock staking data for Q Crypto platform
const now = Date.now();
const day = 24 * 60 * 60 * 1000;

// Available staking options
export const stakingOptions = [
  {
    id: 'stake-eth-30',
    currency: 'ETH',
    name: 'Ethereum Staking 30-Day',
    apy: 4.5,
    lockPeriod: 30,
    minAmount: 0.1,
    maxAmount: null,
    description: 'Flexible 30-day staking with competitive returns',
    riskLevel: 'Low'
  },
  {
    id: 'stake-eth-90',
    currency: 'ETH',
    name: 'Ethereum Staking 90-Day',
    apy: 5.8,
    lockPeriod: 90,
    minAmount: 1.0,
    maxAmount: null,
    description: 'Higher returns with 90-day commitment',
    riskLevel: 'Low'
  },
  {
    id: 'stake-avax-30',
    currency: 'AVAX',
    name: 'Avalanche Staking 30-Day',
    apy: 8.2,
    lockPeriod: 30,
    minAmount: 25,
    maxAmount: null,
    description: 'Competitive AVAX staking rewards',
    riskLevel: 'Medium'
  },
  {
    id: 'stake-avax-180',
    currency: 'AVAX',
    name: 'Avalanche Staking 180-Day',
    apy: 11.5,
    lockPeriod: 180,
    minAmount: 100,
    maxAmount: null,
    description: 'Premium rewards for long-term commitment',
    riskLevel: 'Medium'
  }
];

// Current staking positions
export const stakingPositions = [
  {
    id: 'pos-001',
    optionId: 'stake-eth-90',
    currency: 'ETH',
    amount: 39.5,
    euroValue: 98750.00,
    apy: 5.8,
    startDate: now - (60 * day),
    endDate: now + (30 * day),
    lockPeriod: 90,
    daysRemaining: 30,
    status: 'active',
    accruedRewards: 0.52,
    accruedRewardsEuro: 1300.00,
    projectedRewards: 1.68,
    projectedRewardsEuro: 4200.00,
    autoRenew: true
  },
  {
    id: 'pos-002',
    optionId: 'stake-avax-180',
    currency: 'AVAX',
    amount: 1800,
    euroValue: 45000.00,
    apy: 11.5,
    startDate: now - (120 * day),
    endDate: now + (60 * day),
    lockPeriod: 180,
    daysRemaining: 60,
    status: 'active',
    accruedRewards: 138.0,
    accruedRewardsEuro: 3450.00,
    projectedRewards: 207.0,
    projectedRewardsEuro: 5175.00,
    autoRenew: false
  },
  {
    id: 'pos-003',
    optionId: 'stake-eth-30',
    currency: 'ETH',
    amount: 10.0,
    euroValue: 25000.00,
    apy: 4.5,
    startDate: now - (28 * day),
    endDate: now + (2 * day),
    lockPeriod: 30,
    daysRemaining: 2,
    status: 'maturing',
    accruedRewards: 0.035,
    accruedRewardsEuro: 87.50,
    projectedRewards: 0.037,
    projectedRewardsEuro: 92.50,
    autoRenew: true
  },
  {
    id: 'pos-004',
    optionId: 'stake-avax-30',
    currency: 'AVAX',
    amount: 500,
    euroValue: 12500.00,
    apy: 8.2,
    startDate: now - (45 * day),
    endDate: now - (15 * day),
    lockPeriod: 30,
    daysRemaining: 0,
    status: 'completed',
    accruedRewards: 3.36,
    accruedRewardsEuro: 84.00,
    projectedRewards: 3.36,
    projectedRewardsEuro: 84.00,
    autoRenew: false,
    claimedDate: now - (15 * day)
  }
];

// Get staking option by ID
export function getStakingOption(optionId) {
  return stakingOptions.find(opt => opt.id === optionId);
}

// Get staking options by currency
export function getStakingOptionsByCurrency(currency) {
  return stakingOptions.filter(opt => opt.currency === currency);
}

// Get active staking positions
export function getActiveStakingPositions() {
  return stakingPositions.filter(pos => pos.status === 'active' || pos.status === 'maturing');
}

// Get staking positions by currency
export function getStakingPositionsByCurrency(currency) {
  return stakingPositions.filter(pos => pos.currency === currency);
}

// Get staking position by ID
export function getStakingPositionById(positionId) {
  return stakingPositions.find(pos => pos.id === positionId);
}

// Calculate total staked value
export function getTotalStakedValue() {
  return getActiveStakingPositions()
    .reduce((total, pos) => total + pos.euroValue, 0);
}

// Calculate total accrued rewards
export function getTotalAccruedRewards() {
  return getActiveStakingPositions()
    .reduce((total, pos) => total + pos.accruedRewardsEuro, 0);
}

// Calculate total projected rewards
export function getTotalProjectedRewards() {
  return getActiveStakingPositions()
    .reduce((total, pos) => total + pos.projectedRewardsEuro, 0);
}

// Get staking summary
export function getStakingSummary() {
  const activePositions = getActiveStakingPositions();
  const completedPositions = stakingPositions.filter(pos => pos.status === 'completed');
  
  return {
    totalStaked: getTotalStakedValue(),
    totalAccruedRewards: getTotalAccruedRewards(),
    totalProjectedRewards: getTotalProjectedRewards(),
    activePositionsCount: activePositions.length,
    completedPositionsCount: completedPositions.length,
    positions: activePositions
  };
}

// Calculate daily rewards for a position
export function calculateDailyRewards(amount, apy, currency) {
  const annualRewards = amount * (apy / 100);
  const dailyRewards = annualRewards / 365;
  return dailyRewards;
}

// Estimate rewards for new stake
export function estimateStakingRewards(amount, optionId) {
  const option = getStakingOption(optionId);
  if (!option) return null;
  
  const annualRewards = amount * (option.apy / 100);
  const periodRewards = (annualRewards / 365) * option.lockPeriod;
  
  return {
    amount,
    currency: option.currency,
    apy: option.apy,
    lockPeriod: option.lockPeriod,
    projectedRewards: periodRewards,
    dailyRewards: annualRewards / 365
  };
}
