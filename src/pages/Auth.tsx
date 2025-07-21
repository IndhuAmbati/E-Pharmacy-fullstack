import { useParams, Navigate } from "react-router-dom";
import LoginForm from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";

const Auth = () => {
  const { action } = useParams<{ action: string }>();

  if (action !== "login" && action !== "register") {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <main className="flex-grow flex items-center justify-center px-4 py-12 bg-gray-100 min-h-screen">
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {action === "login" ? "Login to your account" : "Create an account"}
        </h1>
        {action === "login" ? <LoginForm /> : <RegisterForm />}
      </div>
    </main>
  );
};

export default Auth;
