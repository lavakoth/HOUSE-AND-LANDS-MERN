// src/pages/AuthForm.jsx
import React, { useState } from "react";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";

const AuthForm = ({ type, setPage }) => {
  const { handleAuth, loading, error, setError } = useAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
    firstName: "",
    lastName: "",
    role: "buyer",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleAuth(type, form);
      setPage("listings");
    } catch (err) {
      /* error already set in context */
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-2xl mt-10">
      <h2 className="text-3xl font-bold text-center mb-6">
        {type === "login" ? "Welcome Back" : "Create Account"}
      </h2>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>
      )}

      <form onSubmit={onSubmit} className="space-y-4">
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
        />
        {type === "register" && (
          <>
            <input
              name="username"
              placeholder="Username"
              required
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            />
            <input
              name="firstName"
              placeholder="First Name"
              required
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            />
            <select
              name="role"
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            >
              <option value="buyer">Buyer/Renter</option>
              <option value="agent">Agent</option>
              <option value="landlord">Landlord</option>
            </select>
          </>
        )}
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
        />

        <Button
          type="submit"
          loading={loading}
          primary={true}
          className="w-full"
        >
          {type === "login" ? "Log In" : "Sign Up"}
        </Button>
      </form>

      <p className="text-center mt-4 text-sm">
        {type === "login" ? (
          <>
            No account?{" "}
            <span
              onClick={() => setPage("register")}
              className="text-blue-600 cursor-pointer font-medium"
            >
              Register
            </span>
          </>
        ) : (
          <>
            Have account?{" "}
            <span
              onClick={() => setPage("login")}
              className="text-blue-600 cursor-pointer font-medium"
            >
              Log in
            </span>
          </>
        )}
      </p>
    </div>
  );
};

export default AuthForm;
