import { useEffect, useState, useRef } from "react";
import { Upload } from "lucide-react";

interface Prescription {
  id: number;
  imageUrl: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  uploadDate: string;
}

export default function PrescriptionPage() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [latestPrescription, setLatestPrescription] = useState<Prescription | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // ✅ Safely get userId
  const storedUser = localStorage.getItem("user");
  const userId = storedUser ? JSON.parse(storedUser).id : null;

  const fetchLatestPrescription = async () => {
    if (!userId) return;

    try {
      const res = await fetch(`http://localhost:8065/api/prescription/user/getLatestPrescription/${userId}`);
      if (res.ok) {
        const data = await res.json();
        setLatestPrescription(data);
      }
    } catch (err) {
      console.error("Error fetching prescription", err);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchLatestPrescription();
    }
  }, [userId]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  const uploadToStorage = async (file: File): Promise<string> => {
    return URL.createObjectURL(file); // Simulated upload
  };

  const handleUpload = async () => {
    if (!file) return;

    // ✅ Block if user not logged in
    if (!userId) {
      alert("User not logged in.");
      return;
    }

    setUploading(true);
    try {
      const imageUrl = await uploadToStorage(file);
      await fetch(`http://localhost:8065/api/prescription/user/addPrescription/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl }),
      });
      setMessage("Prescription uploaded successfully.");
      setFile(null);
      fetchLatestPrescription();
    } catch (error) {
      setMessage("Failed to upload prescription.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <main className="flex-grow py-12 bg-gray-50">
      <div className="container px-4 md:px-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Upload Your Prescription</h1>
        <p className="text-center text-gray-500 mb-8">
          Upload a clear image of your prescription and our pharmacist will verify it
        </p>

        <div className="text-center space-y-4">
          <input type="file" accept="image/*" ref={inputRef} onChange={handleFileChange} className="hidden" />
          <button
            onClick={() => inputRef.current?.click()}
            className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded"
          >
            <Upload className="w-4 h-4" />
            Choose Image
          </button>

          {file && <p className="text-sm text-gray-600">Selected: {file.name}</p>}

          <button
            onClick={handleUpload}
            disabled={uploading || !file}
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Upload Prescription"}
          </button>

          {message && <p className="text-green-600 font-semibold">{message}</p>}

          {latestPrescription && (
            <div className="mt-6 bg-white p-4 shadow rounded inline-block">
              <p className="text-gray-700">
                <strong>Status:</strong>{" "}
                <span className={
                  latestPrescription.status === "APPROVED"
                    ? "text-green-600"
                    : latestPrescription.status === "REJECTED"
                      ? "text-red-600"
                      : "text-yellow-500"
                }>
                  {latestPrescription.status}
                </span>
              </p>
              <p className="text-sm text-gray-500">
                Uploaded on: {new Date(latestPrescription.uploadDate).toLocaleString()}
              </p>
              <a
                href={latestPrescription.imageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline text-sm"
              >
                View Uploaded Image
              </a>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
