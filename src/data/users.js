// Mock user data for Q Crypto platform
export const users = [
  {
    id: 1,
    name: 'John Trader',
    email: 'john.trader@example.com',
    role: 'Trader',
    companyAccess: ['Wallet', 'Transactions', 'Staking'],
    privileges: {
      dailyLimit: 50000, // EUR
      requiresApproval: false,
      canInitiateTransactions: true,
      canViewAllTransactions: false
    }
  },
  {
    id: 2,
    name: 'Sarah Middle',
    email: 'sarah.middle@example.com',
    role: 'Middle Office',
    companyAccess: ['Wallet', 'Transactions', 'Settlement', 'Staking'],
    privileges: {
      dailyLimit: 100000, // EUR
      requiresApproval: false,
      canInitiateTransactions: true,
      canViewAllTransactions: true,
      canApproveTransactions: true
    }
  },
  {
    id: 3,
    name: 'Mike Admin',
    email: 'mike.admin@example.com',
    role: 'Admin',
    companyAccess: ['Wallet', 'Transactions', 'Settlement', 'Staking', 'Admin Panel'],
    privileges: {
      dailyLimit: null, // Unlimited
      requiresApproval: false,
      canInitiateTransactions: true,
      canViewAllTransactions: true,
      canApproveTransactions: true,
      canManageUsers: true,
      canManagePermissions: true,
      canAccessAuditLogs: true
    }
  },
  {
    id: 4,
    name: 'Emily Analyst',
    email: 'emily.analyst@example.com',
    role: 'Trader',
    companyAccess: ['Wallet', 'Transactions', 'Staking'],
    privileges: {
      dailyLimit: 30000, // EUR
      requiresApproval: true,
      canInitiateTransactions: true,
      canViewAllTransactions: false
    }
  },
  {
    id: 5,
    name: 'David Senior',
    email: 'david.senior@example.com',
    role: 'Middle Office',
    companyAccess: ['Wallet', 'Transactions', 'Settlement', 'Staking'],
    privileges: {
      dailyLimit: 200000, // EUR
      requiresApproval: false,
      canInitiateTransactions: true,
      canViewAllTransactions: true,
      canApproveTransactions: true
    }
  }
];

// Get user by ID
export function getUserById(id) {
  return users.find(user => user.id === id);
}

// Get user by email
export function getUserByEmail(email) {
  return users.find(user => user.email === email);
}

// Get users by role
export function getUsersByRole(role) {
  return users.filter(user => user.role === role);
}

// Check if user has access to a feature
export function userHasAccess(userId, feature) {
  const user = getUserById(userId);
  return user && user.companyAccess.includes(feature);
}

// Get current logged-in user (mock - returns first trader by default)
export function getCurrentUser() {
  return users[0]; // John Trader
}
