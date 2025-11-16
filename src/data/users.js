// Mock user data for Q Crypto platform
export const users = [
  {
    id: 1,
    name: 'John Doe',
    email: '[email protected]',
    status: 'Active',
    roles: [
      {
        type: 'Trader',
        companies: [1, 3], // Company IDs
        dailyLimit: 500000 // EUR
      },
      {
        type: 'Middle Office',
        companies: [1]
      }
    ]
  },
  {
    id: 2,
    name: 'Sarah Miller',
    email: '[email protected]',
    status: 'Active',
    roles: [
      {
        type: 'Admin',
        privileges: ['Add Users', 'Manage Profits', 'Manage Settlements', 'Manage Other Admins']
      }
    ]
  },
  {
    id: 3,
    name: 'Michael Chen',
    email: '[email protected]',
    status: 'Active',
    roles: [
      {
        type: 'Trader',
        companies: [2, 5],
        dailyLimit: 1000000 // EUR
      }
    ]
  },
  {
    id: 4,
    name: 'Emma Schmidt',
    email: '[email protected]',
    status: 'Active',
    roles: [
      {
        type: 'Middle Office',
        companies: [3, 5]
      }
    ]
  },
  {
    id: 5,
    name: 'David Park',
    email: '[email protected]',
    status: 'Inactive',
    roles: [
      {
        type: 'Trader',
        companies: [5],
        dailyLimit: 250000 // EUR
      }
    ]
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
