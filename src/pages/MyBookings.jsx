// MyBookings.jsx
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";

const MyBookings = () => {
  const { axios, navigate } = useContext(AppContext);
  const [bookings, setBookings] = useState([]);
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

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/booking/my-bookings");
      if (data.success) {
        setBookings(Array.isArray(data.bookings) ? data.bookings : []);
      } else {
        toast.error(data.message || "Failed to load bookings.");
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        toast.error("Please login to view your bookings.");
        navigate("/login");
      } else {
        console.log(error);
        toast.error("Something went wrong while fetching bookings.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto mt-10 p-6">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          My Bookings
        </h2>
        <div className="flex items-center justify-center h-32">
          <p className="text-gray-600">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  if (!bookings.length) {
    return (
      <div className="max-w-5xl mx-auto mt-10 p-6">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          My Bookings
        </h2>
        <div className="flex flex-col items-center justify-center h-48 text-center">
          <p className="text-gray-600 mb-4">
            You don&apos;t have any bookings yet.
          </p>
          <button
            type="button"
            onClick={() => navigate("/book-table")}
            className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full font-semibold transition-colors"
          >
            Book a Table
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6">
      <h2 className="text-2xl font-semibold mb-6 text-center">My Bookings</h2>

      <div className="space-y-6">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-white shadow-md rounded-2xl p-5 border border-gray-100 hover:shadow-lg transition"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-gray-800">
                {booking.name}
              </h3>
              <span
                className={`px-3 py-1 text-sm rounded-full ${
                  booking.status === "Pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : booking.status === "Approved"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {booking.status}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">
              <p>
                <span className="font-medium">Phone:</span> {booking.phone}
              </p>
              <p>
                <span className="font-medium">Date:</span>{" "}
                {formatDate(booking.date)}
              </p>
              <p>
                <span className="font-medium">Time:</span> {booking.time}
              </p>
              <p>
                <span className="font-medium">Guests:</span>{" "}
                {booking.numberOfPeople}
              </p>
            </div>

            {booking.note && (
              <div className="mt-3 text-gray-700">
                <span className="font-medium">Note:</span> {booking.note}
              </div>
            )}

            <div className="mt-3 text-gray-500 text-sm">
              Booked on: {formatDate(booking.createdAt)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
