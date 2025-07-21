import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t py-12">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">MediCart Express</h3>
            <p className="text-sm text-gray-500 mb-4">
              Your trusted partner for all healthcare needs. Get medicines delivered at your doorstep.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-500 hover:text-pharma-primary">Home</Link>
              </li>
              <li>
                <Link to="/medicines" className="text-sm text-gray-500 hover:text-pharma-primary">Medicines</Link>
              </li>
              <li>
                <Link to="/upload-prescription" className="text-sm text-gray-500 hover:text-pharma-primary">Upload Prescription</Link>
              </li>
              <li>
                <Link to="/symptom-checker" className="text-sm text-gray-500 hover:text-pharma-primary">Symptom Checker</Link>
              </li>
            </ul>
          </div>

          {/* Help & Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Help & Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-sm text-gray-500 hover:text-pharma-primary">FAQs</Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-500 hover:text-pharma-primary">Contact Us</Link>
              </li>
              <li>
                <Link to="/shipping" className="text-sm text-gray-500 hover:text-pharma-primary">Shipping Policy</Link>
              </li>
              <li>
                <Link to="/returns" className="text-sm text-gray-500 hover:text-pharma-primary">Return Policy</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <address className="not-italic text-sm text-gray-500 space-y-2">
              <p>
                MediCart Express<br />
                1234 Pharmacy Lane<br />
                Hyderabad, India<br />
              </p>
              <p>Email: support@medicartexpress.com</p>
              <p>Support Hours: 9am - 9pm</p>
            </address>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 pt-8 border-t">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} MediCart Express. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
