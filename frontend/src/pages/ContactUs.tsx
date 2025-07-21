
import { Mail, MapPin, Phone, Instagram, Linkedin } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      
      <div className="max-w-4xl mx-auto pt-8 pb-16 px-4">
        <h1 className="text-4xl font-bold text-center mb-12 text-pharma-primary">
          Contact Us
        </h1>

        <div className="space-y-10 bg-white bg-opacity-95 backdrop-blur p-8 rounded-2xl shadow-md border border-blue-100">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-pharma-primary">
              Our Address
            </h2>
            <p className="text-gray-700 flex items-center gap-2">
              <MapPin className="text-pharma-primary" size={20} />
              Nizampet Road, Opp. Rajiv Gandhi Nagar Bus Stop, Bachupally,
              Hyderabad-500090, Telangana, India.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-pharma-primary">
              Email
            </h2>
            <p className="text-gray-700 flex items-center gap-2">
              <Mail className="text-pharma-primary" size={20} />
              support@medicartexpress.com
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-pharma-primary">
              Phone
            </h2>
            <p className="text-gray-700 flex items-center gap-2">
              <Phone className="text-pharma-primary" size={20} />
              +91 90505 40000
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-pharma-primary">
              Follow Us
            </h2>
            <div className="flex gap-6 mt-2">
              <a
                href="https://www.instagram.com/medicartexpress"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-700 hover:text-pharma-primary"
              >
                <Instagram className="text-pharma-primary" size={20} />
                @medicartexpress
              </a>
              <a
                href="https://www.linkedin.com/company/medicartexpress"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-700 hover:text-pharma-primary"
              >
                <Linkedin className="text-pharma-primary" size={20} />
                MediCart Express Ltd.
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;