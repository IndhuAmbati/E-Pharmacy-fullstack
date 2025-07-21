// CheckoutPage.tsx
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import PaymentForm from "@/components/checkout/PaymentForm";
import StoreFinder from "@/components/delivery/StoreFinder";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

const CheckoutPage = () => {
  const [activeTab, setActiveTab] = useState("payment");
  const [orderId, setOrderId] = useState<number | null>(null);
  const [isApproved, setIsApproved] = useState(false);
  const navigate = useNavigate();
  const { cartItems, cartTotal, itemCount, clearCart } = useCart();
  const { user } = useAuth();

  const deliveryFee = itemCount > 0 ? 2.99 : 0;
  const total = cartTotal + deliveryFee;

  useEffect(() => {
    const placeOrder = async () => {
      try {
        const response = await fetch(
          `http://localhost:8065/api/orders/place?userId=${user.id}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cartItems),
          }
        );

        if (!response.ok) throw new Error("Order placement failed");
        const data = await response.json();
        if (data.orderId) setOrderId(data.orderId);
      } catch (error) {
        console.error("❌ Error placing order:", error);
      }
    };

    if (cartItems.length > 0 && user?.id) placeOrder();
  }, [cartItems, user]);

  useEffect(() => {
    if (!orderId) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`http://localhost:8065/api/orders/${orderId}`);
        const data = await res.json();
        if (data.status === "APPROVED") {
          setIsApproved(true);
          clearInterval(interval);
        }
      } catch (err) {
        console.error("Error checking approval:", err);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [orderId]);

  const handleDeliveryComplete = () => {
    clearCart();
    navigate("/enter-address");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container px-4 md:px-6">
          <h1 className="text-3xl font-bold mb-6">Checkout</h1>

          {itemCount > 0 ? (
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="payment">Payment</TabsTrigger>
                    <TabsTrigger
                      value="delivery"
                      disabled={activeTab === "payment"}
                    >
                      Delivery
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="payment" className="mt-4">
                    {!orderId ? (
                      <p className="text-gray-500">Placing your order...</p>
                    ) : isApproved ? (
                      <PaymentForm
                        total={total}
                        orderId={orderId}
                        onPaymentComplete={() => setActiveTab("delivery")}
                      />
                    ) : (
                      <div className="p-4 border rounded bg-yellow-100 text-yellow-800">
                        <strong>Waiting for Approval</strong>
                        <p className="mt-2">
                          Admin approval required before payment. Checking every
                          5 seconds...
                        </p>
                      </div>
                    )}
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
                      {cartItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between items-center"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 rounded bg-gray-100 overflow-hidden">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <span className="text-sm">
                              {item.name} ({item.quantity})
                            </span>
                          </div>
                          <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}

                      <div className="border-t pt-3 mt-3">
                        <div className="flex justify-between">
                          <span>Subtotal</span>
                          <span>₹{cartTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Delivery Fee</span>
                          <span>₹{deliveryFee.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-bold mt-3">
                          <span>Total</span>
                          <span>₹{total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
              <p className="text-gray-600 mb-6">
                There are no items in your cart to checkout.
              </p>
              <Button onClick={() => navigate("/medicines")}>Browse Medicines</Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;
