import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Login from "./Login";
import Signin from "./Signin";

const LoginPopup = ({ loginPopup, handleLoginPopup }) => {
  const [showSignIn, setShowSignIn] = useState(false);
  const loginPopupRef = useRef();

  const handleSignIn = () => {
    setShowSignIn(!showSignIn);
  };

  const handleBackdropClick = (e) => {
    if (e.target === loginPopupRef.current) {
      handleLoginPopup(false);
    }
  };

  return (
    <AnimatePresence>
      {loginPopup && (
        <div
          ref={loginPopupRef}
          className="fixed inset-0 w-full h-full z-50 bg-black/50 backdrop-blur-sm overflow-y-auto"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center min-h-screen px-4 py-8"
          >
            <div className="w-full max-w-md">
              <div className="relative rounded-2xl bg-[#1a0f0f]/90 backdrop-blur-md shadow-xl">
                {showSignIn ? (
                  <Signin handleSignIn={handleSignIn} handleLoginPopup={handleLoginPopup} />
                ) : (
                  <Login handleSignIn={handleSignIn} handleLoginPopup={handleLoginPopup} />
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LoginPopup;