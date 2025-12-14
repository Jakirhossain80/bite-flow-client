// AppContext.jsx
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export const AppContext = createContext();

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
axios.defaults.withCredentials = true;

const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);

  // ✅ NEW: prevents "AdminLogin flash" on refresh
  const [authChecking, setAuthChecking] = useState(true);

  const [categories, setCategories] = useState([]);
  const [menus, setMenus] = useState([]);

  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const fetchCartData = async () => {
    try {
      const { data } = await axios.get("/api/cart/get");
      if (data.success) setCart(data.cart);
      else setCart([]);
    } catch (error) {
      console.log("Error fetching cart:", error);
      setCart([]);
    }
  };

  useEffect(() => {
    if (cart?.items && Array.isArray(cart.items)) {
      const total = cart.items.reduce(
        (sum, item) => sum + item.menuItem.price * item.quantity,
        0
      );
      setTotalPrice(total);
    } else {
      setTotalPrice(0);
    }
  }, [cart]);

  const cartCount =
    (cart?.items &&
      cart.items.reduce((acc, item) => acc + item.quantity, 0)) ||
    0;

  const addToCart = async (menuId) => {
    if (!user) {
      toast.error("Please login to add items to your cart");
      navigate("/login");
      return;
    }

    try {
      const { data } = await axios.post("/api/cart/add", {
        menuId,
        quantity: 1,
      });

      if (data.success) {
        toast.success(data.message);
        fetchCartData();
      } else {
        toast.error(data.message || "Failed to add to cart");
      }
    } catch (error) {
      console.error("Add to cart error:", error);

      if (error?.response?.status === 401) {
        setUser(null);
        toast.error(
          error?.response?.data?.message ||
            "Your session has expired. Please login again."
        );
        navigate("/login");
      } else {
        toast.error(
          error?.response?.data?.message ||
            "Something went wrong while adding to cart!"
        );
      }
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get("/api/category/all");
      if (data.success) setCategories(data.categories);
      else console.log("Failed to fetch categories");
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
  };

  const fetchMenus = async () => {
    try {
      const { data } = await axios.get("/api/menu/all");
      if (data.success) setMenus(data.menuItems);
      else console.log("Failed to fetch menus");
    } catch (error) {
      console.log("Error fetching menus:", error);
    }
  };

  const isAuth = async () => {
    try {
      const { data } = await axios.get("/api/auth/is-auth");
      if (data.success) setUser(data.user);
      else setUser(null);
    } catch (error) {
      console.log("Auth check error:", error);
      setUser(null);
    }
  };

  // ✅ Admin auth restore
  const isAdminAuth = async () => {
    try {
      const { data } = await axios.get("/api/auth/is-admin-auth");
      if (data.success) setAdmin(data.admin);
      else setAdmin(null);
    } catch (error) {
      setAdmin(null);
    }
  };

  // ✅ Run auth checks first; then unlock rendering
  useEffect(() => {
    const init = async () => {
      setAuthChecking(true);
      await Promise.all([isAuth(), isAdminAuth()]);
      setAuthChecking(false);

      // Keep your existing initial loads
      fetchCategories();
      fetchMenus();
    };

    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user) fetchCartData();
    else setCart([]);
  }, [user]);

  const value = {
    navigate,
    loading,
    setLoading,

    user,
    setUser,

    admin,
    setAdmin,

    // ✅ expose this
    authChecking,

    axios,

    categories,
    fetchCategories,

    menus,
    fetchMenus,

    addToCart,
    cartCount,

    cart,
    totalPrice,
    fetchCartData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
