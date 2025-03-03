import React, { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash, FaLinkedinIn } from "react-icons/fa";
import { 
  GiScrollUnfurled, 
  GiAncientSword, 
  GiDragonHead, 
  GiCandlestickPhone, 
  GiWaxSeal,
  GiTreasureMap,
  GiFeather
} from "react-icons/gi";

const Login = ({ handleSignIn }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [torchLight, setTorchLight] = useState({ x: 0, y: 0 });
  const [magicEffect, setMagicEffect] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setTorchLight({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handlePortalEntry = () => {
    setMagicEffect(true);
    setTimeout(() => setMagicEffect(false), 1500);
  };

  return (
    <>
      <div className="p-6 historical-login torch-light" style={{
        '--cursor-x': `${torchLight.x}px`,
        '--cursor-y': `${torchLight.y}px`
      }}>
        <div className="dragon-border">
          <GiDragonHead className="dragon-head left" />
          <GiDragonHead className="dragon-head right" />
        </div>
        
        <div className="scroll-header animated-scroll">
          <GiScrollUnfurled className="text-5xl text-amber-700 mb-2 scroll-icon" />
          <h1 className="text-3xl text-amber-100 font-medieval text-center mb-4 scroll-text magical-text">
            <span className="torch-reveal">Welcome to the Ancient Portal</span>
          </h1>
          <div className="medieval-ornament"></div>
        </div>

        <form className="flex flex-col gap-3 ancient-form enchanted-parchment">
          <div className="form-field">
            <label htmlFor="username" className="input-label text-parchment flex items-center">
              <GiTreasureMap className="mr-2 text-xl" />
              <span>Thy Identity Scroll</span>
            </label>
            <div className="input-wrapper">
              <input id="username" type="text" className="historical-input" />
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
                className="historical-input pr-12"
                id="password"
                type={showPassword ? "text" : "password"}
              />
              <div className="password-toggle">
                {showPassword ? (
                  <FaEye
                    className="text-amber-200 absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer hover:text-amber-400 magic-eye"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <FaEyeSlash
                    className="text-amber-200 absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer hover:text-amber-400 magic-eye"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
              </div>
            </div>
          </div>
        </form>

        <button 
          className={`historical-btn portal-button ${magicEffect ? 'portal-active' : ''}`}
          onClick={handlePortalEntry}
        >
          <div className="button-content">
            <GiAncientSword className="inline-block mr-2 sword-icon" />
            <span>Breach the Portal</span>
          </div>
          <div className="magical-particles"></div>
        </button>

        <div className="divider">
          <span className="divider-line"></span>
          <p className="text-center text-amber-200 text-sm my-3 ancient-text">
            Summon Aid from the Modern Realms
          </p>
          <span className="divider-line"></span>
        </div>

        <div className="flex gap-6 justify-center">
          <div className="historical-social-btn magical-orb google">
            <div className="orb-glow"></div>
            <FcGoogle className="text-3xl" />
          </div>
          <div className="historical-social-btn magical-orb linkedin">
            <div className="orb-glow"></div>
            <FaLinkedinIn className="text-2xl text-parchment" />
          </div>
        </div>

        <p
          className="text-center text-amber-200 text-sm my-3 hover:text-amber-400 cursor-pointer ancient-text register-text"
          onClick={handleSignIn}
        >
          <GiCandlestickPhone className="inline-block mr-2" />
          Request Access to the Ancient Archives
        </p>
      </div>
    </>
  );
};

export default Login;