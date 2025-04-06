
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";

export interface PaymentFormProps {
  total: number;
  onPaymentComplete: () => void;
}

export const PaymentForm = ({ total, onPaymentComplete }: PaymentFormProps) => {
  const [paymentMethod, setPaymentMethod] = useState<string>("card");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const { toast } = useToast();

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Payment successful!",
        description: "Your order has been confirmed.",
        variant: "default",
      });
      onPaymentComplete();
    }, 2000);
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
                <div>Credit / Debit Card</div>
              </Label>
              <div className="flex space-x-1">
                <img src="https://picsum.photos/seed/visa/30/20" alt="Visa" className="h-5" />
                <img src="https://picsum.photos/seed/mastercard/30/20" alt="Mastercard" className="h-5" />
                <img src="https://picsum.photos/seed/amex/30/20" alt="Amex" className="h-5" />
              </div>
            </div>

            <div className="flex items-center space-x-2 border p-4 rounded-md">
              <RadioGroupItem value="upi" id="upi" />
              <Label htmlFor="upi" className="flex-1 cursor-pointer">
                <div>UPI Payment</div>
              </Label>
              <div className="flex space-x-1">
                <img src="https://picsum.photos/seed/upi/30/20" alt="UPI" className="h-5" />
              </div>
            </div>

            <div className="flex items-center space-x-2 border p-4 rounded-md">
              <RadioGroupItem value="cod" id="cod" />
              <Label htmlFor="cod" className="flex-1 cursor-pointer">
                <div>Cash on Delivery</div>
                <p className="text-xs text-gray-500 mt-1">Pay when your order is delivered</p>
              </Label>
            </div>
          </RadioGroup>

          {paymentMethod === "card" && (
            <div className="mt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="card-name">Name on Card</Label>
                <Input id="card-name" placeholder="John Doe" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="card-number">Card Number</Label>
                <Input id="card-number" placeholder="1234 5678 9012 3456" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input id="expiry" placeholder="MM/YY" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input id="cvv" placeholder="123" required />
                </div>
              </div>
            </div>
          )}

          {paymentMethod === "upi" && (
            <div className="mt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="upi-id">UPI ID</Label>
                <Input id="upi-id" placeholder="name@upi" required />
              </div>
            </div>
          )}

          <div className="mt-6 border-t pt-4">
            <div className="flex items-center justify-between font-medium">
              <span>Total Amount:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <Button type="submit" className="w-full mt-6" disabled={isProcessing}>
            {isProcessing ? "Processing Payment..." : `Pay $${total.toFixed(2)}`}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PaymentForm;
