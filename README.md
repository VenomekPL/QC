# Q Crypto Custodial Wallet

<div align="center">

**A professional B2B fintech platform mockup for institutional cryptocurrency custody**

[![React](https://img.shields.io/badge/React-18-61dafb?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.2.2-646cff?logo=vite)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-Demo-orange)](LICENSE)

[Features](#features) • [Demo](#demo) • [Setup](#setup-instructions) • [Documentation](#project-structure)

</div>

---

## 📋 Overview

**Q Crypto** is a high-fidelity, frontend-only mockup of an institutional custodial wallet platform. Designed for B2B fintech demonstrations, it showcases a complete user interface for:

- 💼 Multi-currency cryptocurrency wallets (BTC, ETH, AVAX, MATIC, DOT, Base, BNB, USDC, EURC)
- 📊 Real-time trading and transaction management
- ⚖️ Settlement tracking and balance monitoring
- 🔒 Cryptocurrency staking with APY tracking
- 👥 Administrative client and user management

Built as a **demonstration prototype**, this application uses mock data to simulate realistic institutional workflows without requiring backend infrastructure. Perfect for stakeholder presentations, UX research, and proof-of-concept demonstrations.

> **Note**: This is a mockup application with simulated data. All interactions succeed by design, and no real cryptocurrency transactions occur.

---

## ✨ Features

### 🏦 Wallet Dashboard
- **Multi-currency support** - Manage 9 different cryptocurrencies and stablecoins
- **Address generation** - Create unique deposit addresses for each currency
- **QR code integration** - Generate scannable QR codes for easy sharing
- **Clipboard utilities** - One-click copy for addresses and transaction IDs
- **Balance history** - 30-day interactive charts powered by Recharts
- **Quick actions** - Direct access to trade and stake from wallet view

### 💱 Trading & Transactions
- **Live price estimation** - Real-time coin amount calculation during trades
- **Smart validation** - Enforced trading limits ($100 min, $50,000 max)
- **Confirmation workflow** - 60-second countdown timer before trade execution
- **Transaction log** - Comprehensive history with multi-criteria filtering
- **Status tracking** - Real-time updates on Buy/Sell/Pending transactions
- **Date filtering** - Find specific transactions by date range

### ⚖️ Settlement Dashboard
- **Status overview** - Visual indicators for Pending/In Progress/Completed settlements
- **Balance breakdown** - Clear separation of available vs locked funds
- **Countdown timers** - Real-time tracking of settlement completion
- **Client segmentation** - Per-client settlement history and status
- **Interactive tooltips** - Hover details for quick information access
- **Credit utilization** - Visual progress bars for credit usage

### 🔐 Staking Platform
- **ETH staking** - Earn passive rewards with displayed APY rates (5.2%)
- **Position management** - Track all active staking positions
- **Lock period tracking** - Countdown timers for unlock dates
- **Rewards calculation** - Real-time earnings display
- **Unstaking flow** - Graceful withdrawal with confirmation modals
- **Earnings history** - 30-day cumulative earnings charts

### 👥 Admin Panel
- **Client portfolio management** - Overview of all client accounts
- **User provisioning** - Add new clients with role assignment
- **Role management** - Edit user permissions (Trader/Middle Office/Admin)
- **Search & filter** - Quick client lookup capabilities
- **Activity monitoring** - Track user actions and portfolio changes
- **Access control** - Role-based view demonstration

---

## 🎬 Demo

### Live Preview
> **Deployment Status**: ![Azure Static Web Apps CI/CD](https://github.com/VenomekPL/QC/workflows/Azure%20Static%20Web%20Apps%20CI%2FCD/badge.svg)
> 
> *Live URL will be available after Azure deployment - see [DEPLOYMENT.md](DEPLOYMENT.md)*

### Quick Start (Local)
```bash
npm install && npm run dev
# Open http://localhost:5173
# Login with any credentials (demo mode)
```

### Screenshots
> *Add screenshots here showcasing key features*

---

## 🛠️ Technology Stack

| Category | Technology | Purpose |
|----------|-----------|---------|
| **Framework** | React 18 | Modern UI with hooks and functional components |
| **Build Tool** | Vite 7.2.2 | Lightning-fast HMR and optimized production builds |
| **Routing** | React Router DOM | Hash-based routing for static deployment |
| **Charts** | Recharts | Interactive balance and earnings visualizations |
| **QR Codes** | qrcode.react | Wallet address QR code generation |
| **Styling** | CSS Custom Properties | DRY design system with CSS variables |
| **State** | React Hooks | Local component state management |
| **Data** | Mock JSON | Hardcoded realistic data in `src/data/` |

### Architecture Principles
- ✅ **Frontend-Only** - No backend, API calls, or servers required
- ✅ **Static Deployment** - Builds to plain HTML/CSS/JS files
- ✅ **Mock Data First** - All data embedded for realistic demonstrations
- ✅ **Component-Driven** - 11 reusable UI components
- ✅ **Responsive Design** - Mobile-first with 320px/768px/1024px breakpoints
- ✅ **Accessible** - Semantic HTML, ARIA labels, keyboard navigation

---

## 🚀 Setup Instructions

### Prerequisites
- **Node.js** 16.x or higher
- **npm** 7.x or higher

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/VenomekPL/QC.git
   cd q-crypto-mockup
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173/`

4. **Build for production**
   ```bash
   npm run build
   ```
   Static files will be output to `dist/` directory

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite development server with HMR |
| `npm run build` | Build optimized production bundle |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint code quality checks |

### Deployment

This project includes automated CI/CD with GitHub Actions for Azure Static Web Apps.

**For deployment instructions**, see [DEPLOYMENT.md](DEPLOYMENT.md)

**Quick Deploy**:
- Every push to `main` branch automatically deploys to Azure
- Build and deployment takes 2-3 minutes
- Azure provides free hosting with global CDN

---

## 📖 Usage Guide

### Getting Started

1. **Login** - Navigate to the root URL and enter any credentials
   - Demo mode: All logins succeed automatically
   - No validation or authentication required

2. **Wallet Dashboard** - View balances and manage addresses
   - Click currency cards to expand details
   - Generate new deposit addresses with QR codes
   - Copy addresses to clipboard
   - View 30-day balance history chart

3. **Trading** - Execute buy/sell transactions
   - Navigate to Transactions page
   - Enter EUR amount for Buy or coin amount for Sell
   - Confirm within 60-second countdown
   - View transaction history with filters

4. **Settlements** - Monitor institutional settlements
   - Check pending/in-progress settlements
   - View available vs locked balances
   - Track settlement countdown timers
   - Hover for detailed tooltip information

5. **Staking** - Earn passive rewards
   - Navigate to Staking page
   - Enter ETH amount to stake
   - View active positions with APY and rewards
   - Track lock period countdowns
   - Unstake when lock period expires

6. **Admin Panel** - Manage clients (Admin role only)
   - Add new clients with role assignment
   - Edit existing client information
   - Search and filter client lists
   - View client portfolio summaries

7. **Logout** - Click logout button in header to return to login

### Demo Data
All data is pre-populated with realistic mock values:
- 5 user accounts with different roles
- 30 days of transaction history
- Active staking positions
- Settlement records
- Price history for all currencies

---

## 📁 Project Structure

```
q-crypto-mockup/
├── src/
│   ├── components/              # Reusable UI components
│   │   ├── Button.jsx          # Primary/secondary/danger button variants
│   │   ├── Card.jsx            # Container component with elevation
│   │   ├── Dropdown.jsx        # Filterable select dropdown
│   │   ├── Graph.jsx           # Recharts wrapper for line charts
│   │   ├── Input.jsx           # Labeled text/number/password input
│   │   ├── Layout.jsx          # App shell with header, nav, logout
│   │   ├── Modal.jsx           # Overlay dialog with backdrop
│   │   ├── Notification.jsx    # Toast notifications (success/error/warning)
│   │   ├── QRCode.jsx          # QR code generator with expand/collapse
│   │   ├── Table.jsx           # Data table with sorting
│   │   └── Tabs.jsx            # Tab navigation component
│   │
│   ├── data/                    # Mock data modules
│   │   ├── clients.js          # Client accounts (Admin panel)
│   │   ├── prices.js           # Cryptocurrency prices & history
│   │   ├── settlement.js       # Settlement records & status
│   │   ├── staking.js          # Staking positions & options
│   │   ├── transactions.js     # Buy/Sell transaction history
│   │   ├── users.js            # User accounts & roles
│   │   └── wallets.js          # Wallet balances & addresses
│   │
│   ├── pages/                   # Page-level components
│   │   ├── AdminPage.jsx       # Client management interface
│   │   ├── LoginPage.jsx       # Authentication entry point
│   │   ├── SettlementPage.jsx  # Settlement dashboard
│   │   ├── StakingPage.jsx     # Staking positions & new stakes
│   │   ├── TransactionsPage.jsx# Trading & transaction log
│   │   └── WalletPage.jsx      # Multi-currency wallet view
│   │
│   ├── styles/                  # CSS stylesheets
│   │   ├── variables.css       # Design tokens (colors, spacing, fonts)
│   │   ├── reset.css           # CSS reset/normalize
│   │   ├── global.css          # Base HTML element styles
│   │   ├── components.css      # Component-specific styles
│   │   └── pages.css           # Page-specific layouts
│   │
│   ├── utils/                   # Utility functions
│   │   ├── formatters.js       # Currency/crypto/date formatters
│   │   └── generators.js       # Address/QR/value generators
│   │
│   ├── App.jsx                  # Root component with routes
│   └── main.jsx                 # Application entry point
│
├── public/                      # Static assets
│   └── assets/                  # Images, logos, icons
│
├── dist/                        # Production build output (generated)
├── index.html                   # HTML entry point
├── vite.config.js              # Vite configuration
├── package.json                # Dependencies & scripts
└── README.md                   # This file
```

---

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#1E40AF) - Actions, CTAs, active states
- **Accent**: Green (#10B981) - Success, positive actions
- **Background**: Dark slate (#0F172A, #1E293B) - Professional B2B aesthetic
- **Text**: Light slate (#F1F5F9, #94A3B8) - High contrast readability
- **Status**: Green (success), Red (error), Amber (warning)

### Typography
- **Font Family**: System font stack for native feel
- **Sizes**: 12px - 30px scale with CSS custom properties
- **Weights**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

### Spacing
- **Scale**: 4px base unit (0.25rem - 3rem)
- **Variables**: `--spacing-xs` through `--spacing-2xl`

### Components
All components use CSS custom properties for consistency:
```css
var(--color-primary)
var(--spacing-lg)
var(--font-size-xl)
var(--border-radius-md)
```

---

## 📜 Constitution Compliance

This project follows the [QCrypto2 Mockup Platform Constitution](../.specify/memory/constitution.md):

| Principle | Implementation | Status |
|-----------|----------------|--------|
| **Frontend-Only** | No backend calls, APIs, or servers | ✅ Verified |
| **Mock Data First** | All data in `src/data/` directory | ✅ Verified |
| **Template-Driven** | 11 reusable components | ✅ Verified |
| **DRY Styling** | CSS variables, zero duplication | ✅ Verified |
| **Responsive Design** | Mobile-first, 3 breakpoints | ✅ Verified |
| **Always-Successful** | No validation, all actions succeed | ✅ Verified |
| **Static Navigation** | HashRouter for static deployment | ✅ Verified |

---

## 🧪 Testing & Validation

### Manual Testing Checklist
- [x] Login with any credentials
- [x] Navigate all menu items
- [x] Generate wallet addresses
- [x] Copy to clipboard functionality
- [x] QR code expand/collapse
- [x] Execute buy/sell trades
- [x] Filter transaction history
- [x] View settlement details
- [x] Stake ETH with confirmation
- [x] Add/edit clients (Admin)
- [x] Logout returns to login
- [x] Mobile responsive (320px+)
- [x] Tablet layout (768px+)
- [x] Desktop layout (1024px+)

### Accessibility
- [x] Semantic HTML (`<header>`, `<nav>`, `<main>`)
- [x] ARIA labels on icon buttons
- [x] Alt text on images
- [x] Keyboard navigation (Tab, Enter, Escape)
- [x] Color contrast WCAG AA compliant
- [x] Focus indicators visible

### Browser Compatibility
- ✅ Chrome 100+
- ✅ Firefox 100+
- ✅ Safari 15+
- ✅ Edge 100+

---

## 🤝 Contributing

This is a demonstration mockup project. Contributions are welcome for:
- Bug fixes
- UI/UX improvements
- Additional mock data scenarios
- Documentation enhancements
- Accessibility improvements

Please ensure all contributions maintain constitution compliance.

---

## 📄 License

This project is a demonstration mockup for educational and prototyping purposes.

**Not for production use** - No real cryptocurrency transactions occur.

---

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/) and [Vite](https://vitejs.dev/)
- Charts powered by [Recharts](https://recharts.org/)
- QR codes via [qrcode.react](https://github.com/zpao/qrcode.react)
- Icons and UI inspired by modern fintech platforms

---

## 📞 Support

For questions, issues, or demo requests:
- **Repository**: [github.com/VenomekPL/QC](https://github.com/VenomekPL/QC)
- **Issues**: [Report a bug](https://github.com/VenomekPL/QC/issues)

---

<div align="center">

**Q Crypto Custodial Wallet** | Built with ❤️ for institutional fintech demonstrations

*Demo Mode - Not for Production Use*

</div>
