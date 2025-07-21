
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PharmacyStore {
  id: string;
  name: string;
  distance: number; // in km
  address: string;
  hasStock: boolean;
}

const mockStores: PharmacyStore[] = [
  {
    id: "1",
    name: "Medplus Pharmacy",
    distance: 1.2,
    address: "Rajeev Gandhi Nagar ,Bachupally",
    hasStock: true,
  },
  {
    id: "2",
    name: "Century Pharmacy",
    distance: 60 ,
    address: "Rajeev Gandhi Nagar Bachupally",
    hasStock: true,
  },
  {
    id: "3",
    name: "MEdxperts Pharmacy",
    distance: 3.8,
    address: "Rajeev Gandhi Nagar ,Bachupally",
    hasStock: false,
  },
  {
    id: "4",
    name: "leven Pharmacy",
    distance: 6,
    address: "PVR Icon Pragathi Nagar",
    hasStock: true,
  },
];

export const StoreFinder = () => {
  const [stores, setStores] = useState<PharmacyStore[]>([]);
  const [selectedStore, setSelectedStore] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to get nearby stores
    setTimeout(() => {
      setStores(mockStores);
      setIsLoading(false);
    }, 1500);
  }, []);

  const handleStoreSelect = (storeId: string) => {
    setSelectedStore(storeId);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nearby Pharmacy Stores</CardTitle>
        <CardDescription>
          We'll find the closest pharmacy with your medicines in stock
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="h-8 w-8 rounded-full border-4 border-t-pharma-primary animate-spin"></div>
            <p className="mt-4 text-sm text-gray-500">Finding nearby stores...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {stores.map((store) => (
              <div
                key={store.id}
                className={`border p-4 rounded-lg cursor-pointer transition-all ${
                  selectedStore === store.id ? "border-pharma-primary bg-pharma-light" : ""
                }`}
                onClick={() => store.hasStock && handleStoreSelect(store.id)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{store.name}</h3>
                      {store.hasStock ? (
                        <Badge className="bg-pharma-success">In Stock</Badge>
                      ) : (
                        <Badge variant="outline" className="text-pharma-warning border-pharma-warning">
                          Out of Stock
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{store.address}</p>
                  </div>
                  <div className="text-sm text-gray-500">{store.distance.toFixed(1)} km away</div>
                </div>
                {selectedStore === store.id && (
                  <div className="mt-4 bg-white p-3 rounded-md border">
                    <p className="text-sm text-pharma-primary font-medium">
                      This store will deliver your order.
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Estimated delivery time: 30-45 minutes
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StoreFinder;
