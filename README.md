# 🛒 FreshCart — Grocery Selling Web Application

A premium, full-stack grocery selling web application where users can browse fresh grocery products, add items to cart, manage quantities, place orders, and track order history — all in a beautiful dark-themed modern UI.

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-4.x-000000?logo=express&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)

---

## 📋 Table of Contents

- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Project Architecture](#-project-architecture)
- [Getting Started](#-getting-started)
- [API Documentation](#-api-documentation)
- [Deployment](#-deployment)
- [Screenshots](#-screenshots)

---

## ✨ Features

- **Product Catalog** — Browse 50+ grocery products across 6 categories (Fruits, Vegetables, Dairy, Bakery, Beverages, Snacks)
- **Category Filtering** — Filter products by category with animated chip buttons
- **Real-time Search** — Debounced search with instant results across product names, descriptions, and categories
- **Shopping Cart** — Add/remove items, adjust quantities, view subtotals and running total
- **Smart Delivery** — Free delivery on orders over $35 with real-time progress tracking
- **Order Placement** — Checkout with customer details (name, phone, delivery address)
- **Order History** — View all past orders with status and details
- **Toast Notifications** — Animated feedback for all user actions
- **Responsive Design** — Fully responsive, mobile-friendly dark-themed UI
- **SPA Navigation** — Client-side page routing without full page reloads

---

## 🛠 Technology Stack

### Frontend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **HTML5** | 5 | Page structure and semantic markup |
| **CSS3** | 3 | Styling, animations, responsive design, glassmorphism effects |
| **Vanilla JavaScript (ES6+)** | ES2020 | Client-side logic, DOM manipulation, API calls, SPA routing |
| **Google Fonts (Inter)** | — | Modern typography |

### Backend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | 18+ | JavaScript runtime environment |
| **Express.js** | 4.18.2 | Web server framework for REST API |
| **CORS** | 2.8.5 | Cross-Origin Resource Sharing middleware |
| **UUID** | 9.0.0 | Unique identifier generation |

### Architecture Pattern

| Component | Description |
|-----------|-------------|
| **Architecture** | Monolithic Full-Stack (Single-server serving both API and static files) |
| **API Style** | RESTful API |
| **Data Storage** | In-memory JavaScript store (no database required) |
| **Frontend Pattern** | Single Page Application (SPA) with client-side routing |
| **Design Pattern** | Component-based UI rendering with template literals |

---

## 📁 Project Architecture

```
GroceryShop/
├── public/                    # Frontend (Static Files)
│   ├── index.html             # Main HTML entry point (SPA shell)
│   ├── css/
│   │   └── styles.css         # Complete CSS with design tokens, animations
│   └── js/
│       ├── api.js             # API client — fetch wrapper for backend calls
│       ├── components.js      # Reusable UI components (cards, chips, toasts)
│       ├── pages.js           # Page renderers (home, cart, checkout, orders)
│       └── app.js             # Main app controller (routing, state, events)
│
├── server/                    # Backend (Node.js/Express)
│   ├── index.js               # Express server entry point
│   ├── data/
│   │   └── products.js        # Product catalog data (50 items)
│   ├── routes/
│   │   ├── products.js        # GET /api/products, /api/products/:id
│   │   ├── cart.js            # CRUD /api/cart
│   │   └── orders.js         # POST/GET /api/orders
│   └── store/
│       └── index.js           # In-memory data store (products, cart, orders)
│
├── package.json               # Project metadata and dependencies
├── .gitignore                 # Git ignore rules
└── README.md                  # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/Ashraful-Alom1/GroceryShop.git

# Navigate to project directory
cd GroceryShop

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at **http://localhost:3000**

---

## 📡 API Documentation

### Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/products` | List all products (supports `?category=` and `?search=` query params) |
| `GET` | `/api/products/categories` | List all product categories with counts |
| `GET` | `/api/products/:id` | Get a single product by ID |

### Cart

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/cart` | Get current cart contents with totals |
| `POST` | `/api/cart` | Add item to cart (`{ productId, quantity }`) |
| `PUT` | `/api/cart/:productId` | Update item quantity (`{ quantity }`) |
| `DELETE` | `/api/cart/:productId` | Remove a specific item from cart |
| `DELETE` | `/api/cart` | Clear entire cart |

### Orders

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/orders` | Place a new order (`{ name, phone, address }`) |
| `GET` | `/api/orders` | List all past orders |
| `GET` | `/api/orders/:id` | Get a specific order by ID |

---

## ☁️ Deployment

### Deploy on Render (Recommended)

1. Push this repository to GitHub
2. Go to [render.com](https://render.com) → **New** → **Web Service**
3. Connect your GitHub repo
4. Settings:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment:** Node
5. Click **Deploy**

### Deploy on Vercel

1. Push this repository to GitHub
2. Go to [vercel.com](https://vercel.com) → **Add New Project**
3. Import your GitHub repo
4. The `vercel.json` configuration is already included in this project
5. Click **Deploy**

---

## 📸 Screenshots

> Screenshots of the application interface can be added here.

---

## 👨‍💻 Author

**Ashraful Alom**

---

## 📄 License

This project is developed as a final year academic project.
