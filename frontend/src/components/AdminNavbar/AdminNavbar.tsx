import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function AdminNavbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <nav className="bg-blue-800 text-white p-4 flex justify-between items-center shadow">
      <div className="font-bold text-xl">E-Pharmacy Admin</div>
      <div className="space-x-4"><Link to="/admin-dashboard">Dashboard</Link>
<Link to="/admin-users">Users</Link>
<Link to="/admin-medicines">Medicines</Link>
<Link to="/admin-orders">Orders</Link>
<Link to="/admin-prescriptions">Prescriptions</Link>


        <button
          onClick={handleLogout}
          className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 ml-4"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
