import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const getUPIProvider = (upi: string) => {
  if (upi.includes("@oksbi") || upi.includes("@okicici") || upi.includes("@okaxis")) return "PhonePe";
  if (upi.includes("@okhdfcbank")) return "Google Pay";
  if (upi.includes("@paytm")) return "Paytm";
  return "Generic UPI";
};

const FakeUPIRedirect = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const upi = new URLSearchParams(location.search).get("upi") || "";
  const provider = getUPIProvider(upi);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/tracking");
    }, 4000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold mb-4">Redirecting to {provider}...</h2>
      <p className="text-gray-600 mb-4">
        Simulating UPI payment for <strong>{upi}</strong>
      </p>
      <img
        src={`/logos/${provider.toLowerCase().replace(" ", "")}.png`}
        alt={provider}
        className="h-24 mx-auto"
      />
    </div>
  );
};

export default FakeUPIRedirect;
