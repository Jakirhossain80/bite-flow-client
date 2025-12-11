// Cart.jsx
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { X } from "lucide-react";
import toast from "react-hot-toast";

const Cart = () => {
  const { cart, totalPrice, navigate, axios, fetchCartData, user } =
    useContext(AppContext);

  const removeFromCart = async (menuId) => {
    try {
      const { data } = await axios.delete(`/api/cart/remove/${menuId}`);
      if (data.success) {
        toast.success(data.message || "Item removed from cart");
        fetchCartData();
      } else {
        toast.error(data.message || "Failed to remove item from cart");
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong while removing!"
      );
    }
  };

  const handleCheckout = () => {
    if (!user) {
      toast.error("Please login to proceed to checkout.");
      navigate("/login");
      return;
    }

    // ✅ Do NOT clear the cart here.
    // Let the checkout/confirm-order page read the cart
    // and clear it AFTER the order is placed.
    navigate("/checkout");
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Please login to view your cart
        </h2>
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition font-medium"
        >
          Go to Login
        </button>
      </div>
    );
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <h2 className="text-2xl font-semibold text-gray-700">
          Your Cart is Empty
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6">
      <h2 className="text-2xl font-semibold mb-6 text-center">Your Cart</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left text-gray-700">Item</th>
              <th className="py-3 px-4 text-left text-gray-700">Qty</th>
              <th className="py-3 px-4 text-left text-gray-700">Price</th>
              <th className="py-3 px-4 text-left text-gray-700">Total</th>
              <th className="py-3 px-4 text-left text-gray-700">Action</th>
            </tr>
          </thead>

          <tbody>
            {cart.items.map((item) => (
              <tr key={item._id} className="border-t hover:bg-gray-50">
                <td className="py-3 px-4 flex items-center space-x-3">
                  <img
                    src={item.menuItem.image}
                    alt={item.menuItem.name}
                    className="w-12 h-12 rounded object-cover"
                  />
                  <span className="font-medium text-gray-800">
                    {item.menuItem.name}
                  </span>
                </td>
                <td className="py-3 px-4 text-center text-gray-700">
                  {item.quantity}
                </td>
                <td className="py-3 px-4 text-center text-gray-700">
                  ${Number(item.menuItem.price).toFixed(2)}
                </td>
                <td className="py-3 px-4 text-center text-gray-700 font-semibold">
                  $
                  {Number(
                    item.menuItem.price * item.quantity
                  ).toFixed(2)}
                </td>
                <td className="py-3 px-4 text-center text-gray-700 font-semibold">
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.menuItem._id)}
                    className="inline-flex items-center justify-center p-1 rounded hover:bg-red-50 text-red-500 transition"
                    aria-label="Remove item from cart"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-6">
        <h3 className="text-xl font-semibold">
          Total:{" "}
          <span className="text-green-600">
            ${Number(totalPrice || 0).toFixed(2)}
          </span>
        </h3>
        <button
          type="button"
          onClick={handleCheckout}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
