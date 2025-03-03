import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Login from "./Login";
import Signin from "./Signin";
import { GiScrollUnfurled, GiHourglass } from "react-icons/gi";

const LoginPopup = ({ loginPopup, handleLoginPopup }) => {
  const [showSignIn, setShowSignIn] = useState(false);
  const loginPopupRef = useRef();
  const currentDateTime = "2025-03-03 19:10:48";
  const currentUser = "Krishna27S";

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
              <div className="relative rounded-2xl bg-[#1a0f0f]/90 backdrop-blur-md shadow-xl border border-amber-900/30">
                {/* Header */}
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 flex items-center gap-2 text-amber-100/80 text-sm px-4 py-2 bg-[#1a0f0f]/90 rounded-t-lg border border-amber-900/30">
                  <GiHourglass className="text-amber-500 animate-pulse" />
                  <span>{currentDateTime}</span>
                </div>

                {/* Content */}
                <div className="p-6">
                  {showSignIn ? (
                    <>
                      <div className="mb-6 text-center">
                        <GiScrollUnfurled className="text-4xl text-amber-500 mx-auto mb-2" />
                        <h2 className="text-2xl font-medieval text-amber-100">
                          Create New Account
                        </h2>
                        <p className="text-amber-400/60 text-sm">
                          Join the Ancient Order
                        </p>
                      </div>
                      <Signin 
                        handleSignIn={handleSignIn} 
                        handleLoginPopup={handleLoginPopup}
                        currentDateTime={currentDateTime}
                        currentUser={currentUser}
                      />
                    </>
                  ) : (
                    <>
                      <div className="mb-6 text-center">
                        <GiScrollUnfurled className="text-4xl text-amber-500 mx-auto mb-2" />
                        <h2 className="text-2xl font-medieval text-amber-100">
                          Portal Access
                        </h2>
                        <p className="text-amber-400/60 text-sm">
                          Enter the Ancient Realm
                        </p>
                      </div>
                      <Login 
                        handleSignIn={handleSignIn} 
                        handleLoginPopup={handleLoginPopup}
                        currentDateTime={currentDateTime}
                        currentUser={currentUser}
                      />
                    </>
                  )}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-[#1a0f0f]/50 border-t border-amber-900/30 rounded-b-2xl">
                  <button
                    onClick={handleSignIn}
                    className="w-full text-center text-amber-400/80 hover:text-amber-300 
                             transition-colors duration-300 text-sm"
                  >
                    {showSignIn
                      ? "Already have an account? Enter the Portal"
                      : "Need access? Request Ancient Credentials"}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LoginPopup;