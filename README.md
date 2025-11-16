# Q Crypto Custodial Wallet Mockup

A B2B fintech platform mockup demonstrating a custodial cryptocurrency wallet with trading, settlement, staking, and administration capabilities.

## Project Overview

Q Crypto is a frontend-only mockup of a custodial wallet platform designed for institutional clients. This demonstration showcases a complete user interface for managing cryptocurrency wallets, executing trades, monitoring settlements, staking assets, and administering client accounts. Built as a high-fidelity prototype, it uses mock data to simulate realistic workflows without backend dependencies.

## Features

### 1. Wallet Dashboard
- Multi-currency wallet support (BTC, ETH, AVAX, MATIC, DOT, Base, BNB, USDC, EURC)
- Generate and manage deposit addresses per currency
- QR code generation for easy address sharing
- Copy-to-clipboard functionality for addresses
- Real-time balance display with 30-day balance history chart
- Quick access to trading and staking from wallet view

### 2. Trading & Transactions
- Buy and sell cryptocurrency with live coin amount estimation
- Trading limits validation (min $100, max $50,000)
- Confirmation modal with 60-second countdown timer
- Transaction history log with filtering by type (Buy/Sell/All)
- Date-based filtering for transaction review
- Detailed transaction cards with timestamp, amount, and status

### 3. Settlement Dashboard
- Real-time settlement status overview (Pending/In Progress/Completed)
- Available vs locked balance breakdown
- Settlement countdown timers
- Client-specific settlement history
- Tooltip details on hover for quick information access

### 4. Staking Platform
- Stake ETH with APY rate display (5.2% APY)
- Active staking positions management
- Lock period tracking with countdown timers
- Rewards calculation and display
- Unstaking capability with confirmation flow

### 5. Admin Panel
- Client portfolio management
- Add new clients with role assignment (Trader/Middle Office)
- Edit existing user information and roles
- Client list with search and filter capabilities
- User activity monitoring
- Role-based access control demonstration

## Technology Stack

- **React 18** - Modern UI framework with hooks
- **Vite 7.2.2** - Lightning-fast build tool and dev server
- **React Router DOM** - Hash-based routing for static navigation
- **Recharts** - Data visualization for balance history charts
- **qrcode.react** - QR code generation for wallet addresses
- **CSS Custom Properties** - DRY styling with design tokens
- **Mock Data Architecture** - All data hardcoded in `src/data/` directory

## Setup Instructions

### Prerequisites
- Node.js 16+ and npm installed

### Installation

1. Clone the repository:
```bash
git clone https://github.com/VenomekPL/QC.git
cd q-crypto-mockup
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173/`

### Build for Production

```bash
npm run build
```

The production-ready static files will be output to the `dist/` directory.

## Usage

1. **Login**: Navigate to `http://localhost:5173/` and enter any credentials (demo mode - all logins succeed)
2. **Explore Wallet**: View your multi-currency wallet, generate deposit addresses, and check balance history
3. **Execute Trades**: Click "Buy" or "Sell" from the Transactions page, enter amounts, and confirm trades
4. **Monitor Settlements**: View pending settlements, check locked balances, and review settlement history
5. **Stake Assets**: Navigate to Staking, stake ETH, and monitor your staking positions with rewards
6. **Manage Clients**: Access the Admin panel to add new clients, edit user roles, and view portfolios
7. **Logout**: Click the logout button in the header to end your session and return to login

## Constitution Compliance

This project adheres to the [QCrypto2 Mockup Platform Constitution](../.specify/memory/constitution.md) with the following principles:

- ✅ **Frontend-Only Architecture**: No backend services, runs entirely client-side
- ✅ **Mock Data First**: All data embedded in `src/data/` directory
- ✅ **Template-Driven Design**: Reusable components in `src/components/`
- ✅ **DRY Styling**: CSS custom properties in `src/styles/variables.css`, zero duplicate styles
- ✅ **Responsive Design**: Mobile-first design with breakpoints at 320px, 768px, 1024px+
- ✅ **Always-Successful Interactions**: Login and forms always succeed (no real validation)
- ✅ **Static Navigation**: Hash-based routing via React Router HashRouter

## Project Structure

```
q-crypto-mockup/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Input.jsx
│   │   ├── Layout.jsx
│   │   └── ...
│   ├── data/              # Mock data modules
│   │   ├── mockUsers.js
│   │   ├── mockTransactions.js
│   │   ├── mockSettlements.js
│   │   └── mockStaking.js
│   ├── pages/             # Page components
│   │   ├── WalletPage.jsx
│   │   ├── TransactionsPage.jsx
│   │   ├── SettlementPage.jsx
│   │   ├── StakingPage.jsx
│   │   ├── AdminPage.jsx
│   │   └── LoginPage.jsx
│   ├── styles/            # CSS stylesheets
│   │   ├── variables.css  # Design tokens (colors, spacing, fonts)
│   │   ├── components.css # Component-specific styles
│   │   └── pages.css      # Page-specific styles
│   ├── App.jsx            # Main application component
│   └── main.jsx           # Application entry point
├── public/                # Static assets
└── index.html             # HTML entry point
```

## License

This is a demonstration mockup for educational and prototyping purposes.

---

**Built with ❤️ for Q Crypto** | **Demo Mode - Not for Production Use**
