import { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar/AdminNavbar";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export default function UserDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8065/api/admin/users");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setUsers(data);
      setError("");
    } catch {
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    await fetch(`http://localhost:8065/api/admin/users/${id}`, { method: "DELETE" });
    fetchUsers();
  };

  return (
    <div>
      <AdminNavbar />
      <div className="p-6 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {loading ? (
          <p>Loading users...</p>
        ) : (
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="border px-3 py-2">ID</th>
                <th className="border px-3 py-2">Name</th>
                <th className="border px-3 py-2">Email</th>
                <th className="border px-3 py-2">Role</th>
                <th className="border px-3 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="border px-3 py-2">{user.id}</td>
                  <td className="border px-3 py-2">{user.name}</td>
                  <td className="border px-3 py-2">{user.email}</td>
                  <td className="border px-3 py-2">{user.role}</td>
                  <td className="border px-3 py-2">
                    <button
                      className="bg-red-600 text-white px-2 py-1 rounded"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
