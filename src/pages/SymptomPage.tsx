
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SymptomChecker from "@/components/medicines/SymptomChecker";

const SymptomPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container px-4 md:px-6">
          <h1 className="text-3xl font-bold mb-6 text-center">Symptom Checker</h1>
          <p className="text-center text-gray-500 mb-8">
            Select your symptoms to find recommended medications
          </p>
          <SymptomChecker />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SymptomPage;
