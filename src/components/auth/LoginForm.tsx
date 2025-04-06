
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Login successful!",
        description: "Welcome back to CureConnect.",
      });
      navigate("/");
      // In a real app, you would set the user state here
    }, 1500);
  };

  return (
    <div className="mx-auto max-w-md space-y-6 p-6 bg-white rounded-lg shadow-md">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Login to Your Account</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Enter your credentials to access your account
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" placeholder="john.doe@example.com" type="email" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" required />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="remember" className="h-4 w-4 rounded border-gray-300" />
            <Label htmlFor="remember" className="text-sm font-normal">Remember me</Label>
          </div>
          <Link to="/forgot-password" className="text-sm text-pharma-primary hover:underline">
            Forgot password?
          </Link>
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Logging In..." : "Login"}
        </Button>
      </form>
      <div className="text-center text-sm">
        Don't have an account?{" "}
        <Link to="/register" className="text-pharma-primary hover:underline">
          Register
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
