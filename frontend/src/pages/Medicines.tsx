// src/pages/Medicines.tsx

import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Medicine {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  original_price: number;
  discount_percent: number;
  rating: number;
  quantity: number;
  requires_prescription: boolean | string;
  store_id: number;
  imageUrl: string;
}

const categories = [
  "All Categories",
  "Allergy",
  "Allergy Relief",
  "Antibiotics",
  "Cardiac Care",
  "Cold & Cough",
  "Diabetes Care",
  "Digestive Health",
  "Fever & Pain",
  "First Aid",
  "Gastric Care",
  "Health Drinks",
  "Health Essentials",
  "Hormonal Therapy",
  "Mental Health",
  "Nerve Health",
  "Pain Relief",
  "Pediatrics",
  "Respiratory",
  "Skin Care",
  "Supplements",
  "Vitamins",
];

export default function Medicines() {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [filtered, setFiltered] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [prescriptionFilter, setPrescriptionFilter] = useState<boolean | null>(null);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    fetch("http://localhost:8065/api/medicines")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch medicines");
        return res.json();
      })
      .then((data) => {
        const mappedData: Medicine[] = data.map((item: any) => ({
          id: item.id,
          name: item.name,
          description: item.description,
          category: item.category,
          price: item.price,
          original_price: item.originalPrice,
          discount_percent: item.discountPercent,
          rating: item.rating,
          quantity: item.quantity,
          requires_prescription: item.requiresPrescription,
          store_id: item.store?.id ?? 0,
          imageUrl: item.imageUrl,
        }));
        setMedicines(mappedData);
        setFiltered(mappedData);
      })
      .catch(() => setError("Failed to load medicine data"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let result = [...medicines];

    if (search) {
      result = result.filter((m) =>
        m.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== "All Categories") {
      result = result.filter(
        (m) =>
          m.category &&
          m.category.toLowerCase().trim() === category.toLowerCase().trim()
      );
    }

    if (prescriptionFilter !== null) {
      result = result.filter((m) => {
        const requiresRx =
          m.requires_prescription === true || m.requires_prescription === "0x01";
        return prescriptionFilter ? requiresRx : !requiresRx;
      });
    }

    setFiltered(result);
  }, [search, category, prescriptionFilter, medicines]);

  const handleAddToCart = async (medicine: Medicine) => {
    const requiresRx =
      medicine.requires_prescription === true ||
      medicine.requires_prescription === "0x01";

    if (requiresRx) {
      navigate(`/upload-prescription/${medicine.id}`);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8065/api/cartItem/add?userId=${user?.id}&medicineId=${medicine.id}&quantity=1`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add item to cart DB");
      }

      await response.json();
    } catch (err) {
      console.error("❌ Error saving cart item:", err);
    }

    addToCart({
      id: medicine.id,
      name: medicine.name,
      price: medicine.price,
      image: medicine.imageUrl,
    });
  };

  if (loading) return <div className="p-6">Loading medicines...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-full md:w-1/4 bg-white shadow p-4 sticky top-0 h-screen overflow-y-auto">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search
            </label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              placeholder="Search medicines..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Prescription
            </label>
            <div className="flex flex-col space-y-1 text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="prescription"
                  checked={prescriptionFilter === null}
                  onChange={() => setPrescriptionFilter(null)}
                />
                All
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="prescription"
                  checked={prescriptionFilter === true}
                  onChange={() => setPrescriptionFilter(true)}
                />
                Requires Prescription
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="prescription"
                  checked={prescriptionFilter === false}
                  onChange={() => setPrescriptionFilter(false)}
                />
                No Prescription
              </label>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 p-6">
        <h2 className="text-xl font-bold mb-4">{filtered.length} Medicines Found</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((m) => {
            const requiresRx =
              m.requires_prescription === true || m.requires_prescription === "0x01";

            return (
              <Card key={m.id} className="relative">
                <CardContent className="p-4">
                  <div className="relative">
                    <img
                      src={m.imageUrl}
                      alt={m.name}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://dummyimage.com/300x200/cccccc/555555&text=No+Image";
                      }}
                    />
                    {requiresRx && (
                      <div className="absolute top-2 right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-0.5 rounded">
                        Rx
                      </div>
                    )}
                  </div>

                  <h3 className="text-lg font-semibold mt-2">{m.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{m.category}</p>

                  <p className="text-green-700 font-bold">₹{m.price}</p>
                  {m.discount_percent > 0 && (
                    <p className="text-sm text-gray-400 line-through">
                      ₹{m.original_price}
                    </p>
                  )}
                  <p className="text-sm">Rating: {m.rating} ⭐</p>

                  <Button className="w-full mt-2" onClick={() => handleAddToCart(m)}>
                    {requiresRx ? "Upload Prescription" : "Add to Cart"}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
}
