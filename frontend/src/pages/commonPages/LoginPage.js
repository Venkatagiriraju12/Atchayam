// src/components/LoginPage.js

import React, { useState } from 'react';
import './LoginPage.css';
import OTPVerificationPage from './OTPVerificationPage';

function LoginPage() {
  const [showOtpPage, setShowOtpPage] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: phoneNumber }),
      });

      const data = await response.json();

      if (response.ok) {
        setShowOtpPage(true);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div>
      {showOtpPage ? (
        <OTPVerificationPage phoneNumber={phoneNumber} />
      ) : (
        <div className="login-container">
          <div className="login-content">
            <h1 className="app-name">Sivayanama!!</h1>
            <h2 className="welcome-message">Welcome To Atchayam</h2>
            <h3 className="login-prompt">Login to your account</h3>

            <div className="input-container">
              <div className="country-code">
                <span role="img" aria-label="phone">📞</span>
                <select name="countryCode" id="countryCode">
                  <option value="+91">+91</option>
                </select>
              </div>
              <input 
                type="text" 
                className="phone-input" 
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <button className="login-button" onClick={handleLogin}>
              LOGIN →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginPage;
