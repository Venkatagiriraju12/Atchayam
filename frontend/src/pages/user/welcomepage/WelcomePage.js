// src/components/WelcomePage.js

import React from 'react';
import './WelcomePage.css';

function WelcomePage() {
  return (
    <div className="welcome-container">
      <div className="logo-container">
        <img src="./uploads/atchayam-logo.png" alt="Atchayam Logo" className="logo" />
      </div>
      <div className='welcome-content'>
      <h1 className="sivayanama">Sivayanama!!</h1>
      <h2 className="greeting">Hello, Venkat</h2>
      <p className="registration-number">Registration number APAK23909</p>
      </div>
      <button className="explore-button">START EXPLORING →</button>
    </div>
  );
}

export default WelcomePage;
