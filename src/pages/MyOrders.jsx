// MyOrders.jsx
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";

const MyOrders = () => {
  const { axios, navigate } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatDate = (value) => {
    if (!value) return "-";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const fetchMyOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/order/my-orders");
      if (data.success) {
        setOrders(Array.isArray(data.orders) ? data.orders : []);
      } else {
        toast.error(data.message || "Failed to load orders.");
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        toast.error("Please login to view your orders.");
        navigate("/login");
      } else {
        console.log(error);
        toast.error("Something went wrong while fetching orders.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto mt-10 p-6">
        <h2 className="text-2xl font-semibold mb-6 text-center">My Orders</h2>
        <div className="flex items-center justify-center h-32">
          <p className="text-gray-600">Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="max-w-5xl mx-auto mt-10 p-6">
        <h2 className="text-2xl font-semibold mb-6 text-center">My Orders</h2>
        <div className="flex flex-col items-center justify-center h-48 text-center">
          <p className="text-gray-600 mb-4">You have no orders yet.</p>
          <button
            type="button"
            onClick={() => navigate("/menu")}
            className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full font-semibold transition-colors"
          >
            Browse Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6">
      <h2 className="text-2xl font-semibold mb-6 text-center">My Orders</h2>
      <div>
        {orders.map((order) => {
          let statusClasses = "bg-gray-100 text-gray-700";
          if (order.status === "Pending") {
            statusClasses = "bg-yellow-100 text-yellow-700";
          } else if (order.status === "Preparing") {
            statusClasses = "bg-green-100 text-green-700";
          } else if (order.status === "Cancelled") {
            statusClasses = "bg-red-100 text-red-700";
          }

          return (
            <div
              key={order._id}
              className="bg-white shadow-md rounded-2xl p-5 border border-gray-100 hover:shadow-lg transition mb-4"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold text-gray-800">
                  Order ID:{" "}
                  <span className="text-green-600">
                    {order._id ? order._id.slice(-6) : ""}
                  </span>
                </h3>
                <span
                  className={`px-3 py-1 text-sm rounded-full ${statusClasses}`}
                >
                  {order.status}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">
                <p>
                  <span className="font-medium">Address: </span>
                  {order.address}
                </p>
                <p>
                  <span className="font-medium">Payment:</span>{" "}
                  {order.paymentMethod}
                </p>
                <p>
                  <span className="font-medium">Total:</span> $.{" "}
                  {order.totalAmount}
                </p>
                <p>
                  <span className="font-medium">Date:</span>{" "}
                  {formatDate(order.createdAt)}
                </p>
              </div>

              <div className="mt-4">
                <p className="text-gray-600 text-sm">
                  <span className="font-medium">Items:</span>{" "}
                  {order.items?.length || 0} product(s)
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrders;
