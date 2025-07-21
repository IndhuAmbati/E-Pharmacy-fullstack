import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Upload,
  Search,
  ShoppingCart,
  Clock,
  CheckCircle,
  Truck,
  ThumbsUp,
} from "lucide-react";

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const processSteps = [
    {
      title: "Register & Login",
      description: "Create an account or login to start ordering",
      icon: <CheckCircle className="h-6 w-6" />,
      path: "/register",
    },
    {
      title: "Select Medicines",
      description: "Upload prescription or select symptoms",
      icon: <Search className="h-6 w-6" />,
      path: "/upload-prescription",
    },
    {
      title: "Add to Cart",
      description: "Review your medicines and proceed to checkout",
      icon: <ShoppingCart className="h-6 w-6" />,
      path: "/cart",
    },
    {
      title: "Make Payment",
      description: "Choose from multiple payment methods",
      icon: <CheckCircle className="h-6 w-6" />,
      path: "/checkout",
    },
    {
      title: "Track Order",
      description: "Monitor your order in real-time",
      icon: <Clock className="h-6 w-6" />,
      path: "/tracking",
    },
    {
      title: "Home Delivery",
      description: "Receive your medicines at your doorstep",
      icon: <Truck className="h-6 w-6" />,
      path: "/tracking",
    },
    {
      title: "Provide Feedback",
      description: "Share your experience with us",
      icon: <ThumbsUp className="h-6 w-6" />,
      path: "/feedback",
    },
  ];

  return (
    <main className="flex-grow">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pharma-light to-blue-50 py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tighter">
                Medicines Delivered{" "}
                <span className="text-pharma-primary">At Your Doorstep</span>
              </h1>
              <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Upload your prescription or select symptoms to get medicines
                delivered from the nearest pharmacy. Fast, reliable, and
                secure.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/upload-prescription">
                  <Button>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Prescription
                  </Button>
                </Link>
                <Link to="/symptom-checker">
                  <Button variant="outline">
                    <Search className="mr-2 h-4 w-4" />
                    Check by Symptoms
                  </Button>
                </Link>
              </div>
            </div>
            <div className="lg:order-last">
              <img
                src="https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?q=80&w=1024"
                alt="Pharmacy"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              />
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold">How It Works</h2>
            <p className="text-gray-500 mt-2">
              Simple, fast, and reliable process to get your medicines
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="card-hover">
              <CardContent className="p-6 text-center">
                <div className="rounded-full bg-pharma-light w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Upload className="h-8 w-8 text-pharma-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Upload Prescription</h3>
                <p className="text-gray-500">
                  Take a photo of your prescription and upload it for our
                  pharmacist to verify
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-6 text-center">
                <div className="rounded-full bg-pharma-light w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <ShoppingCart className="h-8 w-8 text-pharma-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Add to Cart</h3>
                <p className="text-gray-500">
                  We'll add the prescribed medicines to your cart or you can
                  select by symptoms
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-6 text-center">
                <div className="rounded-full bg-pharma-light w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Truck className="h-8 w-8 text-pharma-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Home Delivery</h3>
                <p className="text-gray-500">
                  Get medicines delivered from the nearest pharmacy to your
                  doorstep
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Process Flow Animation */}
      <div className="py-16 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold">Our Process Flow</h2>
            <p className="text-gray-500 mt-2">
              See how our e-pharmacy application works step by step
            </p>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center overflow-x-auto no-scrollbar">
              {processSteps.map((step, index) => (
                <div
                  key={index}
                  className={`step-item ${index <= currentStep ? "active" : ""} ${
                    index < currentStep ? "complete" : ""
                  }`}
                >
                  <div
                    className={`step ${index <= currentStep ? "active" : ""} ${
                      index < currentStep ? "complete" : ""
                    }`}
                  >
                    {step.icon}
                  </div>
                  <p className="text-xs mt-2 hidden md:block">{step.title}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-start gap-4">
              <div className="bg-pharma-light p-4 rounded-full">
                {processSteps[currentStep].icon}
              </div>
              <div>
                <h3 className="text-xl font-bold">{`Step ${currentStep + 1}: ${
                  processSteps[currentStep].title
                }`}</h3>
                <p className="mt-2 text-gray-600">
                  {processSteps[currentStep].description}
                </p>

                <div className="mt-4 flex gap-4">
                  <Button
                    variant="outline"
                    onClick={() =>
                      setCurrentStep((prev) => Math.max(0, prev - 1))
                    }
                    disabled={currentStep === 0}
                  >
                    Previous Step
                  </Button>
                  <Button
                    onClick={() =>
                      setCurrentStep((prev) =>
                        Math.min(processSteps.length - 1, prev + 1)
                      )
                    }
                    disabled={currentStep === processSteps.length - 1}
                  >
                    Next Step <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link to={processSteps[currentStep].path}>
              <Button size="lg">
                Try This Step Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Index;
