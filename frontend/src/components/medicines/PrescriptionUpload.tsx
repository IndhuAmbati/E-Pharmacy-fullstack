import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Upload, CheckCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext"; // ✅ auth context

export const PrescriptionUpload = () => {
  const { user } = useAuth(); // ✅ get user
  const navigate = useNavigate();
  const { toast } = useToast();

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

  // 🔐 Block upload if user is not logged in
  if (!user) {
    toast({
      title: "Login Required",
      description: "Please login to upload a prescription.",
      variant: "destructive",
    });
    navigate("/login");
    return null; // ⛔️ Don't render component
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a prescription image to upload.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    // Simulate upload
    setTimeout(() => {
      setIsUploading(false);
      setIsUploaded(true);
      toast({
        title: "Prescription uploaded!",
        description:
          "Our pharmacist will review your prescription shortly.",
        variant: "default",
      });
    }, 2000);
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Upload Prescription</CardTitle>
        <CardDescription>
          Upload an image of your prescription for our pharmacist to review
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="picture">Prescription Image</Label>
              <div
                className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:bg-gray-50"
                onClick={() =>
                  document.getElementById("prescription-upload")?.click()
                }
              >
                <input
                  id="prescription-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                  disabled={isUploading || isUploaded}
                />

                {preview ? (
                  <div className="relative w-full h-48">
                    <img
                      src={preview}
                      alt="Prescription preview"
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center">
                    <Upload className="h-10 w-10 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">
                      Click or drag to upload
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Supported formats: JPEG, PNG, PDF
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Button
            type="submit"
            disabled={!file || isUploading || isUploaded}
            className="w-full"
          >
            {isUploading
              ? "Uploading..."
              : isUploaded
              ? "Uploaded Successfully"
              : "Upload Prescription"}
          </Button>
        </form>

        {isUploaded && (
          <div className="mt-6">
            <div className="bg-green-50 border border-green-100 p-4 rounded-lg flex items-start">
              <CheckCircle className="text-pharma-success h-5 w-5 mr-2 mt-0.5" />
              <div>
                <h4 className="font-medium text-green-800">
                  Prescription Received!
                </h4>
                <p className="text-sm text-green-600 mt-1">
                  Our pharmacist will review your prescription and add the
                  medicines to your cart within 30 minutes. You'll be notified
                  once it's ready.
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PrescriptionUpload;
