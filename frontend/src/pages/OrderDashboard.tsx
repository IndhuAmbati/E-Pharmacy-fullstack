import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { BadgeCheck, Truck, Clock, CheckCircle, XCircle, PackageCheck } from "lucide-react";

interface Order {
  orderId: number;
  orderDate: string;
  totalAmount: number;
  status: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

const getStatusBadge = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
      return <span className="text-yellow-600 font-medium">⏳ Pending</span>;
    case "approved":
      return <span className="text-green-600 font-medium">✔️ Approved</span>;
    case "rejected":
      return <span className="text-red-600 font-medium">❌ Rejected</span>;
    case "paid":
      return <span className="text-blue-600 font-medium">💰 Paid</span>;
    case "shipped":
      return <span className="text-purple-600 font-medium">📦 Shipped</span>;
    case "delivered":
      return <span className="text-green-700 font-medium">✅ Delivered</span>;
    default:
      return <span>{status}</span>;
  }
};

export default function OrderDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const admin = JSON.parse(localStorage.getItem("user") || "null");

  const fetchOrders = () => {
    axios
      .get(`http://localhost:8065/api/orders`)
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("Error fetching orders", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (orderId: number, status: string) => {
  try {
    await axios.put(`http://localhost:8065/api/orders/${orderId}/status`, {
      status: status,
    });
    fetchOrders();
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      alert("Error updating status: " + err.response?.data);
    } else {
      alert("An unknown error occurred.");
    }
  }
};

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <PackageCheck /> Admin Order Dashboard
      </h2>

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.orderId}
              className="border p-4 rounded-lg shadow-sm bg-white"
            >
              <div className="flex justify-between">
                <div>
                  <p className="font-semibold">
                    Order #{order.orderId} - {getStatusBadge(order.status)}
                  </p>
                  <p className="text-sm text-gray-600">
                    Placed on {new Date(order.orderDate).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    User: {order.user.name} ({order.user.email})
                  </p>
                  <p className="mt-1 text-sm">Total: ₹{order.totalAmount}</p>
                </div>

                <div className="flex flex-col gap-2">
                  {order.status === "PENDING" && (
                    <>
                      <Button
                        variant="default"
                        onClick={() => updateStatus(order.orderId, "APPROVED")}
                      >
                        <BadgeCheck className="w-4 h-4 mr-1" /> Approve
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => updateStatus(order.orderId, "REJECTED")}
                      >
                        <XCircle className="w-4 h-4 mr-1" /> Reject
                      </Button>
                    </>
                  )}

                  {order.status === "PAID" && (
                    <Button
                      variant="secondary"
                      onClick={() => updateStatus(order.orderId, "SHIPPED")}
                    >
                      <Truck className="w-4 h-4 mr-1" /> Ship Order
                    </Button>
                  )}

                  {order.status === "SHIPPED" && (
                    <Button
                      variant="default"
                      onClick={() => updateStatus(order.orderId, "DELIVERED")}
                    >
                      <CheckCircle className="w-4 h-4 mr-1" /> Mark Delivered
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
