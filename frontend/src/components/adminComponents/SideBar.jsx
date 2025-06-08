import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear token or admin data from storage
    localStorage.removeItem("adminToken"); // or your token key
    navigate("/admin/login");
  };

  const navItem = (path, label) => (
    <Link
      to={path}
      className={`block px-4 py-2 rounded-md transition ${
        pathname === path
          ? "bg-blue-600 text-white"
          : "text-gray-300 hover:bg-blue-700 hover:text-white"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <div className="w-64 h-screen bg-blue-800 text-white flex flex-col p-4 shadow-md">
      <div>
        <h2 className="text-2xl font-bold mb-6">📚 Admin Panel</h2>
        <nav className="space-y-2">
          {navItem("/admin/dashboard", "Dashboard")}
          {navItem("/admin/books", "Manage Books")}
          {navItem("/admin/users", "Manage Users")}
          {navItem("/admin/borrows", "Borrow History")}
        </nav>
      </div>

      <div className="mt-auto pt-4 border-t border-blue-700">
        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-2 text-red-300 hover:text-white hover:bg-red-600 rounded-md transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
