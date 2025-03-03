import React from "react";

const Hero = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl text-amber-100 font-medieval mb-6">
          Welcome to the Historical Explorer
        </h1>
        <p className="text-xl text-amber-200/80 max-w-2xl mx-auto">
          Embark on a journey through time and uncover the mysteries of the ancient realms.
        </p>
      </div>
    </div>
  );
};

export default Hero;