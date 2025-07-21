import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function EnterAddressPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [address, setAddress] = useState({
    houseNo: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [isExisting, setIsExisting] = useState(false);

  useEffect(() => {
    const checkAddress = async () => {
      try {
        const res = await axios.get(`http://localhost:8065/api/address/${user.id}`);
        if (res.data && res.data.id) {
          setAddress(res.data); // Prefill the form
          setIsExisting(true);  // Will trigger PUT request
        }
      } catch (err) {
        console.log("No existing address found");
      }
    };

    if (user?.id) checkAddress();
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isExisting) {
        await axios.put(
          `http://localhost:8065/api/address/update/${user.id}`,
          address
        );
        alert("Address updated successfully!");
      } else {
        await axios.post(
          `http://localhost:8065/api/address/add?userId=${user.id}`,
          address
        );
        alert("Address saved successfully!");
      }
      navigate("/tracking");
    } catch (error) {
      console.error("Error saving address:", error);
      alert("Failed to save address");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        {isExisting ? "Update Address" : "Enter Address"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="houseNo" value={address.houseNo} onChange={handleChange} placeholder="House No" className="w-full px-4 py-2 border rounded" required />
        <input type="text" name="street" value={address.street} onChange={handleChange} placeholder="Street" className="w-full px-4 py-2 border rounded" required />
        <input type="text" name="city" value={address.city} onChange={handleChange} placeholder="City" className="w-full px-4 py-2 border rounded" required />
        <input type="text" name="state" value={address.state} onChange={handleChange} placeholder="State" className="w-full px-4 py-2 border rounded" required />
        <input type="text" name="pincode" value={address.pincode} onChange={handleChange} placeholder="Pincode" className="w-full px-4 py-2 border rounded" required />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          {isExisting ? "Update Address" : "Save Address"}
        </button>
      </form>
    </div>
  );
}
