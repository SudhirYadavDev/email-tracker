import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authAPI } from "../services/api";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await authAPI.post("/login", formData);

      localStorage.setItem("token", res.data);

      toast.success("Login successful!");

      navigate("/");
    } catch (error) {
      console.error(error);

      toast.error("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full bg-white/50 border border-white/80 text-gray-800 text-sm font-medium rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:bg-white outline-none px-4 py-3 transition-all duration-300 placeholder:text-gray-400 shadow-[0_2px_10px_rgba(0,0,0,0.02)] backdrop-blur-md";

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-indigo-100 via-white to-purple-100">
      <div className="w-full max-w-md relative overflow-hidden bg-white/60 backdrop-blur-3xl border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-3xl p-8">

        <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-purple-400/10 blur-[50px] rounded-full"></div>

        <div className="relative z-10">
          <h1 className="text-3xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-indigo-800 to-gray-900 drop-shadow-sm mb-2">
            Welcome Back
          </h1>

          <p className="text-sm font-medium text-gray-500 mb-8 tracking-wide">
            Login to continue to your dashboard
          </p>

          <form onSubmit={handleLogin} className="space-y-5">

            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">
                Email
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-sm rounded-xl px-8 py-3 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:scale-[1.02] transition-all duration-300 outline-none disabled:opacity-50"
            >
              {loading ? "Logging In..." : "Login"}
            </button>
          </form>

          <p className="text-sm text-gray-500 text-center mt-6">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-indigo-600 font-bold hover:text-indigo-800"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;