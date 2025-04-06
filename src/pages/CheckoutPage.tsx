
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PaymentForm from "@/components/checkout/PaymentForm";
import StoreFinder from "@/components/delivery/StoreFinder";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CheckoutPage = () => {
  const [activeTab, setActiveTab] = useState<string>("payment");
  const navigate = useNavigate();
  const total = 26.45; // Example total, in a real app would come from cart state

  const handlePaymentComplete = () => {
    setActiveTab("delivery");
  };

  const handleDeliveryComplete = () => {
    navigate("/tracking");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container px-4 md:px-6">
          <h1 className="text-3xl font-bold mb-6">Checkout</h1>
          
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="payment">Payment</TabsTrigger>
                  <TabsTrigger value="delivery" disabled={activeTab === "payment"}>
                    Delivery
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="payment" className="mt-4">
                  <PaymentForm total={total} onPaymentComplete={handlePaymentComplete} />
                </TabsContent>
                <TabsContent value="delivery" className="mt-4">
                  <div className="space-y-6">
                    <StoreFinder />
                    <Button className="w-full" onClick={handleDeliveryComplete}>
                      Confirm Delivery
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            <div>
              <Card className="sticky top-20">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 rounded bg-gray-100 overflow-hidden">
                          <img 
                            src="https://picsum.photos/seed/paracetamol/200/200" 
                            alt="Paracetamol" 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <span className="text-sm">Paracetamol (2)</span>
                      </div>
                      <span>$11.98</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 rounded bg-gray-100 overflow-hidden">
                          <img 
                            src="https://picsum.photos/seed/ibuprofen/200/200" 
                            alt="Ibuprofen" 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <span className="text-sm">Ibuprofen (1)</span>
                      </div>
                      <span>$6.49</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 rounded bg-gray-100 overflow-hidden">
                          <img 
                            src="https://picsum.photos/seed/cetirizine/200/200" 
                            alt="Cetirizine" 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <span className="text-sm">Cetirizine (1)</span>
                      </div>
                      <span>$7.99</span>
                    </div>
                    <div className="border-t pt-3 mt-3">
                      <div className="flex justify-between">
                        <span>Delivery Fee</span>
                        <span>$2.99</span>
                      </div>
                      <div className="flex justify-between font-bold mt-3">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CheckoutPage;
