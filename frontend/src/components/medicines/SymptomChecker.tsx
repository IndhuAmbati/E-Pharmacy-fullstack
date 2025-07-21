// src/pages/SymptomPage.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { Navigate } from "react-router-dom";

interface Symptom {
  id: string;
  name: string;
}

interface Medicine {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

const symptoms: Symptom[] = [
  { id: "fever", name: "Fever" },
  { id: "headache", name: "Headache" },
  { id: "cough", name: "Cough" },
  { id: "sore-throat", name: "Sore Throat" },
  { id: "runny-nose", name: "Runny Nose" },
  { id: "body-ache", name: "Body Ache" },
  { id: "nausea", name: "Nausea" },
  { id: "dizziness", name: "Dizziness" },
];

const medicinesBySymptom: Record<string, Medicine[]> = {
  fever: [
    {
      id: 1,
      name: "Paracetamol 500mg",
      description: "Reduces fever and relieves pain",
      price: 500,
      image:
        "https://www.chemist-4-u.com/media/resized/1000/catalog/product/p/a/paracetemol_500_1.jpg",
    },
    {
      id: 2,
      name: "Ibuprofen 200mg",
      description: "Anti-inflammatory and fever reducer",
      price: 649,
      image:
        "https://th.bing.com/th/id/OIP.VpwoAEzkluT0-p68eRJxxQHaHa?w=177&h=180",
    },
  ],
  headache: [
    {
      id: 3,
      name: "Aspirin 300mg",
      description: "Pain reliever for headaches",
      price: 499,
      image:
        "https://th.bing.com/th/id/OIP.KpcTXD6YuOk9a6I0seQ4ZgHaFR?rs=1&pid=ImgDetMain",
    },
    {
      id: 1,
      name: "Paracetamol 500mg",
      description: "Reduces fever and relieves pain",
      price: 556,
      image:
        "https://www.chemist-4-u.com/media/resized/1000/catalog/product/p/a/paracetemol_500_1.jpg",
    },
  ],
  cough: [
    {
      id: 4,
      name: "Dextromethorphan Syrup",
      description: "Cough suppressant",
      price: 800,
      image:
        "https://th.bing.com/th/id/OIP.y_h1d-jINAaPtdq4xurv-gHaHC?w=197&h=187",
    },
    {
      id: 5,
      name: "Guaifenesin Tablets",
      description: "Expectorant for productive coughs",
      price: 749,
      image:
        "https://www.gosupps.com/media/catalog/product/7/1/71_Ll72hdQL.jpg",
    },
  ],
  "sore-throat": [
    {
      id: 6,
      name: "Throat Lozenges",
      description: "Soothes sore throat discomfort",
      price: 369,
      image:
        "https://th.bing.com/th/id/OIP.W8yqJVtzuU4j-hj3PI3SOQHaHa?w=179&h=180",
    },
  ],
  "runny-nose": [
    {
      id: 7,
      name: "Cetirizine 10mg",
      description: "Antihistamine for allergies",
      price: 599,
      image:
        "https://th.bing.com/th/id/OIP.-fTslcQpSofLC34Gkw-IZQHaHa?w=180&h=181",
    },
  ],
  "body-ache": [
    {
      id: 2,
      name: "Ibuprofen 200mg",
      description: "Anti-inflammatory and pain reliever",
      price: 149,
      image:
        "https://th.bing.com/th/id/OIP.VpwoAEzkluT0-p68eRJxxQHaHa?w=177&h=180",
    },
  ],
  nausea: [
    {
      id: 8,
      name: "Ondansetron 4mg",
      description: "Anti-nausea medication",
      price: 999,
      image:
        "https://th.bing.com/th/id/OIP.ZL_7SRTEkKnYdteaxeiDPAHaHa?w=205&h=206",
    },
  ],
  dizziness: [
    {
      id: 9,
      name: "Meclizine 25mg",
      description: "For vertigo and dizziness",
      price: 849,
      image:
        "https://th.bing.com/th/id/OIP.35lWM7rQMbdxdZwOYLPzAgHaFy?w=270&h=211",
    },
  ],
};

export const SymptomChecker = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [recommendedMedicines, setRecommendedMedicines] = useState<Medicine[]>([]);
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const { addToCart } = useCart();

  if (!user) {
    toast({
      title: "Login required",
      description: "Please log in to use the symptom checker.",
      variant: "destructive",
    });
    return <Navigate to="/login" replace />;
  }

  const handleSymptomToggle = (symptomId: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptomId)
        ? prev.filter((id) => id !== symptomId)
        : [...prev, symptomId]
    );
  };

  const handleFindMedicines = () => {
    if (selectedSymptoms.length === 0) {
      toast({
        title: "No symptoms selected",
        description: "Please select at least one symptom to continue.",
        variant: "destructive",
      });
      return;
    }

    const medicines = new Map<number, Medicine>();
    selectedSymptoms.forEach((symptomId) => {
      const list = medicinesBySymptom[symptomId] || [];
      list.forEach((medicine) => medicines.set(medicine.id, medicine));
    });
    setRecommendedMedicines(Array.from(medicines.values()));
    setShowResults(true);
  };

  const handleAddToCart = (medicine: Medicine) => {
    addToCart({
      id: medicine.id,
      name: medicine.name,
      price: medicine.price,
      image: medicine.image,
    });

    toast({
      title: "Added to cart",
      description: `${medicine.name} has been added to your cart.`,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Symptom Checker</CardTitle>
          <CardDescription>
            Select the symptoms you're experiencing to get recommended medications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {symptoms.map((symptom) => (
              <div key={symptom.id} className="flex items-center space-x-2">
                <Checkbox
                  id={symptom.id}
                  checked={selectedSymptoms.includes(symptom.id)}
                  onCheckedChange={() => handleSymptomToggle(symptom.id)}
                />
                <Label htmlFor={symptom.id}>{symptom.name}</Label>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <Button
              onClick={handleFindMedicines}
              disabled={selectedSymptoms.length === 0}
            >
              Find Recommended Medicines
            </Button>
          </div>
        </CardContent>
      </Card>

      {showResults && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Recommended Medicines</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {recommendedMedicines.map((medicine) => (
              <Card key={medicine.id} className="overflow-hidden card-hover">
                <div className="aspect-square w-full">
                  <img
                    src={medicine.image}
                    alt={medicine.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold">{medicine.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {medicine.description}
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <p className="font-bold">₹{medicine.price.toFixed(2)}</p>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleAddToCart(medicine)}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SymptomChecker;
