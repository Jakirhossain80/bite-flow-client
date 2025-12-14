// App.jsx
import { useContext } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import MenuDetails from "./pages/MenuDetails";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import BookTable from "./pages/BookTable";
import MyBookings from "./pages/MyBookings";
import MyOrders from "./pages/MyOrders";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import AdminLayout from "./pages/admin/AdminLayout";
import AdminLogin from "./pages/admin/AdminLogin";
import AddCategory from "./pages/admin/AddCategory";
import AddMenu from "./pages/admin/AddMenu";
import Categories from "./pages/admin/Categories";
import Menus from "./pages/admin/Menus";
import Orders from "./pages/admin/Orders";
import Bookings from "./pages/admin/Bookings";
import Dashboard from "./pages/admin/Dashboard";

import { AppContext } from "./context/AppContext";

const App = () => {
  const location = useLocation();
  const adminPath = location.pathname.startsWith("/admin");
  const { admin, authChecking } = useContext(AppContext);

  // ✅ Prevent AdminLogin "flash" while checking session on refresh
  if (adminPath && authChecking) {
    return (
      <div>
        <Toaster />
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-gray-600 text-sm">Checking session...</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Toaster />
      {!adminPath && <Navbar />}

      <Routes>
        {/* Public User Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/menu-details/:id" element={<MenuDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/book-table" element={<BookTable />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={admin ? <AdminLayout /> : <AdminLogin />}
        >
          <Route index element={admin ? <Dashboard /> : <AdminLogin />} />
          <Route
            path="add-category"
            element={admin ? <AddCategory /> : <AdminLogin />}
          />
          <Route
            path="add-menu"
            element={admin ? <AddMenu /> : <AdminLogin />}
          />
          <Route
            path="categories"
            element={admin ? <Categories /> : <AdminLogin />}
          />
          <Route path="menus" element={admin ? <Menus /> : <AdminLogin />} />
          <Route path="orders" element={admin ? <Orders /> : <AdminLogin />} />
          <Route
            path="bookings"
            element={admin ? <Bookings /> : <AdminLogin />}
          />
        </Route>
      </Routes>

      {!adminPath && <Footer />}
    </div>
  );
};

export default App;
