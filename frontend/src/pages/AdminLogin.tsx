// src/pages/AdminLogin.tsx
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    const adminUser = {
      id: 1,
      name: "Admin",
      email: "admin@example.com",
      phone: "1234567890",
      address: "Admin Lane",
      joinDate: "2024-01-01",
      role: "ADMIN" as const, // 👈 important fix
    };

    login(adminUser, "dummy-token"); // 👈 token required
    navigate("/admin-dashboard");
  };

  return (
    <div className="p-6 max-w-sm mx-auto">
      <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Login as Admin
      </button>
    </div>
  );
}
