# EasyBuy Frontend

Modern e-commerce frontend built with React, TypeScript, Vite, and Tailwind CSS.

## Features

- Responsive design with Tailwind CSS
- User authentication with Firebase
- Product browsing and search
- Shopping cart with Redux state management
- Razorpay payment integration
- Admin dashboard for product and order management
- Real-time order tracking

## Tech Stack

- **Framework:** React 18
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS, SCSS
- **State Management:** Redux Toolkit
- **Routing:** React Router DOM
- **API:** RTK Query
- **Payment:** Razorpay
- **Authentication:** Firebase
- **UI Components:** React Icons, React Hot Toast, Swiper

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SERVER=http://localhost:4000
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET_ID=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_TEMPLATE_ID=your_emailjs_template_id
VITE_SERVICE_ID=your_emailjs_service_id
```

## Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Project Structure

```
src/
├── assets/          # Static assets
├── components/      # Reusable components
├── pages/           # Page components
├── redux/           # Redux store and slices
│   ├── api/         # RTK Query APIs
│   └── reducer/     # Redux reducers
├── styles/          # Global styles
├── types/           # TypeScript types
└── utils/           # Utility functions
```

## Pages

- **Home** - Landing page with featured products
- **Search** - Product search and filtering
- **Product Details** - Individual product view
- **Cart** - Shopping cart
- **Checkout** - Order placement
- **Orders** - Order history
- **Admin Dashboard** - Product and order management

## Author

codingraft
