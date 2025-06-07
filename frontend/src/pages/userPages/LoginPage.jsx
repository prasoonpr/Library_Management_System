import React, { useState } from 'react'
import { useLoginMutation } from '../../services/userApi';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate=useNavigate()
    const [login,{error}]=useLoginMutation()
 const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
     const response=await login(form)
    localStorage.setItem('userToken',response.data.accessToken)
    navigate('/');
    window.location.reload();
    // onLogin(form); // Replace with your login logic or API call
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-16 rounded-xl shadow-md w-full max-w-md space-y-5"
      >
        
    {error?<h2 className="text-sm font-bold text-center text-red-700 mb-4">{error?.data?.message}</h2>:<h2 className="text-2xl font-bold text-center text-blue-700">Login</h2>}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Login
        </button>

        <p className="text-sm text-center text-gray-600">
          Don’t have an account? <a href="/register" className="text-blue-600">Register</a>
        </p>
      </form>
    </div>
  );
}

export default LoginPage
