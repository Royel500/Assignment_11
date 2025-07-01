import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import Swal from 'sweetalert2';
import './Navbar.css';
import { ThemeContext } from './ThemeProvider';
import { FaMoon, FaSun, FaBars, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // mobile menu toggle

  const handleLogout = () => {
    logOut()
      .then(() => {
        Swal.fire({
          title: 'Success!',
          text: 'Logged out successfully!',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      })
      .catch((error) => {
        alert(error.code);
      });
  };

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const closeDropdown = () => setDropdownOpen(false);

  const handleMobileMenuToggle = () => setIsOpen(!isOpen);
  const closeMobileMenu = () => setIsOpen(false);

  const navLinks = (
    <>
      <NavLink to="/" onClick={closeMobileMenu} className="btn btn-ghost text-base">Home</NavLink>
      <NavLink to="/assignments" onClick={closeMobileMenu} className="btn btn-ghost text-base">Assignments</NavLink>
                <NavLink to="/blog" onClick={closeMobileMenu} className="btn btn-ghost text-base">Blog</NavLink>
          <NavLink to="/contact" onClick={closeMobileMenu} className="btn btn-ghost text-base">Contact</NavLink>
      {user && (
        <NavLink to="/pending" onClick={closeMobileMenu} className="btn btn-ghost text-base">
          Pending Assignments</NavLink>
      ) }
    </>
  );

  return (
    <div className={`navbar shadow-sm ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gradient-to-r from-blue-400 via-green-500 to-red-300 text-gray-800'}`}>
      {/* Left: Logo + Mobile menu toggle */}
      <div className="navbar-start">
        {/* Mobile Menu Toggle */}
        <button
          onClick={handleMobileMenuToggle}
          className="lg:hidden focus:outline-none "
          aria-label="Toggle menu"
        >
          {isOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
        </button>

        {/* Animated Title */}
        <motion.label
          className="text-2xl lg:text-2xl ml-1 font-extrabold cursor-pointer"
          animate={{
            color: ["#e11d48", "#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899", "#14b8a6", "#f43f5e", "#e11d48"]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        >
          Assignments
        </motion.label>
      </div>

      {/* Center: Desktop Nav */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navLinks}
        </ul>
      </div>

      {/* Right: Theme toggle + User info */}
      <div className="navbar-end gap-1 relative">
        <button onClick={toggleTheme} className="mx-2 bg-red-600 rounded-3xl p-1">
          {theme === 'light' ? <FaSun size={20} /> : <FaMoon size={20} />}
        </button>

        {user ? (
          <div className="flex items-center gap-3 relative">
            {/* Profile picture dropdown */}
            <div className="relative">
              <div className="tooltip" data-tip={user.displayName || 'User'} onClick={toggleDropdown}>
                <div className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img
                      src={user.photoURL?.startsWith('http') ? user.photoURL : 'https://i.ibb.co/2kR84xh/default-user.png'}
                      alt="User"
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              </div>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <ul className="absolute right-0 mt-3 w-52 p-2 bg-base-200 shadow rounded-box z-50">
                  <li className="py-2 px-4 font-semibold">
                    {user.displayName || 'User'}
                  </li>
                  <li>
                    <NavLink to="/create" className="block py-2 px-4 hover:bg-base-100 rounded" onClick={closeDropdown}>
                      Create Assignments
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/attempted" className="block py-2 px-4 hover:bg-base-100 rounded" onClick={closeDropdown}>
                      My Attempted Assignments
                    </NavLink>
                  </li>
                </ul>
              )}
            </div>

            <button onClick={() => { handleLogout(); closeDropdown(); }} className="btn btn-sm btn-error text-white">
              Logout
            </button>
          </div>
        ) : (
          <>
            <NavLink to="/signUp" className="btn btn-sm">Sign Up</NavLink>
            <NavLink to="/signIn" className="btn btn-sm">Sign In</NavLink>
          </>
        )}
      </div>

      {/* Mobile Nav Drawer */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-base-200 shadow-lg z-40 flex flex-col items-start px-4 py-3 lg:hidden">
          {navLinks}
        </div>
      )}
    </div>
  );
};

export default Navbar;
