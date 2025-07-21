
import { Truck, Timer, MapPin, HelpCircle } from "lucide-react";

const Shipping = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      
      <div className="max-w-5xl mx-auto pt-8 pb-16 px-6"> {/* Moved px-6 inside, removed from outer */}
        <div className="bg-white bg-opacity-90 shadow-lg rounded-2xl p-10 backdrop-blur">
          <h1 className="text-4xl font-bold mb-10 text-pharma-primary text-center">
            Shipping Policy
          </h1>

          <div className="space-y-10">
            {/* Section 1 */}
            <div className="flex items-start gap-4">
              <MapPin className="text-pharma-primary" size={32} />
              <div>
                <h2 className="text-xl font-semibold mb-1">Delivery Areas</h2>
                <p className="text-gray-700">
                  We deliver across major cities and towns in India. You can check delivery availability at checkout.
                </p>
              </div>
            </div>

            <hr />

            {/* Section 2 */}
            <div className="flex items-start gap-4">
              <Timer className="text-pharma-primary" size={32} />
              <div>
                <h2 className="text-xl font-semibold mb-1">Delivery Time</h2>
                <p className="text-gray-700">
                  Orders are processed within 24 hours. Delivery typically takes 2–3 business days depending on your location.
                </p>
              </div>
            </div>

            <hr />

            {/* Section 3 */}
            <div className="flex items-start gap-4">
              <Truck className="text-pharma-primary" size={32} />
              <div>
                <h2 className="text-xl font-semibold mb-1">Shipping Charges</h2>
                <p className="text-gray-700">
                  Shipping is free for orders above ₹499. Orders below that incur a shipping fee of ₹49 at checkout.
                </p>
              </div>
            </div>

            <hr />

            {/* Section 4 */}
            <div className="flex items-start gap-4">
              <HelpCircle className="text-pharma-primary" size={32} />
              <div>
                <h2 className="text-xl font-semibold mb-1">Delays & Tracking</h2>
                <p className="text-gray-700">
                  In case of unexpected delays, we will notify you via SMS or email. You can track your orders anytime from the “Tracking” section.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shipping;