import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { GiScrollQuill, GiAncientSword, GiSpellBook } from "react-icons/gi";

const Navbar = ({ handleLoginPopup }) => {
  const { user, logout } = useAuth();
  const currentDateTime = "2025-03-03 18:49:33"; // Current UTC time
  const currentUser = "Krishna27S";

  return (
    <nav className="bg-[#1a0f0f]/90 backdrop-blur-md border-b border-amber-900/30">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <Link 
            to="/" 
            className="flex items-center gap-2 text-amber-100 text-xl font-medieval hover:text-amber-200 transition-colors"
          >
            <GiScrollQuill className="text-2xl" />
            <span>Historical Explorer</span>
          </Link>

          {/* Navigation Items */}
          <div className="flex items-center gap-6">
            {/* DateTime Display */}
            <div className="hidden md:flex items-center gap-2 text-amber-100/80 text-sm">
              <GiSpellBook className="text-lg" />
              <span>{currentDateTime}</span>
            </div>

            {/* User Navigation */}
            {user ? (
              <div className="flex items-center gap-4">
                {user.role === 'admin' && (
                  <Link 
                    to="/admin-sanctum"
                    className="flex items-center gap-2 px-4 py-2 bg-amber-900/30 
                             text-amber-100 rounded-lg hover:bg-amber-800/40 
                             transition-colors duration-300"
                  >
                    <GiAncientSword className="text-lg" />
                    <span>Admin Sanctum</span>
                  </Link>
                )}
                <Link 
                  to="/mystical-realm"
                  className="flex items-center gap-2 px-4 py-2 bg-amber-900/30 
                           text-amber-100 rounded-lg hover:bg-amber-800/40 
                           transition-colors duration-300"
                >
                  <GiSpellBook className="text-lg" />
                  <span>Mystical Realm</span>
                </Link>
                <button 
                  onClick={logout}
                  className="flex items-center gap-2 px-4 py-2 bg-red-900/30 
                           text-amber-100 rounded-lg hover:bg-red-800/40 
                           transition-colors duration-300 border border-red-800/30"
                >
                  <span>Leave Portal</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                {/* Current User Display (when not logged in) */}
                <span className="hidden md:block text-amber-100/60 text-sm">
                  Last Scribe: {currentUser}
                </span>
                
                {/* Login Button */}
                <button
                  onClick={handleLoginPopup}
                  className="flex items-center gap-2 px-4 py-2 bg-amber-900/30 
                           text-amber-100 rounded-lg hover:bg-amber-800/40 
                           transition-colors duration-300 border border-amber-700/30"
                >
                  <GiAncientSword className="text-lg" />
                  <span>Enter Portal</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;