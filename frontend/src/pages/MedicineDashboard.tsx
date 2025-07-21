import React, { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar/AdminNavbar";

interface Medicine {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  rating: number;
  imageUrl: string;
  requiresPrescription: boolean;
  quantity: number;
  store: { id: number }; // because backend expects { "store": { "id": 1 } }

}

export default function AdminMedicineDashboard() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [editing, setEditing] = useState<Medicine | null>(null);
  const [newMedicine, setNewMedicine] = useState<Partial<Medicine>>({});
  const [loading, setLoading] = useState(true);
  const adminHeader = { "X-Admin": "true" };

  const fetchMedicines = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:8065/api/medicines");
    const data = await res.json();
    setMedicines(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  const handleAdd = async () => {
    if (!newMedicine.name || !newMedicine.price) {
      alert("Name and price are required");
      return;
    }

    const res = await fetch("http://localhost:8065/api/medicines", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...adminHeader },
      body: JSON.stringify(newMedicine),
    });

    if (res.ok) {
      setNewMedicine({});
      fetchMedicines();
    } else {
      alert("Unauthorized or error adding medicine");
    }
  };

  const handleUpdate = async () => {
    if (!editing) return;

    const res = await fetch(`http://localhost:8065/api/medicines/${editing.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...adminHeader },
      body: JSON.stringify(editing),
    });

    if (res.ok) {
      setEditing(null);
      fetchMedicines();
    } else {
      alert("Unauthorized or error updating medicine");
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure to delete this medicine?")) return;

    const res = await fetch(`http://localhost:8065/api/medicines/${id}`, {
      method: "DELETE",
      headers: adminHeader,
    });

    if (res.ok) {
      fetchMedicines();
    } else {
      alert("Unauthorized or error deleting medicine");
    }
  };

  if (loading) return <div>Loading medicines...</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <AdminNavbar />
      <h2 className="text-2xl font-bold mb-4">Admin Medicine Dashboard</h2>

      {/* Add New Medicine Form */}
      <div className="mb-6 border p-4 rounded bg-gray-50">
        <h3 className="text-xl mb-4 font-semibold">Add New Medicine</h3>
        <div className="grid grid-cols-2 gap-4">
          <input className="border p-2" placeholder="Name" value={newMedicine.name || ""}
            onChange={(e) => setNewMedicine({ ...newMedicine, name: e.target.value })} />

          <input className="border p-2" placeholder="Category" value={newMedicine.category || ""}
            onChange={(e) => setNewMedicine({ ...newMedicine, category: e.target.value })} />

          <input className="border p-2" placeholder="Description" value={newMedicine.description || ""}
            onChange={(e) => setNewMedicine({ ...newMedicine, description: e.target.value })} />

          <input className="border p-2" type="number" placeholder="Price" value={newMedicine.price || ""}
            onChange={(e) => setNewMedicine({ ...newMedicine, price: Number(e.target.value) })} />

          <input className="border p-2" type="number" placeholder="Original Price" value={newMedicine.originalPrice || ""}
            onChange={(e) => setNewMedicine({ ...newMedicine, originalPrice: Number(e.target.value) })} />

          <input className="border p-2" type="number" placeholder="Discount %" value={newMedicine.discountPercent || ""}
            onChange={(e) => setNewMedicine({ ...newMedicine, discountPercent: Number(e.target.value) })} />

          <input className="border p-2" type="number" placeholder="Rating" value={newMedicine.rating || ""}
            onChange={(e) => setNewMedicine({ ...newMedicine, rating: Number(e.target.value) })} />

          <input className="border p-2" placeholder="Image URL" value={newMedicine.imageUrl || ""}
            onChange={(e) => setNewMedicine({ ...newMedicine, imageUrl: e.target.value })} />

          <input className="border p-2" type="number" placeholder="Quantity" value={newMedicine.quantity || ""}
            onChange={(e) => setNewMedicine({ ...newMedicine, quantity: Number(e.target.value) })} />

          <input className="border p-2" type="number" placeholder="Store ID"
      value={newMedicine.store?.id ?? ""}

      onChange={(e) =>
        setNewMedicine({
          ...newMedicine,
          store: { id: Number(e.target.value) }
        })
      }
    />


          <label className="flex items-center space-x-2 col-span-2">
            <input type="checkbox" checked={newMedicine.requiresPrescription || false}
              onChange={(e) => setNewMedicine({ ...newMedicine, requiresPrescription: e.target.checked })} />
            <span>Requires Prescription</span>
          </label>
        </div>

        <button onClick={handleAdd} className="bg-green-600 text-white px-4 py-2 rounded mt-4">
          Add Medicine
        </button>
      </div>

      {/* Medicine Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100 text-sm">
            <th className="border px-2 py-1">ID</th>
            <th className="border px-2 py-1">Name</th>
            <th className="border px-2 py-1">Category</th>
            <th className="border px-2 py-1">Price</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((med) =>
            editing?.id === med.id ? (
              <tr key={med.id}>
                <td className="border px-2 py-1">{med.id}</td>
                <td className="border px-2 py-1">
                  <input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="border p-1" />
                </td>
                <td className="border px-2 py-1">
                  <input value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })} className="border p-1" />
                </td>
                <td className="border px-2 py-1">
                  <input type="number" value={editing.price} onChange={(e) => setEditing({ ...editing, price: Number(e.target.value) })} className="border p-1" />
                </td>
                <td className="border px-2 py-1 space-x-2">
                  <button onClick={handleUpdate} className="bg-blue-600 text-white px-2 py-1 rounded">Save</button>
                  <button onClick={() => setEditing(null)} className="bg-gray-500 text-white px-2 py-1 rounded">Cancel</button>
                </td>
              </tr>
            ) : (
              <tr key={med.id}>
                <td className="border px-2 py-1">{med.id}</td>
                <td className="border px-2 py-1">{med.name}</td>
                <td className="border px-2 py-1">{med.category}</td>
                <td className="border px-2 py-1">{med.price}</td>
                <td className="border px-2 py-1 space-x-2">
                  <button onClick={() => setEditing(med)} className="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
                  <button onClick={() => handleDelete(med.id)} className="bg-red-600 text-white px-2 py-1 rounded">Delete</button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
