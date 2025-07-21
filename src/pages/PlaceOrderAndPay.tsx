import { useState } from "react";
import PaymentForm from "@/components/checkout/PaymentForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

const PlaceOrderAndPay = () => {
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [orderId, setOrderId] = useState<number | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  const placeOrder = async () => {
    if (!user?.id) {
      toast({
        title: "Please login",
        description: "You must be logged in to place an order.",
        variant: "destructive",
      });
      return;
    }

    try {
      const res = await fetch(`http://localhost:8065/api/order/place?userId=${user.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          totalAmount,
          status: "PENDING",
          orderDate: new Date().toISOString(),
          orderItems: [],
        }),
      });

      const data = await res.json();

      if (res.ok && data?.orderId) {
        setOrderId(data.orderId);
        toast({
          title: "Order placed!",
          description: `Order ID: ${data.orderId}`,
        });
      } else {
        toast({
          title: "Order failed",
          description: data.message || "Something went wrong.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Network error",
        description: "Could not connect to server.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-6 space-y-4 max-w-lg mx-auto">
      <Input
        type="number"
        placeholder="Enter amount"
        value={totalAmount}
        onChange={(e) => setTotalAmount(Number(e.target.value))}
      />
      <Button onClick={placeOrder} className="w-full">
        Place Order
      </Button>

      {orderId !== null && (
        <PaymentForm
          total={totalAmount}
          orderId={orderId}
          onPaymentComplete={() =>
            toast({ title: "Payment Complete", description: "Thank you for your purchase!" })
          }
        />
      )}
    </div>
  );
};

export default PlaceOrderAndPay;
