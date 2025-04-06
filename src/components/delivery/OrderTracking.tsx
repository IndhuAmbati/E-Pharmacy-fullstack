
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Truck, Package, Home, Circle } from "lucide-react";

type OrderStatus = "confirmed" | "dispatched" | "out_for_delivery" | "delivered";

interface OrderTrackingProps {
  orderNumber: string;
  status?: OrderStatus;
}

interface TrackingStep {
  id: OrderStatus;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export const OrderTracking = ({ 
  orderNumber,
  status = "confirmed"
}: OrderTrackingProps) => {
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>(status);
  
  const trackingSteps: TrackingStep[] = [
    {
      id: "confirmed",
      title: "Order Confirmed",
      description: "Your order has been received and confirmed",
      icon: <CheckCircle className="h-6 w-6" />,
    },
    {
      id: "dispatched",
      title: "Order Dispatched",
      description: "Your medicines are packed and ready to ship",
      icon: <Package className="h-6 w-6" />,
    },
    {
      id: "out_for_delivery",
      title: "Out for Delivery",
      description: "Your order is on its way to your location",
      icon: <Truck className="h-6 w-6" />,
    },
    {
      id: "delivered",
      title: "Delivered",
      description: "Your order has been delivered",
      icon: <Home className="h-6 w-6" />,
    },
  ];

  // Get status index for comparison
  const getStatusIndex = (status: OrderStatus) => {
    return trackingSteps.findIndex((step) => step.id === status);
  };

  // Determine if a step is active, completed, or pending
  const getStepStatus = (stepId: OrderStatus) => {
    const currentIndex = getStatusIndex(currentStatus);
    const stepIndex = getStatusIndex(stepId);
    
    if (stepIndex < currentIndex) return "complete";
    if (stepIndex === currentIndex) return "active";
    return "pending";
  };

  // Demo: Auto-advance status for demo purposes
  useEffect(() => {
    const statusOrder: OrderStatus[] = ["confirmed", "dispatched", "out_for_delivery", "delivered"];
    const currentIndex = statusOrder.indexOf(currentStatus);
    
    if (currentIndex < statusOrder.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStatus(statusOrder[currentIndex + 1]);
      }, 5000); // Change status every 5 seconds for demo
      
      return () => clearTimeout(timer);
    }
  }, [currentStatus]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Track Your Order</CardTitle>
        <CardDescription>Order #{orderNumber}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mt-2">
          {/* Mobile View: Steps List */}
          <div className="md:hidden">
            {trackingSteps.map((step) => {
              const status = getStepStatus(step.id);
              return (
                <div key={step.id} className="flex items-start space-x-3 mb-6">
                  <div className={`
                    flex items-center justify-center w-8 h-8 rounded-full shrink-0
                    ${status === "complete" ? "bg-pharma-success text-white" :
                      status === "active" ? "bg-pharma-primary text-white" :
                      "bg-gray-200 text-gray-400"}
                  `}>
                    {step.icon}
                  </div>
                  <div>
                    <p className={`font-medium ${
                      status === "complete" ? "text-pharma-success" : 
                      status === "active" ? "text-pharma-primary" : 
                      "text-gray-400"
                    }`}>
                      {step.title}
                    </p>
                    <p className="text-sm text-gray-500">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop View: Steps with Progress */}
          <div className="hidden md:block">
            <div className="flex justify-between mb-12">
              {trackingSteps.map((step, index) => {
                const status = getStepStatus(step.id);
                
                return (
                  <div key={step.id} className="step-item flex-1 relative text-center">
                    <div className={`
                      step mx-auto
                      ${status === "complete" ? "complete" : 
                        status === "active" ? "active" : ""}
                    `}>
                      {step.icon}
                    </div>
                    <div className="text-sm mt-2">
                      <p className="font-medium">{step.title}</p>
                      <p className="text-gray-500 text-xs mt-1">{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Delivery Information */}
          {currentStatus === "out_for_delivery" && (
            <div className="mt-6 bg-pharma-light p-4 rounded-lg">
              <h4 className="font-medium text-pharma-primary">Delivery Details</h4>
              <div className="mt-2 space-y-1 text-sm">
                <p>Expected delivery: Today, between 3:00 PM - 5:00 PM</p>
                <p>Delivery Agent: John Doe (Contact: +1-555-123-4567)</p>
              </div>
            </div>
          )}

          {currentStatus === "delivered" && (
            <div className="mt-6 bg-green-50 p-4 rounded-lg">
              <h4 className="font-medium text-pharma-success">Delivered Successfully!</h4>
              <div className="mt-2 space-y-1 text-sm">
                <p>Your order was delivered on {new Date().toLocaleDateString()}, at {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                <p>Thank you for shopping with us!</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderTracking;
