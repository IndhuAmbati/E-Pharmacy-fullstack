
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PrescriptionUpload from "@/components/medicines/PrescriptionUpload";

const PrescriptionPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container px-4 md:px-6">
          <h1 className="text-3xl font-bold mb-6 text-center">Upload Your Prescription</h1>
          <p className="text-center text-gray-500 mb-8">
            Upload a clear image of your prescription and our pharmacist will verify it
          </p>
          <PrescriptionUpload />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrescriptionPage;
