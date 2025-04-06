
import { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Auth = () => {
  const { action } = useParams<{ action: string }>();
  
  // Validate action param
  if (action !== "login" && action !== "register") {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container px-4 md:px-6">
          {action === "login" ? <LoginForm /> : <RegisterForm />}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Auth;
