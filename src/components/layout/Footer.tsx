
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t py-12">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">CureConnect</h3>
            <p className="text-sm text-gray-500 mb-4">
              Your trusted partner for all healthcare needs. Get medicines delivered at your doorstep.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-500 hover:text-pharma-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/medicines" className="text-sm text-gray-500 hover:text-pharma-primary">
                  Medicines
                </Link>
              </li>
              <li>
                <Link to="/upload-prescription" className="text-sm text-gray-500 hover:text-pharma-primary">
                  Upload Prescription
                </Link>
              </li>
              <li>
                <Link to="/symptom-checker" className="text-sm text-gray-500 hover:text-pharma-primary">
                  Symptom Checker
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Help & Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-sm text-gray-500 hover:text-pharma-primary">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-500 hover:text-pharma-primary">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-sm text-gray-500 hover:text-pharma-primary">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-sm text-gray-500 hover:text-pharma-primary">
                  Return Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <address className="not-italic text-sm text-gray-500 space-y-2">
              <p>1234 Health Street</p>
              <p>Wellness City, WC 12345</p>
              <p>Email: support@cureconnect.com</p>
              <p>Phone: (123) 456-7890</p>
            </address>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} CureConnect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
