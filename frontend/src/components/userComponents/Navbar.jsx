
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Books", path: "/" },
    { name: "Borrowed", path: "/borrowed" },
    { name: "History", path: "/history" },
    { name: "Fines", path: "/fines" },
    { name: "Wishlist", path: "/wishlist" },
  ];

  return (
    <nav className="bg-white text-black fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-10 py-3 flex items-center justify-between">
        {/* Left: Logo */}
        <h1 className="text-xl font-bold">
          <Link to="/">📚 MyLibrary</Link>
        </h1>

        {/* Center: Menu (desktop) */}
        <ul className="hidden md:flex gap-10 justify-center flex-1">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`hover:text-gray-700 ${
                  location.pathname === link.path ? "font-bold underline" : ""
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right: Logout + Hamburger */}
        <div className="flex items-center gap-4">
          <button className="bg-white text-black px-3 py-1 rounded hover:bg-gray-100 text-sm">
            Logout
          </button>
          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <ul className="md:hidden bg-white px-4 py-2 space-y-2">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`block py-1 ${
                  location.pathname === link.path ? "font-bold underline" : ""
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
