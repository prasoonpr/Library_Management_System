import React, { useState } from "react";
import { useAdminLoginMutation } from "../../services/adminApi";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
    const navigate=useNavigate()
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [adminLogin,{error}]=useAdminLoginMutation()

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const response=await adminLogin(formData)
    if(response.data){
        localStorage.setItem('adminToken',response.data.accessToken)
        navigate('/admin/dashboard');
    }
    // TODO: Call login API here
    console.log("Logging in with:", formData);
  };

  return (
    <div className="admin-login-container flex items-center justify-center min-h-screen bg-gray-100">
      <div className="admin-login-card bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm">
       {error?<h2 className="text-sm font-bold text-center text-red-700 mb-4">{error?.data?.message}</h2>: <h2 className="admin-login-title text-2xl font-bold text-center text-blue-700 mb-6">
          Admin Login
        </h2>}
        <form onSubmit={handleSubmit} className="admin-login-form space-y-4">
          <div>
            <label className="block text-gray-700 text-sm mb-1" htmlFor="email">
              Email
            </label>
            <input
              className="admin-login-input w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              name="email"
              id="email"
              placeholder="admin@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm mb-1" htmlFor="password">
              Password
            </label>
            <input
              className="admin-login-input w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="admin-login-button w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
