import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";

export interface PaymentFormProps {
  total: number;
  orderId: number;
  onPaymentComplete: () => void;
}

type PaymentPayload = {
  paymentMode: string;
  order: { orderId: number };
  upiId?: string;
  cardHolderName?: string;
  cardNumber?: string;
};

const PaymentForm = ({ total, orderId, onPaymentComplete }: PaymentFormProps) => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [upiId, setUpiId] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isApproved, setIsApproved] = useState(true); // Assume approved to skip polling
  const { toast } = useToast();

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Payment Processed",
        description: "Proceeding to next step...",
      });
      onPaymentComplete();
    }, 3000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Method</CardTitle>
        <CardDescription>Choose how you want to pay for your order</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handlePayment}>
          <RadioGroup
            value={paymentMethod}
            onValueChange={setPaymentMethod}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2 border p-4 rounded-md">
              <RadioGroupItem value="card" id="card" />
              <Label htmlFor="card" className="flex-1 cursor-pointer">
                Credit / Debit Card
              </Label>
            </div>
            <div className="flex items-center space-x-2 border p-4 rounded-md">
              <RadioGroupItem value="upi" id="upi" />
              <Label htmlFor="upi" className="flex-1 cursor-pointer">
                UPI Payment
              </Label>
            </div>
            <div className="flex items-center space-x-2 border p-4 rounded-md">
              <RadioGroupItem value="cash_on_delivery" id="cod" />
              <Label htmlFor="cod" className="flex-1 cursor-pointer">
                Cash on Delivery
              </Label>
            </div>
          </RadioGroup>

          {paymentMethod === "card" && (
            <div className="mt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="card-name">Name on Card</Label>
                <Input
                  id="card-name"
                  placeholder="John Doe"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="card-number">Card Number</Label>
                <Input
                  id="card-number"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          {paymentMethod === "upi" && (
            <div className="mt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="upi-id">UPI ID</Label>
                <Input
                  id="upi-id"
                  placeholder="name@upi"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          <div className="mt-6 border-t pt-4">
            <div className="flex items-center justify-between font-medium">
              <span>Total Amount:</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>

          <Button type="submit" className="w-full mt-6" disabled={isProcessing}>
            {isProcessing
              ? "Processing Payment..."
              : paymentMethod === "cash_on_delivery"
              ? "Place Order"
              : `Pay ₹${total.toFixed(2)}`}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PaymentForm;
