import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";

export const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const newUser = {
      name,
      email,
      password,
      contactNumber: phone,
      address,
      state,
      dateOfBirth
    };
    console.log("Logging in with:", { email, password });
    try {
      const response = await axios.post("http://localhost:8065/api/users/register", newUser);
      if (response.status === 201) {
        toast({
          title: "Registration successful!",
          description: "Please login.",
        });
        navigate("/login");
      }
    } catch (error: unknown) {
      let message = "Something went wrong.";
      if (axios.isAxiosError(error)) {
        message = error.response?.data || "Invalid credentials.";
      } else if (error instanceof Error) {
        message = error.message;
      }

      toast({
        title: "Registration failed",
        description: message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Label>Name</Label>
      <Input value={name} onChange={(e) => setName(e.target.value)} required />

      <Label>Email</Label>
      <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

      <Label>Phone</Label>
      <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />

      <Label>Password</Label>
      <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      

      <Label>Address</Label>
      <Input value={address} onChange={(e) => setAddress(e.target.value)} required />

      <Label>State</Label>
      <Input value={state} onChange={(e) => setState(e.target.value)} required />

      <Label>Date of Birth</Label>
      <Input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} required />

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Creating..." : "Create Account"}
      </Button>

      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600">Sign in</Link>
      </div>
    </form>
  );
};
