import { useEffect, useState } from "react";
import axios from "axios";

import {
  Mail,
  Phone,
  CalendarDays,
  MapPin,
  BadgeCheck,
  Truck,
  Clock,
  CheckCircle,
  LogOut,
  Pencil,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  name: string;
  email: string;
  contactNumber: string;
  dateOfBirth: string;
  state: string;
}

interface Order {
  id: number;
  orderDate: string;
  totalAmount: number;
  status: string;
}

const getStatusDetails = (status: string) => {
  switch (status.toLowerCase()) {
    case "delivered":
      return {
        color: "bg-green-100 text-green-800",
        icon: <CheckCircle className="w-4 h-4 mr-1 text-green-600" />,
      };
    case "shipped":
      return {
        color: "bg-blue-100 text-blue-800",
        icon: <Truck className="w-4 h-4 mr-1 text-blue-600" />,
      };
    case "processing":
      return {
        color: "bg-yellow-100 text-yellow-800",
        icon: <Clock className="w-4 h-4 mr-1 text-yellow-600" />,
      };
    default:
      return {
        color: "bg-gray-100 text-gray-800",
        icon: null,
      };
  }
};

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [editedUser, setEditedUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser: User = JSON.parse(storedUser);
      setUser(parsedUser);
      axios
        .get<Order[]>(`http://localhost:8065/orders/user/${parsedUser.id}`)
        .then((res) => {
          setOrders(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching orders:", err);
          setLoading(false);
        });
    }
  }, []);

  const handleSaveProfile = () => {
    if (!editedUser) return;

    axios
      .put(`http://localhost:8065/api/users/${editedUser.id}`, editedUser)
      .then((res) => {
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        setIsEditing(false);
      })
      .catch((err) => {
        console.error("Failed to update user:", err);
        alert("Error updating profile.");
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/auth/login");
  };

  if (!user) {
    return (
      <div className="p-4 text-center text-gray-500">Loading profile...</div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      
      <main className="flex-grow p-6 bg-gradient-to-br from-indigo-50 to-blue-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1 bg-white rounded-2xl shadow-xl p-6 sticky top-6 h-fit animate-fade-in">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-4 rounded-xl mb-6 shadow-md">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-white p-1 shadow-lg">
                  <img
                    src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${user.name}`}
                    alt="avatar"
                    className="rounded-full"
                  />
                </div>
                <h2 className="text-xl font-bold mt-3">{user.name}</h2>
                <p className="text-sm">Premium Member</p>
              </div>
            </div>

            {isEditing ? (
              <div className="space-y-3 text-sm text-gray-700">
                <input
                  type="text"
                  value={editedUser?.name}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser!, name: e.target.value })
                  }
                  className="w-full border rounded p-2"
                  placeholder="Name"
                />
                <input
                  type="email"
                  value={editedUser?.email}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser!, email: e.target.value })
                  }
                  className="w-full border rounded p-2"
                  placeholder="Email"
                />
                <input
                  type="text"
                  value={editedUser?.contactNumber}
                  onChange={(e) =>
                    setEditedUser({
                      ...editedUser!,
                      contactNumber: e.target.value,
                    })
                  }
                  className="w-full border rounded p-2"
                  placeholder="Contact Number"
                />
                <input
                  type="text"
                  value={editedUser?.dateOfBirth}
                  onChange={(e) =>
                    setEditedUser({
                      ...editedUser!,
                      dateOfBirth: e.target.value,
                    })
                  }
                  className="w-full border rounded p-2"
                  placeholder="Date of Birth"
                />
                <input
                  type="text"
                  value={editedUser?.state}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser!, state: e.target.value })
                  }
                  className="w-full border rounded p-2"
                  placeholder="State"
                />
                <div className="flex gap-2 mt-2">
                  <button
                    className="px-4 py-2 bg-green-100 text-green-700 rounded hover:bg-green-200"
                    onClick={handleSaveProfile}
                  >
                    Save
                  </button>
                  <button
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-gray-700 text-sm">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 mr-2 text-blue-500" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 mr-2 text-blue-500" />
                  <span>{user.contactNumber}</span>
                </div>
                <div className="flex items-center">
                  <CalendarDays className="w-5 h-5 mr-2 text-blue-500" />
                  <span>{user.dateOfBirth}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-blue-500" />
                  <span>{user.state}</span>
                </div>
              </div>
            )}

            <div className="mt-6 flex gap-2">
              {!isEditing && (
                <button
                  className="flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-xl hover:bg-blue-200"
                  onClick={() => {
                    setEditedUser(user);
                    setIsEditing(true);
                  }}
                >
                  <Pencil className="w-4 h-4 mr-2" /> Edit Profile
                </button>
              )}
              <button
                className="flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-xl hover:bg-red-200"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" /> Logout
              </button>
            </div>
          </div>

          {/* Orders Section */}
          <div className="md:col-span-2 bg-white rounded-2xl shadow-xl p-6 animate-slide-in">
            <div className="flex items-center mb-4">
              <BadgeCheck className="w-6 h-6 mr-2 text-green-600" />
              <h2 className="text-2xl font-bold">Your Orders</h2>
            </div>

            {loading ? (
              <p className="text-gray-500">Loading orders...</p>
            ) : orders.length === 0 ? (
              <p className="text-gray-500">You haven’t placed any orders yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {orders.map((order) => {
                  const status = getStatusDetails(order.status);
                  return (
                    <div
                      key={order.id}
                      className="border border-gray-200 rounded-xl p-4 bg-gray-50 hover:shadow-lg transition-all"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="text-lg font-semibold">
                            Order #{order.id}
                          </h4>
                          <p className="text-xs text-gray-500">
                            Placed on {order.orderDate}
                          </p>
                        </div>
                        <span
                          className={`text-xs font-medium px-3 py-1 rounded-full flex items-center ${status.color}`}
                        >
                          {status.icon} {order.status}
                        </span>
                      </div>
                      <div className="mt-2 text-sm text-gray-700">
                        Total Paid: ₹{order.totalAmount}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
