
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface Symptom {
  id: string;
  name: string;
}

interface Medicine {
  id: string;
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
      id: "paracetamol",
      name: "Paracetamol 500mg",
      description: "Reduces fever and relieves pain",
      price: 5.99,
      image: "https://picsum.photos/seed/paracetamol/200/200",
    },
    {
      id: "ibuprofen",
      name: "Ibuprofen 200mg",
      description: "Anti-inflammatory and fever reducer",
      price: 6.49,
      image: "https://picsum.photos/seed/ibuprofen/200/200",
    },
  ],
  headache: [
    {
      id: "aspirin",
      name: "Aspirin 300mg",
      description: "Pain reliever for headaches",
      price: 4.99,
      image: "https://picsum.photos/seed/aspirin/200/200",
    },
    {
      id: "paracetamol",
      name: "Paracetamol 500mg",
      description: "Reduces fever and relieves pain",
      price: 5.99,
      image: "https://picsum.photos/seed/paracetamol/200/200",
    },
  ],
  cough: [
    {
      id: "dextromethorphan",
      name: "Dextromethorphan Syrup",
      description: "Cough suppressant",
      price: 8.99,
      image: "https://picsum.photos/seed/coughsyrup/200/200",
    },
    {
      id: "guaifenesin",
      name: "Guaifenesin Tablets",
      description: "Expectorant for productive coughs",
      price: 7.49,
      image: "https://picsum.photos/seed/guaifenesin/200/200",
    },
  ],
  "sore-throat": [
    {
      id: "lozenges",
      name: "Throat Lozenges",
      description: "Soothes sore throat discomfort",
      price: 3.99,
      image: "https://picsum.photos/seed/lozenges/200/200",
    },
  ],
  "runny-nose": [
    {
      id: "cetirizine",
      name: "Cetirizine 10mg",
      description: "Antihistamine for allergies",
      price: 7.99,
      image: "https://picsum.photos/seed/cetirizine/200/200",
    },
  ],
  "body-ache": [
    {
      id: "ibuprofen",
      name: "Ibuprofen 200mg",
      description: "Anti-inflammatory and pain reliever",
      price: 6.49,
      image: "https://picsum.photos/seed/ibuprofen/200/200",
    },
  ],
  nausea: [
    {
      id: "ondansetron",
      name: "Ondansetron 4mg",
      description: "Anti-nausea medication",
      price: 9.99,
      image: "https://picsum.photos/seed/ondansetron/200/200",
    },
  ],
  dizziness: [
    {
      id: "meclizine",
      name: "Meclizine 25mg",
      description: "For vertigo and dizziness",
      price: 8.49,
      image: "https://picsum.photos/seed/meclizine/200/200",
    },
  ],
};

export const SymptomChecker = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [recommendedMedicines, setRecommendedMedicines] = useState<Medicine[]>([]);
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();

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

    // Get recommended medicines based on selected symptoms
    const medicines = new Map<string, Medicine>();
    
    selectedSymptoms.forEach((symptomId) => {
      const medicinesForSymptom = medicinesBySymptom[symptomId] || [];
      medicinesForSymptom.forEach((medicine) => {
        medicines.set(medicine.id, medicine);
      });
    });
    
    setRecommendedMedicines(Array.from(medicines.values()));
    setShowResults(true);
  };

  const addToCart = (medicine: Medicine) => {
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
                <Label 
                  htmlFor={symptom.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {symptom.name}
                </Label>
              </div>
            ))}
          </div>
          <Button
            onClick={handleFindMedicines}
            className="w-full mt-6"
            disabled={selectedSymptoms.length === 0}
          >
            Find Recommended Medicines
          </Button>
        </CardContent>
      </Card>

      {showResults && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Recommended Medicines</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {recommendedMedicines.length > 0 ? (
              recommendedMedicines.map((medicine) => (
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
                    <p className="text-sm text-gray-500 mt-1">{medicine.description}</p>
                    <div className="flex items-center justify-between mt-4">
                      <p className="font-bold">${medicine.price.toFixed(2)}</p>
                      <Button 
                        variant="default"
                        size="sm"
                        onClick={() => addToCart(medicine)}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                No specific medications recommended for the selected symptoms. Please consult a healthcare professional.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SymptomChecker;
