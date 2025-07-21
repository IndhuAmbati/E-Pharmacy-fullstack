import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar/AdminNavbar";


export default function AdminDashboard() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalMedicines, setTotalMedicines] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [pendingPrescriptions, setPendingPrescriptions] = useState(0);

  useEffect(() => {
    fetch("http://localhost:8065/api/admin/users")
      .then((res) => res.json())
      .then((data) => setTotalUsers(data.length))
      .catch(() => setTotalUsers(0));

    fetch("http://localhost:8065/api/medicines")
      .then((res) => res.json())
      .then((data) => setTotalMedicines(data.length))
      .catch(() => setTotalMedicines(0));

    fetch("http://localhost:8065/api/order/all")
      .then((res) => res.json())
      .then((data) => setTotalOrders(data.length))
      .catch(() => setTotalOrders(0));

    fetch("http://localhost:8065/api/prescriptions/pending")
      .then((res) => res.json())
      .then((data) => setPendingPrescriptions(data.length))
      .catch(() => setPendingPrescriptions(0));
  }, []);

  return (
    <div>
      <AdminNavbar />
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link to="/admin-users" className="bg-blue-100 p-4 rounded-xl shadow hover:shadow-lg">
  <h2 className="text-xl font-semibold">Users</h2>
  <p>{totalUsers} total users</p>
</Link>

<Link to="/admin-medicines" className="bg-green-100 p-4 rounded-xl shadow hover:shadow-lg">
  <h2 className="text-xl font-semibold">Medicines</h2>
  <p>{totalMedicines} total medicines</p>
</Link>

<Link to="/admin-orders" className="bg-yellow-100 p-4 rounded-xl shadow hover:shadow-lg">
  <h2 className="text-xl font-semibold">Orders</h2>
  <p>{totalOrders} total orders</p>
</Link>

<Link to="/admin-prescriptions" className="bg-pink-100 p-4 rounded-xl shadow hover:shadow-lg">
  <h2 className="text-xl font-semibold">Prescriptions</h2>
  <p>{pendingPrescriptions} pending prescriptions</p>
</Link>



        </div>
      </div>
    </div>
  );
}
