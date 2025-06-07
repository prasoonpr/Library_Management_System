import React, { useState } from 'react'
import { useRegisterMutation } from '../../services/userApi';
import { useNavigate } from 'react-router-dom';

const RegistrationPage = () => {
     const navigate=useNavigate()
    const [register,{error}]=useRegisterMutation()
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "student",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    const response=await register(form)
    localStorage.setItem('userToken',response.data.accessToken)
    navigate('/');
    window.location.reload();
    // onRegister(form); // Send to backend with role info
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-16 rounded-xl shadow-md w-full max-w-md space-y-5"
      >
        {error?<h2 className="text-sm font-bold text-center text-red-700 mb-4">{error?.data?.message}</h2>:<h2 className="text-2xl font-bold text-center text-blue-700">Register</h2>}
        

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
        >
          Register
        </button>

        <p className="text-sm text-center text-gray-600">
          Already have an account? <a href="/login" className="text-blue-600">Login</a>
        </p>
      </form>
    </div>
  );
}

export default RegistrationPage
