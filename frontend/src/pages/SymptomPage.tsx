
import SymptomChecker from "@/components/medicines/SymptomChecker";

const SymptomPage = () => {
  return (
    <main className="flex-grow py-12 bg-gray-50">
      <div className="container px-4 md:px-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Symptom Checker</h1>
        <p className="text-center text-gray-500 mb-8">
          Select your symptoms to find recommended medications
        </p>
        <SymptomChecker />
      </div>
    </main>
  );
};

export default SymptomPage;
