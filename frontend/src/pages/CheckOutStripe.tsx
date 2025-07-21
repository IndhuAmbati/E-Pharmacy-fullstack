import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "@/components/ui/button"; // Adjust based on your project
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const stripePromise = loadStripe("pk_test_XXXXXXXXXXXXXXXXXXXX"); // Your Publishable key

const CheckoutStripe = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:8065/api/payment/create-checkout-session", {
        method: "POST",
      });

      const url = await res.text(); // We expect backend to return the URL
      window.location.href = url; // Redirect to Stripe Checkout
    } catch (err) {
      console.error("Stripe Checkout Error:", err);
      alert("Something went wrong. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow p-6 text-center">
        <h1 className="text-3xl font-bold mb-4">Stripe Payment</h1>
        <p className="mb-6 text-gray-600">Click below to pay securely using Stripe</p>

        <Button onClick={handleCheckout} disabled={isLoading}>
          {isLoading ? "Redirecting..." : "Pay with Stripe"}
        </Button>
      </main>

      <Footer />
    </div>
  );
};

export default CheckoutStripe;
