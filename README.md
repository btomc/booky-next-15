# Booky Ecommerce

<!-- <img src="/public/images/screen.png" alt="Next.js Ecommerce" style='' /> -->

![Booky](/public/images/screen-2.png)

A full featured Ecommerce website built with Next.js, TypeScript, NextAuth, PostgreSQL and Prisma.

## Key Features

- 🛒 Cart functionality
- 👤 User profile & orders management
- 📋 Order history
- 🚩 Featured products with banners
- 🛍️ Product suggestions
- 💬 Product review system
- 🔄 Interactive checkout process
- 💳 Stripe API integration
- 💸 PayPal integration
- 🔎 Search functionality (customer & admin)
- 🗂️ Sorting, filtering & pagination
- 🛡️ Admin panel with stats & chart using Recharts
- 🔧 Admin - order, product and user management
- ✅ Zod for schema validation and form handling
- 🎯 React Hook Form for efficient form management
- 📱 Responsive design across devices
- 🚀 Production-ready deployment
- 🔔 Toast notifications for submission status, updates, and error handling
- 🕵️‍♂️ SEO-friendly product pages
- 🔐 Authentication system with NextAuth
- 🗄️ PostgreSQL with Prisma
- 📜 TypeScript for static typing and enhanced development experience
- 🚀 Next.js 15 & React 19
- 💅 TailwindCSS & ShadcnUI styling

## Getting Started

### Installation

#### Using npm

```bash
# Install dependencies
npm install
# If you get errors try
npm install --legacy-peer-deps

# Copy environment variables
cp .env.example .env
```

### Environment Variables

Update the `.env` file with your configuration:

```env
# Database
DATABASE_URL=your_postgres_url

# Global
NEXT_PUBLIC_APP_NAME=your_app_name
NEXT_PUBLIC_APP_DESCRIPTION=your_app_description
NEXT_PUBLIC_APP_URL=http://localhost:3000

# NextAuth (Authentication)
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_URL_INTERNAL=http://localhost:3000

# Uploadthing (Image Upload)
UPLOADTHING_TOKEN=your_uploadthing_token
UPLOADTHING_SECRET=your_uploadthing_secret
UPLOADTHING_APP_ID=your_uploadthing_app_id

# Payment Methods
PAYMENT_METHODS=your_payments_methods  #e.g."PayPal, Stripe, CashOnDelivery"
DEFAULT_PAYMENT_METHOD="PayPal"

# PayPal
PAYPAL_API_URL=your_paypal_url
PAYPAL_PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_APP_SECRET=your_paypal_app_secret

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

### Development

```bash
# Using npm
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

- `dev` - Start development server
- `build` - Build for production
- `start` - Start production server
- `lint` - Run ESLint
