// src/components/SplashScreen.js

import React, { useEffect, useState } from 'react';
import './SplashScreen.css';
import LoginPage from './LoginPage';

function SplashScreen() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Wait 5 seconds, then hide the splash screen and show the login page
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 5000);

    // Cleanup the timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {showSplash ? (
        <div className="splash-container">
          <div className="splash-content">
            <img 
              src="./uploads/atchayam-logo.png" 
              alt="Atchayam Trust Logo" 
              className="splash-logo"
            />
            <h1 className="app-title">Atchayam Trust</h1>
            <p className="app-tagline">CREATE A BEGGER FREE INDIA</p>
          </div>
        </div>
      ) : (
        <LoginPage />
      )}
    </div>
  );
}

export default SplashScreen;
