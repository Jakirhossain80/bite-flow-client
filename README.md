# BiteFlow 🍽️

A full-stack MERN restaurant application with a modern customer ordering experience and a secure admin panel for managing menus, categories, orders, and bookings. Built with React (Vite) on the frontend and Node.js/Express with MongoDB on the backend.

---

## ✨ Features

### Customer (Public)
- Browse restaurant menu and categories
- View menu item details
- Add items to cart and manage quantities
- Checkout flow
- Table booking
- View My Orders
- View My Bookings
- Responsive UI for mobile, tablet, and desktop

### Admin Panel (Protected)
- Admin authentication
- Dashboard overview
- Add / manage categories
- Add / manage menu items
- Manage customer orders
- Manage table bookings
- Secure API with HTTP-only cookies (JWT)

---

## 🧰 Tech Stack

**Frontend**
- React (Vite)
- React Router DOM
- Axios
- Tailwind CSS
- React Hot Toast
- Lucide Icons

**Backend**
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication (HTTP-only cookie)
- CORS configured for secure cross-origin requests
- Multer / Upload route support (if enabled)

---

## 📁 Project Structure

```bash
BiteFlow/
├── client/                 # Frontend (Vite + React)
│   ├── src/
│   ├── public/
│   ├── .env
│   └── package.json
└── server/                 # Backend (Express + MongoDB)
    ├── api/                # Vercel serverless entry (api/index.js)
    ├── config/
    ├── controllers/
    ├── cors/
    ├── middlewares/
    ├── models/
    ├── routes/
    ├── app.js
    ├── server.js
    ├── vercel.json
    ├── .env
    └── package.json


🚀 Live Links

Client: https://biteflow-client.vercel.app 

Server: https://biteflow-server.vercel.app

🔐 Authentication Notes

Uses JWT stored in HTTP-only cookie

Axios uses withCredentials: true for cookie-based authentication

CORS is configured to allow credentials and whitelisted origins

Admin session restore supported via /api/auth/is-admin-auth


👤 Author

Md. Jakir Hossain
GitHub: https://github.com/Jakirhossain80 
LinkedIn: https://www.linkedin.com/in/jakir-hossain-dev