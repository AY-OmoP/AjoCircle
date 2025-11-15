# AjoCircle — Play-to-Earn Savings Simulator

A modern React-based web application for simulating and managing savings groups with interest accrual, weekly compounding, and gamified returns. Built with TypeScript, React, Tailwind CSS, and Vite.

## 🎯 Overview

AjoCircle is an interactive savings group simulator that demonstrates financial concepts like:
- **Principal & Interest Tracking**: Monitor each member's savings and accumulated interest
- **Weekly Compounding**: Optionally compound principal with earned interest
- **Tiered Savings**: Choose from 3 tiers (₦10,000, ₦20,000, ₦30,000)
- **Game Mechanics**: Simulate 20% returns and distribute profits proportionally
- **Member Management**: Add, simulate, and withdraw members seamlessly

Perfect for educational purposes, financial literacy demonstrations, and understanding how savings groups work.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ (required by the deployment workflow)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/AjoCircle.git
   cd AjoCircle
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

Output is generated in the `dist/` directory, optimized for GitHub Pages deployment.

### Preview Production Build

```bash
npm run preview
```

### Run Tests

```bash
npm test
```

---

## 📖 How to Use

### 1. **Register a Member**
   - Enter the member's name in the **"Name"** field
   - Select a savings tier:
     - **Tier 1**: ₦10,000 principal, 5% weekly interest
     - **Tier 2**: ₦20,000 principal, 10% weekly interest
     - **Tier 3**: ₦30,000 principal, 20% weekly interest
   - Click **"Add Member"** to register

### 2. **Simulate Weekly Interest**
   - Click **"Simulate 1 Week"** to apply weekly interest to all members
   - Each member earns interest based on their tier's weekly rate
   - Optional: Check **"Compound Principal?"** before simulating to add earned interest back to the principal for the next week

### 3. **Play the Game**
   - Click **"Play Game"** to simulate a 20% return on total principal
   - Returns are distributed proportionally based on each member's principal share
   - Example: If total principal is ₦100,000, a 20% return distributes ₦20,000 across members by their proportion

### 4. **Withdraw a Member**
   - Click the **"Withdraw"** button next to a member
   - The member is removed and receives their total withdrawable amount (principal + accumulated interest)
   - An alert shows the withdrawal amount

### 5. **View Dashboard**
   - **Members Table**: Lists all active members with their tiers, principals, interest earned, and weeks elapsed
   - **Totals Section**: Shows aggregate principal, accumulated interest, and total withdrawable amount

---

## 🏗️ Project Structure

```
AjoCircle/
├── src/
│   ├── App.tsx                 # Main React component (types, logic, UI)
│   ├── index.css               # Tailwind CSS directives
│   ├── main.tsx                # React DOM entry point
│   └── __tests__/              # Test suite
│       ├── registration.test.tsx
│       ├── week-simulation.test.tsx
│       └── withdrawal.test.tsx
├── index.html                  # HTML entry point
├── package.json                # Dependencies & scripts
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite bundler configuration
├── tailwind.config.cjs         # Tailwind CSS configuration
├── postcss.config.cjs          # PostCSS + Tailwind setup
└── .github/workflows/
    └── deploy.yml              # GitHub Actions CI/CD
```

---

## 🧮 Core Concepts

### Types (TypeScript)

```typescript
type TierKey = "tier1" | "tier2" | "tier3";

interface Tier {
  key: TierKey;
  name: string;
  amount: number;      // Principal in Naira
  weeklyRate: number;  // Decimal, e.g., 0.05 for 5%
}

interface Member {
  id: string;
  name: string;
  tier: TierKey;
  principal: number;
  accumulatedInterest: number;
  weeks: number;  // Elapsed weeks
}
```

### Tier Details

| Tier  | Principal | Weekly Rate | Weekly Earning |
|-------|-----------|-------------|----------------|
| Tier 1 | ₦10,000   | 5%          | ₦500           |
| Tier 2 | ₦20,000   | 10%         | ₦2,000         |
| Tier 3 | ₦30,000   | 20%         | ₦6,000         |

### Interest Calculation

**Simple Interest (No Compounding)**:
```
New Interest = Principal × Weekly Rate
Accumulated Interest += New Interest
```

**Compounded Interest**:
```
Principal += Accumulated Interest  // Reset principal
Accumulated Interest = 0            // Reset counter
```

### Game Returns Distribution

```
Total Return = Total Principal × 0.20
Member Share = (Member Principal / Total Principal) × Total Return
```

---

## 🧪 Testing

Tests are located in `src/__tests__/` and use **Vitest** with **React Testing Library**.

### Test Coverage

1. **registration.test.tsx**: Verify adding a member to the dashboard
2. **week-simulation.test.tsx**: Confirm weekly interest accrual
3. **withdrawal.test.tsx**: Ensure member removal and withdrawal logic

Run tests:
```bash
npm test
```

---

## 🌐 Deployment

### GitHub Pages

The project is configured for automatic deployment to GitHub Pages via GitHub Actions.

**Trigger**: Push to `main` branch  
**Workflow**: `.github/workflows/deploy.yml`  
**Output**: Published to `https://yourusername.github.io/AjoCircle/`

**Manual Deployment**:
1. Build: `npm run build`
2. Commit changes: `git add . && git commit -m "Your message"`
3. Push to main: `git push origin main`
4. GitHub Actions will automatically build and deploy

---

## 🛠️ Technology Stack

| Technology | Purpose |
|-----------|---------|
| **React 18** | UI framework |
| **TypeScript** | Type-safe JavaScript |
| **Tailwind CSS 4** | Utility-first styling |
| **Vite 5** | Fast bundler & dev server |
| **Vitest** | Unit testing framework |
| **React Testing Library** | Component testing utilities |
| **PostCSS** | CSS transformation pipeline |

---

## 📝 Key Features

✅ **Type-Safe**: Full TypeScript for robust development  
✅ **Responsive Design**: Works on desktop and mobile  
✅ **Real-Time Calculations**: Instant updates for interest and returns  
✅ **Interactive Dashboard**: View all members and aggregates at a glance  
✅ **Error Handling**: Validation for member names and max capacity (12 members)  
✅ **Currency Formatting**: Nigerian Naira (₦) formatting with thousands separator  
✅ **Automated Testing**: Comprehensive test suite for core features  
✅ **CI/CD**: One-click GitHub Pages deployment

---

## 🐛 Troubleshooting

### Port 5173 Already in Use
```bash
npm run dev -- --port 3000
```

### Build Fails
Ensure `@tailwindcss/postcss` is installed:
```bash
npm install @tailwindcss/postcss autoprefixer
```

### Tests Not Running
Clear test cache:
```bash
npm test -- --clearCache
```

---

## 📄 License

This project is open source. Feel free to use, modify, and distribute.

---

## 🤝 Contributing

Contributions are welcome! To get started:
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m "Add your feature"`
4. Push to branch: `git push origin feature/your-feature`
5. Open a pull request

---

## 💡 Ideas for Enhancement

- 🎨 Add chart visualizations (Chart.js / Recharts)
- 🔒 Implement user authentication (Firebase / Auth0)
- 💾 Add persistent storage (localStorage / Firestore)
- 📊 Export data to CSV or PDF
- 🌍 Multi-currency support
- 🎯 Goal-setting and milestone tracking
- 👥 Invite friends and track group progress

---

## 📧 Support

For issues, questions, or feedback, please open a GitHub issue or contact the maintainers.

---

**Happy Saving! 🎉**

Built with ❤️ for financial education and community empowerment.
