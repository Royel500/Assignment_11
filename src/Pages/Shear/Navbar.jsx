import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';
import Swal from 'sweetalert2';
import './Navbar.css';
import { ThemeContext } from './ThemeProvider';
import { FaMoon, FaSun } from 'react-icons/fa';


const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);


    const { theme, toggleTheme } = useContext(ThemeContext);

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

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const navLinks = user ? (
    <>
        <NavLink to="/" className="btn btn-ghost text-base"> Home</NavLink>
        <NavLink to="/assignments" className="btn btn-ghost text-base"> Assignments</NavLink>
      <NavLink to="/pending" className="btn btn-ghost text-base">Pending Assignments</NavLink>
  
    </>
  ) : (
    <>
     <NavLink to="/" className="btn btn-ghost text-base"> Home</NavLink>
      <NavLink to="/assignments" className="btn btn-ghost text-base">Assignments</NavLink>
    </>
  );

  return (
    <div className={`navbar shadow-sm ${
            theme === 'dark' 
        ? 'bg-gray-900 text-white' 
        : 'bg-gradient-to-r from-blue-400 via-green-500 to-red-300 text-gray-800'
    }`}>

 

      {/* Left: Logo and Mobile Menu */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow">
            {navLinks}
          </ul>
        </div>
        <div className=" font-bold mx-2 text-xl">Assignments</div>
      </div>

      {/* Center: Desktop Nav */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navLinks}
        </ul>
      </div>

      {/* Right: Profile Picture + Logout */}
      <div className="navbar-end gap-3 relative">

        
     <button onClick={toggleTheme} className="mx-2">
      {theme === 'light' ? <FaSun size={20}></FaSun> : <FaMoon size={20}></FaMoon> }
    </button>


        {user ? (
          <div className="flex items-center gap-3 relative">
            {/* Profile Picture Toggle */}
            <div className="relative">
              <div
                className="tooltip"
                data-tip={user.displayName || 'User'}
                onClick={toggleDropdown}
              >
                <div className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img
                      src={
                        user.photoURL && user.photoURL.startsWith('http')
                          ? user.photoURL
                          : 'https://i.ibb.co/2kR84xh/default-user.png'
                      }
                      alt="User"
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              </div>

              {/* Dropdown menu */}
              {dropdownOpen && (
                <ul className="absolute right-0 mt-3 w-52 p-2 bg-base-200 shadow rounded-box z-50">
                  <li className="py-2 px-4 font-semibold">
                    {user.displayName || 'User'}
                  </li>
                  <li>
                    <NavLink
                      to="/create"
                      className="block py-2 px-4 hover:bg-base-100 rounded"
                      onClick={closeDropdown}
                    >
                      Create Assignments
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/attempted"
                      className="block py-2 px-4 hover:bg-base-100 rounded"
                      onClick={closeDropdown}
                    >
                      My Attempted Assignments
                    </NavLink>
                  </li>
                </ul>
              )}
            </div>

            {/* Logout Button */}
            <button
              onClick={() => {
                handleLogout();
                closeDropdown();
              }}
              className="btn btn-sm btn-error text-white"
            >
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
    </div>
  );
};

export default Navbar;
