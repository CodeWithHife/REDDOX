# REDDOX — Church Operations, Reimagined

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**REDDOX** is a modern, cloud-first Church Management and Administration Platform engineered for pastors, church administrators, ministry leads, and ushers. Designed with a warm luxury ivory and rich burgundy aesthetic, REDDOX replaces chaotic paper rosters and fragmented spreadsheets with a streamlined digital command center for attendance, giving, visitors, events, and congregation care.

---

## 🌟 Key Features

### 1. Executive Church Dashboard
- **Real-Time KPIs**: Track total congregation size, Sunday service attendance %, monthly tithes & offerings, and first-time guests at a glance.
- **Service Attendance Analytics**: Interactive visual bar charts comparing historical weekly services with instant hover percentages.
- **Live Stream & Activity Feed**: Real-time log of arriving worshippers, recorded contributions, and new visitors.

### 2. Multi-Channel Attendance & Service Headcount
- **Three Check-In Streams**:
  1. **Manual Roster**: Rapid roster check-in for ushers by department or family.
  2. **Digital QR Code Scanner**: Dynamic QR codes for mobile self-check-in and entrance tablet kiosks.
  3. **First-Timer Visitor Registry**: Welcoming and logging first-time guests with automatic ministry follow-up routing.
- **Usher Fast-Logger & Kiosk Mode**: Fullscreen kiosk display for auditorium entrances and quick dropdown scanner for ushers.
- **Service Categories**: Granular tracking across Sunday Celebration, Midweek Bible Study, Faith Clinic & Prayer, Youth Fellowship, Workers Meetings, and Vigils.
- **Consolidated Automated Reports**: Instant tri-channel breakdown (Manual vs. QR vs. Visitors) with downloadable reports.

### 3. Congregation & Member Directory
- Comprehensive member profiles including contact information, department assignments (Choir, Ushering, Media, Prayer, Children, etc.), and join dates.
- Real-time search, department filtering, and pagination.
- Complete data export capabilities (JSON / CSV).

### 4. Treasury, Tithes & Financial Management
- **Monthly Financial Ledger**: Track contributions categorized by month (`Nov 2026`, `Oct 2026`, `All-Time`).
- **Revenue & Expense Breakdown**: Detailed records of Tithes, Sunday Offerings, Building Funds, and Missions, paired with ministry expense vouchers.
- **Monthly Treasury Statement**: Dynamic calculations of monthly Giving vs. Expenses with automated Surplus / Deficit badges.
- **Digital Receipts**: Upload and preview transaction receipts and proof of payment slips.

### 5. Church Events & RSVP System
- Schedule services, conferences, retreats, and vigils with custom themes, preachers, venues, and timestamps.
- **Capacity & RSVP Tracking**: Monitor registered attendees with live progress meters.
- **Shareable Invites**: One-click formatting for WhatsApp and calendar invitations.

### 6. First-Timers & Pastoral Follow-Up Hub
- Systematic retention pipeline for new visitors (`New` → `Contacted` → `Follow-up due` → `Became member`).
- Pastoral notification center with category-coded alerts (giving receipts, visitor alerts, event reminders).
- One-click WhatsApp welcome generator for immediate pastoral connection.

### 7. Multi-Campus Branches & Staff Roles (RBAC)
- Support for multi-site campuses and satellite branches.
- Ministry-specific staff permission roles: *Administrator*, *Resident Pastor*, *Associate Pastor*, *Youth Pastor*, *Treasurer*, *Usher*, *Head Usher*, *Choir Director*, *Media Director*, and *Custom Roles*.

### 8. Luxury Aesthetics & Mobile-First Architecture
- Built on a bespoke warm ivory, rich burgundy (`#6d2a3c`), and brushed gold design system.
- Completely responsive across all devices — mobile drawer navigation, responsive table scrollbars, and bottom-sheet touch modals.
- 100% SVG vector iconography with zero unicode emojis for an executive enterprise feel.

### 9. 100% Unlocked & Unrestricted Access
- **Zero Paywalls**: All administrative capabilities—multi-branch management, treasury ledgers, digital QR attendance, and limitless member quotas—are completely unlocked for all churches.
- **Instant 3-Minute Setup**: Zero credit card requirements, instant church workspace generation, and immediate local hydration with zero friction.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **UI Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & Vanilla CSS Modules for glassmorphism and animations
- **State & Storage**: Client-side hydration with `localStorage` persistence and Context API

---

## 📂 Project Structure

```
REDDOX/
├── public/                     # Static assets, branding, and church emblems
├── src/
│   ├── app/
│   │   ├── components/         # Shared landing & UI components
│   │   │   ├── ChurchManagerLanding.tsx  # Interactive landing page & demo
│   │   │   ├── Navbar.tsx      # Public site navigation
│   │   │   └── AnimatedFAQ.tsx # Collapsible FAQ section
│   │   ├── portal/             # Church Administration Portal
│   │   │   ├── page.tsx        # Central portal workspace & views
│   │   │   ├── layout.tsx      # Portal shell layout
│   │   │   ├── portal-dashboard.css # Luxury design system & mobile styles
│   │   │   ├── admin/          # Admin-specific routes (Attendance, Broadcast, etc.)
│   │   │   └── checkin/        # Entrance kiosk check-in screens
│   │   ├── auth/               # Sign In & Registration flows
│   │   ├── onboarding/         # Church profile initialization wizard
│   │   ├── layout.tsx          # Root Next.js layout
│   │   ├── page.tsx            # Main landing page route
│   │   └── globals.css         # Global design tokens and reset
│   └── context/
│       └── AuthContext.tsx     # Authentication and session state
├── package.json                # Project dependencies and npm scripts
└── tsconfig.json               # TypeScript configuration
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18.18.0 or higher recommended) and `npm` installed.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/CodeWithHife/REDDOX.git
   cd REDDOX
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```

4. **Access the application**:
   Open [http://localhost:3000](http://localhost:3000) in your browser to view the landing page, or visit [http://localhost:3000/portal](http://localhost:3000/portal) to explore the church administration dashboard.

---

## 🔨 Production Build

To test and compile a production build:

```bash
npm run build
npm run start
```

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
