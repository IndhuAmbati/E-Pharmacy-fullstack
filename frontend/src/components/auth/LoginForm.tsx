import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function LoginForm() {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("user"); // user or admin
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const url =
      role === "admin"
        ? "http://localhost:8065/api/admin/login"
        : "http://localhost:8065/api/users/login";

    const body =
      role === "admin"
        ? { username: emailOrUsername, password }
        : { email: emailOrUsername, password };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();

      if (data && data.id) {
        const fixedUser = {
          ...data,
          role: data.role?.toUpperCase() === "ADMIN" ? "ADMIN" : "USER",
        };
        login(fixedUser, "dummy-token");

        if (fixedUser.role === "ADMIN") {
          navigate("/admin-dashboard");
        } else {
          navigate("/medicines");
        }
      } else {
        setError("Invalid login response");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleLogin} className="space-y-4">
        <div className="flex gap-4">
          <label>
            <input
              type="radio"
              value="user"
              checked={role === "user"}
              onChange={() => setRole("user")}
            />
            User
          </label>
          <label>
            <input
              type="radio"
              value="admin"
              checked={role === "admin"}
              onChange={() => setRole("admin")}
            />
            Admin
          </label>
        </div>

        <input
          type="text"
          placeholder={role === "admin" ? "Username" : "Email"}
          className="w-full border px-3 py-2 rounded"
          value={emailOrUsername}
          onChange={(e) => setEmailOrUsername(e.target.value)}
        />

        <div>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full border px-3 py-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className="flex items-center mt-1 text-sm">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              className="mr-2"
            />
            Show Password
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}
