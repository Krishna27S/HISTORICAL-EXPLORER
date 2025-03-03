import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import BgImage from "./assets/sunrise.jpg";
import Hero from "./components/Hero/Hero";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  const [loginPopup, setLoginPopup] = useState(false);
  const currentDateTime = "2025-03-03 18:41:55"; // Current UTC time
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
          <main style={bgImage}>
            <Navbar 
              handleLoginPopup={handleLoginPopup} 
              currentUser={currentUser}
              currentDateTime={currentDateTime}
            />
            
            <Routes>
              <Route path="/" element={<Hero />} />
              <Route 
                path="/mystical-realm" 
                element={
                  <ProtectedRoute>
                    <div className="text-amber-100 p-8">
                      <h1>Welcome to the Mystical Realm</h1>
                      <p>Current Time: {currentDateTime}</p>
                      <p>Explorer: {currentUser}</p>
                    </div>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin-sanctum" 
                element={
                  <ProtectedRoute role="admin">
                    <div className="text-amber-100 p-8">
                      <h1>Admin Sanctum</h1>
                      <p>Current Time: {currentDateTime}</p>
                      <p>Master Scribe: {currentUser}</p>
                    </div>
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>

          {/* Time and User Display */}
          <div className="fixed bottom-4 right-4 text-amber-100 text-sm bg-[#1a0f0f]/80 p-4 rounded-lg backdrop-blur-sm">
            <p>Ancient Realm Time: {currentDateTime}</p>
            <p>Current Scribe: {currentUser}</p>
          </div>

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