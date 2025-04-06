
import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import OrderTracking from "@/components/delivery/OrderTracking";
import FeedbackForm from "@/components/feedback/FeedbackForm";

const TrackingPage = () => {
  const [orderNumber] = useState("ORD-12345");
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container px-4 md:px-6">
          <h1 className="text-3xl font-bold mb-6">Order Tracking</h1>
          
          <div className="grid gap-8 md:grid-cols-2">
            <OrderTracking orderNumber={orderNumber} />
            <FeedbackForm />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TrackingPage;
