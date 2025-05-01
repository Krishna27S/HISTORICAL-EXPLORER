import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { 
  GiScrollUnfurled, 
  GiAncientSword, 
  GiDragonHead, 
  GiCandlestickPhone, 
  GiWaxSeal,
  GiTreasureMap,
  GiFeather
} from "react-icons/gi";

const Login = ({ handleLoginPopup }) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const currentDateTime = "2025-03-03 19:07:05";

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simple validation
    if (!formData.email || !formData.password) {
      setError("Both email and password are required.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
        credentials: 'include', // Ensure cookies are sent with the request
      });

      const result = await response.json();
      
      if (!response.ok) {
        setError(result.message || "Login failed");
        console.error("Error response:", result);
        throw new Error(result.message);
      }

      console.log("Login success:", result);
      login(result.user); // Assuming you use a context to update user state
      navigate("/dashboard"); // Navigate to the dashboard or another page after login

    } catch (error) {
      console.error('Login error details:', error);
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
};


  return (
    <div className="p-6 historical-login">
      <div className="dragon-border">
        <GiDragonHead className="dragon-head left" />
        <GiDragonHead className="dragon-head right" />
      </div>
      
      <div className="scroll-header animated-scroll">
        <GiScrollUnfurled className="text-5xl text-amber-700 mb-2 scroll-icon" />
        <h1 className="text-3xl text-amber-100 font-medieval text-center mb-4">
          Welcome to the Ancient Portal
        </h1>
      </div>

      {error && (
        <div className="error-scroll my-4 p-3 border-2 border-red-400 bg-red-900/20 rounded-lg">
          <p className="text-red-400 text-center text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="form-field">
          <label htmlFor="email" className="input-label text-parchment flex items-center">
            <GiTreasureMap className="mr-2 text-xl" />
            <span>Email Address</span>
          </label>
          <div className="input-wrapper">
            <input
              id="email"
              type="email"  // Changed to email input type
              value={formData.email}
              onChange={handleChange}
              className="historical-input"
              placeholder="Enter your email"
            />
            <GiWaxSeal className="wax-seal" />
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="password" className="input-label text-parchment flex items-center">
            <GiFeather className="mr-2 text-xl quill-icon" />
            <span>Mystical Cipher</span>
          </label>
          <div className="input-wrapper">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              className="historical-input pr-12"
              placeholder="Enter your password"
            />
            <div className="password-toggle">
              {showPassword ? (
                <FaEye
                  className="text-amber-200 absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer hover:text-amber-400"
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <FaEyeSlash
                  className="text-amber-200 absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer hover:text-amber-400"
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </div>
          </div>
        </div>

        <button 
          type="submit"
          disabled={isLoading}
          className={`historical-btn portal-button ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
        >
          <div className="button-content">
            <GiAncientSword className={`inline-block mr-2 sword-icon ${isLoading ? 'animate-spin' : ''}`} />
            <span>{isLoading ? 'Opening Portal...' : 'Breach the Portal'}</span>
          </div>
        </button>
      </form>

      <p className="text-center text-amber-200 text-sm mt-4 cursor-pointer hover:text-amber-400"
         onClick={() => handleLoginPopup(false)}>
        <GiCandlestickPhone className="inline-block mr-2" />
        Return to the Mortal Realm
      </p>
    </div>
  );
};

export default Login;
