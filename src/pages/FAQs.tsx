
const Faq = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      
      <div className="max-w-4xl mx-auto pt-8 pb-16 px-4">
        <h1 className="text-4xl font-bold text-center mb-12 text-pharma-primary">
          Frequently Asked Questions
        </h1>

        <div className="space-y-10 text-gray-700 text-lg">
          {/* Question 1 */}
          <div>
            <h2 className="text-xl font-semibold text-pharma-primary mb-1">
              1. How can I order medicines?
            </h2>
            <p>
              You can order medicines by browsing the medicines section, adding them to your cart, and completing the checkout process.
            </p>
          </div>

          {/* Question 2 */}
          <div>
            <h2 className="text-xl font-semibold text-pharma-primary mb-1">
              2. Can I upload prescriptions?
            </h2>
            <p>
              Yes, you can upload prescriptions using the “Upload Prescription” option in the navigation menu.
            </p>
          </div>

          {/* Question 3 */}
          <div>
            <h2 className="text-xl font-semibold text-pharma-primary mb-1">
              3. What is the delivery time?
            </h2>
            <p>
              Delivery usually takes 2–3 business days depending on your location.
            </p>
          </div>

          {/* Question 4 */}
          <div>
            <h2 className="text-xl font-semibold text-pharma-primary mb-1">
              4. What if a medicine is out of stock?
            </h2>
            <p>
              If a medicine is out of stock, you can request a notification when it becomes available.
            </p>
          </div>

          {/* Question 5 */}
          <div>
            <h2 className="text-xl font-semibold text-pharma-primary mb-1">
              5. How do I contact support?
            </h2>
            <p>
              You can contact us using the "Contact Us" page from the Help & Support section in the footer.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;