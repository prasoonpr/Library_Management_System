// Sidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const { pathname } = useLocation();

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
    <div className="w-64 bg-blue-800 text-white flex flex-col p-4 shadow-md">
      <h2 className="text-2xl font-bold mb-6">📚 Admin Panel</h2>
      <nav className="space-y-2">
        {navItem("/admin/dashboard", "Dashboard")}
        {navItem("/admin/books", "Manage Books")}
        {navItem("/admin/users", "Manage Users")}
        {navItem("/admin/borrows", "Borrow History")}
      </nav>
    </div>
  );
};

export default Sidebar;
