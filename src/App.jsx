import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import BgImage from "./assets/sunrise.jpg";
import Hero from "./components/Hero/Hero";
import Dashboard from "./pages/Dashboard/Dashboard";
import { AuthProvider } from "./context/AuthContext";
import { GiSpellBook } from "react-icons/gi";

const App = () => {
  const [loginPopup, setLoginPopup] = useState(false);
  const currentDateTime = "2025-03-03 19:03:34"; // Current UTC time
  const currentUser = "Krishna27S";
  
  const handleLoginPopup = () => {
    setLoginPopup(!loginPopup);
  };

  // Background style with overlay
  const bgImage = {
    width: "100%",
    height: "100vh",
    background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${BgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
  };

  // Protected route component
  const ProtectedRoute = ({ children, role = null }) => {
    const user = localStorage.getItem('user');
    const parsedUser = user ? JSON.parse(user) : null;

    if (!parsedUser) {
      return <Navigate to="/" />;
    }

    if (role && parsedUser.role !== role) {
      return <Navigate to="/" />;
    }

    return children;
  };

  return (
    <Router>
      <AuthProvider>
        <div className="app-container relative min-h-screen">
          {/* Main Content Routes */}
          <Routes>
            {/* Home Route */}
            <Route 
              path="/" 
              element={
                <div className="relative">
                  <main style={bgImage}>
                    <Navbar 
                      handleLoginPopup={handleLoginPopup} 
                      currentUser={currentUser}
                      currentDateTime={currentDateTime}
                    />
                    <Hero />
                  </main>
                </div>
              } 
            />

            {/* Dashboard Route */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard currentUser={currentUser} currentDateTime={currentDateTime} />
                </ProtectedRoute>
              } 
            />

            {/* Mystical Realm Route */}
            <Route 
              path="/mystical-realm" 
              element={
                <ProtectedRoute>
                  <div className="min-h-screen bg-[#1a0f0f] text-amber-100 p-8">
                    <div className="max-w-7xl mx-auto">
                      <div className="flex items-center gap-4 mb-8">
                        <GiSpellBook className="text-4xl text-amber-500" />
                        <div>
                          <h1 className="text-3xl font-medieval">Welcome to the Mystical Realm</h1>
                          <p className="text-amber-400/60">Explorer: {currentUser}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-[#2a1f1f] rounded-lg p-6 border border-amber-900/30">
                          <h2 className="text-xl font-medieval mb-4">Current Time</h2>
                          <p className="text-amber-400">{currentDateTime}</p>
                        </div>
                        <div className="bg-[#2a1f1f] rounded-lg p-6 border border-amber-900/30">
                          <h2 className="text-xl font-medieval mb-4">Recent Activities</h2>
                          <p className="text-amber-400">Coming soon...</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </ProtectedRoute>
              } 
            />

            {/* Admin Sanctum Route */}
            <Route 
              path="/admin-sanctum" 
              element={
                <ProtectedRoute role="admin">
                  <div className="min-h-screen bg-[#1a0f0f] text-amber-100 p-8">
                    <div className="max-w-7xl mx-auto">
                      <div className="flex items-center gap-4 mb-8">
                        <GiSpellBook className="text-4xl text-red-500" />
                        <div>
                          <h1 className="text-3xl font-medieval">Admin Sanctum</h1>
                          <p className="text-red-400/60">Master Scribe: {currentUser}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-[#2a1f1f] rounded-lg p-6 border border-red-900/30">
                          <h2 className="text-xl font-medieval mb-4">Admin Controls</h2>
                          <p className="text-red-400">Administrative features coming soon...</p>
                        </div>
                        <div className="bg-[#2a1f1f] rounded-lg p-6 border border-red-900/30">
                          <h2 className="text-xl font-medieval mb-4">System Status</h2>
                          <p className="text-red-400">Current Time: {currentDateTime}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </ProtectedRoute>
              } 
            />

            {/* Catch-all Route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>

          {/* Time and User Display - Only show on home page */}
          {window.location.pathname === '/' && (
            <div className="fixed bottom-4 right-4 text-amber-100 text-sm bg-[#1a0f0f]/80 p-4 rounded-lg backdrop-blur-sm">
              <p>Ancient Realm Time: {currentDateTime}</p>
              <p>Current Scribe: {currentUser}</p>
            </div>
          )}

          {/* Login Popup */}
          {loginPopup && (
            <LoginPopup 
              loginPopup={loginPopup} 
              handleLoginPopup={handleLoginPopup}
              currentDateTime={currentDateTime}
              currentUser={currentUser}
            />
          )}
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;