import { useEffect, useState } from "react";
import axios from "axios";
import { BadgeCheck, Truck, Clock, CheckCircle, IndianRupee } from "lucide-react";

interface Order {
  orderId: number;
  orderDate: string;
  totalAmount: number;
  status: string;
}

const getStatusDetails = (status: string) => {
  switch (status.toLowerCase()) {
    case "paid":
      return {
        icon: <IndianRupee className="w-4 h-4 mr-1 text-indigo-600" />,
        color: "bg-indigo-100 text-indigo-800",
      };
    case "delivered":
      return {
        icon: <CheckCircle className="w-4 h-4 mr-1 text-green-600" />,
        color: "bg-green-100 text-green-800",
      };
    case "shipped":
      return {
        icon: <Truck className="w-4 h-4 mr-1 text-blue-600" />,
        color: "bg-blue-100 text-blue-800",
      };
    case "approved":
      return {
        icon: <BadgeCheck className="w-4 h-4 mr-1 text-green-600" />,
        color: "bg-green-100 text-green-800",
      };
    case "pending":
      return {
        icon: <Clock className="w-4 h-4 mr-1 text-yellow-600" />,
        color: "bg-yellow-100 text-yellow-800",
      };
    case "rejected":
      return {
        icon: null,
        color: "bg-red-100 text-red-800",
      };
    default:
      return { icon: null, color: "bg-gray-100 text-gray-800" };
  }
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const fetchOrders = () => {
    if (!user) return;
    axios
      .get(`http://localhost:8065/api/orders/user/${user.id}`)
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("Error fetching orders:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);

  const handlePay = (orderId: number) => {
    axios
      .put(`http://localhost:8065/api/orders/${orderId}/pay`)
      .then(() => {
        alert("Payment successful!");
        fetchOrders(); // Refresh status
      })
      .catch((err) => {
        alert("Payment failed: " + err.response?.data || "Try again");
      });
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md max-w-5xl mx-auto">
        <div className="flex items-center mb-4">
          <BadgeCheck className="w-6 h-6 mr-2 text-green-600" />
          <h2 className="text-2xl font-bold">Your Orders</h2>
        </div>

        {loading ? (
          <p className="text-gray-500">Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="text-gray-500">No orders found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {orders.map((order) => {
              const badge = getStatusDetails(order.status);
              return (
                <div
                  key={order.orderId}
                  className="border border-gray-200 p-4 rounded-xl bg-gray-50"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-lg font-semibold">
                        Order #{order.orderId}
                      </h4>
                      <p className="text-xs text-gray-500">
                        Placed on {new Date(order.orderDate).toLocaleString()}
                      </p>
                    </div>
                    <span
                      className={`text-xs font-medium px-3 py-1 rounded-full flex items-center ${badge.color}`}
                    >
                      {badge.icon} {order.status}
                    </span>
                  </div>

                  <div className="mt-2 text-sm text-gray-700">
                    Total: ₹{order.totalAmount.toFixed(2)}
                  </div>

                  {order.status.toLowerCase() === "approved" && (
                    <button
                      onClick={() => handlePay(order.orderId)}
                      className="mt-3 bg-indigo-600 text-white px-4 py-1 rounded hover:bg-indigo-700"
                    >
                      Pay Now
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
