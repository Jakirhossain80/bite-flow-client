// Checkout.jsx
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Checkout = () => {
  const { totalPrice, axios, navigate, user, cart } = useContext(AppContext);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Pay at hotel");

  const handleCheckout = async () => {
    if (!user) {
      toast.error("Please login to place an order.");
      navigate("/login");
      return;
    }

    if (!cart || !cart.items || cart.items.length === 0) {
      toast.error("Your cart is empty. Please add items before checkout.");
      navigate("/cart");
      return;
    }

    if (!address.trim()) {
      toast.error("Please enter your address");
      return;
    }

    try {
      const { data } = await axios.post("/api/order/place", {
        address: address.trim(),
        paymentMethod,
      });

      if (data.success) {
        toast.success(data.message || "Order placed successfully!");
        navigate("/my-orders");
      } else {
        toast.error(data.message || "Failed to place order.");
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || "Something went wrong while placing the order!"
      );
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Please login to proceed to checkout
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
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Your cart is empty
        </h2>
        <button
          type="button"
          onClick={() => navigate("/menu")}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition font-medium"
        >
          Browse Menu
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-white shadow-lg rounded-2xl">
      {/* LEFT SIDE - Address */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Delivery Address
        </h2>
        <textarea
          rows={5}
          value={address}
          placeholder="enter your full address"
          onChange={(e) => setAddress(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:outline-none resize-none"
        ></textarea>
      </div>

      {/* RIGHT SIDE - Order Summary */}
      <div className="flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Order Summary
          </h2>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
            <p className="flex justify-between text-lg font-medium text-gray-700">
              <span>Total Amount:</span>
              <span className="text-green-600 font-semibold">
                $. {Number(totalPrice || 0).toFixed(2)}
              </span>
            </p>
          </div>

          <h3 className="text-lg font-medium mb-2 text-gray-800">
            Payment Method
          </h3>
          <div className="space-y-3">
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="payment"
                value="Pay at hotel"
                checked={paymentMethod === "Pay at hotel"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>Pay at hotel</span>
            </label>

            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="payment"
                value="Online Payment"
                checked={paymentMethod === "Online Payment"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="text-green-600 focus:ring-green-500"
              />
              <span>Online Payment</span>
            </label>
          </div>
        </div>

        <button
          type="button"
          onClick={handleCheckout}
          className="mt-6 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-medium cursor-pointer"
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
