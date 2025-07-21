import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AdminPrescription {
  prescriptionId: number;
  user: { id: number };
  imageUrl: string;
  uploadDate: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
}

interface MedicineItem {
  medicineId: number;
  price: number;
  quantity: number;
}

export default function UploadPrescriptionDashboard() {
  const [prescriptions, setPrescriptions] = useState<AdminPrescription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedPrescription, setSelectedPrescription] = useState<AdminPrescription | null>(null);
  const [medicines, setMedicines] = useState<MedicineItem[]>([]);

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8065/api/prescription/admin/getAllPrescriptions");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setPrescriptions(data);
      setError("");
    } catch {
      setError("Failed to fetch prescriptions.");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: number, status: "APPROVED" | "REJECTED") => {
    try {
      const payload = { status: status.toUpperCase() }; // ensure valid enum
      const res = await fetch(`http://localhost:8065/api/prescription/admin/updateStatus/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Update failed:", text);
        throw new Error(text);
      }

      fetchPrescriptions();
    } catch (err: any) {
      console.error("Error:", err.message);
      alert("Failed to update prescription status.");
    }
  };

  const handleCreateOrder = async () => {
    if (!selectedPrescription || medicines.length === 0) return;

    try {
      const response = await fetch("http://localhost:8065/api/orders/admin/createOrderFromPrescription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: selectedPrescription.user.id,
          medicines,
        }),
      });

      if (!response.ok) throw new Error();

      alert("Order created from prescription successfully!");
      setMedicines([]);
      setSelectedPrescription(null);
      fetchPrescriptions();
    } catch {
      alert("Failed to create order.");
    }
  };

  const handleMedicineChange = (index: number, field: keyof MedicineItem, value: string) => {
    const newMedicines = [...medicines];
    newMedicines[index][field] = field === "medicineId" || field === "quantity"
      ? parseInt(value)
      : parseFloat(value);
    setMedicines(newMedicines);
  };

  const addMedicine = () => {
    setMedicines([...medicines, { medicineId: 0, quantity: 1, price: 0 }]);
  };

  return (
    <div>
      <Header />
      <h2 className="text-2xl font-bold mb-4 text-center mt-6">Admin - Review Prescriptions</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">User ID</th>
              <th className="border px-4 py-2">Image</th>
              <th className="border px-4 py-2">Upload Date</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {prescriptions.map((p) => (
              <tr key={p.prescriptionId} className="text-center">
                <td className="border px-4 py-2">{p.prescriptionId}</td>
                <td className="border px-4 py-2">{p.user?.id}</td>
                <td className="border px-4 py-2">
                  <a href={p.imageUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View</a>
                </td>
                <td className="border px-4 py-2">{new Date(p.uploadDate).toLocaleString()}</td>
                <td className="border px-4 py-2 capitalize">{p.status}</td>
                <td className="border px-4 py-2 space-y-1">
                  {p.status === "PENDING" && (
                    <>
                      <button onClick={() => updateStatus(p.prescriptionId, "APPROVED")} className="bg-green-600 text-white px-2 py-1 rounded w-full">Approve</button>
                      <button onClick={() => updateStatus(p.prescriptionId, "REJECTED")} className="bg-red-600 text-white px-2 py-1 rounded w-full">Reject</button>
                    </>
                  )}
                  {p.status === "APPROVED" && (
                    <button onClick={() => { setSelectedPrescription(p); addMedicine(); }} className="bg-blue-600 text-white px-2 py-1 rounded w-full">Create Order</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedPrescription && (
        <div className="bg-white mt-8 p-4 border rounded shadow">
          <h3 className="text-lg font-bold mb-2">
            Create Order for Prescription ID: {selectedPrescription.prescriptionId}
          </h3>
          {medicines.map((med, idx) => (
            <div key={idx} className="grid grid-cols-3 gap-4 mb-2">
              <Input
                type="number"
                value={med.medicineId}
                onChange={(e) => handleMedicineChange(idx, "medicineId", e.target.value)}
                placeholder="Medicine ID"
              />
              <Input
                type="number"
                value={med.quantity}
                onChange={(e) => handleMedicineChange(idx, "quantity", e.target.value)}
                placeholder="Quantity"
              />
              <Input
                type="number"
                value={med.price}
                onChange={(e) => handleMedicineChange(idx, "price", e.target.value)}
                placeholder="Price"
              />
            </div>
          ))}
          <div className="flex gap-2">
            <Button variant="outline" onClick={addMedicine}>Add Medicine</Button>
            <Button onClick={handleCreateOrder}>Submit Order</Button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
