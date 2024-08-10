// src/components/PaymentSchemePage.js

import React, { useState } from 'react';
import './PaymentSchemePage.css';
import WelcomePage from '../welcomepage/WelcomePage';

function PaymentSchemePage({ onBack }) {
  const [selectedScheme, setSelectedScheme] = useState('Monthly');
  const [showWelcomePage, setShowWelcomePage] = useState(false);

  const handleSelectScheme = (scheme) => {
    setSelectedScheme(scheme);
  };

  const handleSelectClick = () => {
    setShowWelcomePage(true);
  };

  return (
    <div>
      {showWelcomePage ? (
        <WelcomePage />
      ) : (
        <div className="payment-scheme-container">
          <div className="back-button" onClick={onBack}>
            ←
          </div>
          <h2 className="payment-title">Payment Scheme</h2>
          
          <div
            className={`scheme-card ${selectedScheme === 'Monthly' ? 'selected' : ''}`}
            onClick={() => handleSelectScheme('Monthly')}
          >
            <div className="checkmark">✔</div>
            <h3>Monthly</h3>
            <p>Donate ₹ 100 every month</p>
            <h2>₹ 100</h2>
          </div>
          <div
            className={`scheme-card ${selectedScheme === 'Quarterly' ? 'selected' : ''}`}
            onClick={() => handleSelectScheme('Quarterly')}
          >
            <div className="checkmark">✔</div>
            <h3>Quarterly</h3>
            <p>Donate ₹ 300 every three months</p>
            <h2>₹ 300</h2>
          </div>
          <div
            className={`scheme-card ${selectedScheme === 'Half yearly' ? 'selected' : ''}`}
            onClick={() => handleSelectScheme('Half yearly')}
          >
            <div className="checkmark">✔</div>
            <h3>Half yearly</h3>
            <p>Donate ₹ 600 every six months</p>
            <h2>₹ 600</h2>
          </div>
          <div
            className={`scheme-card ${selectedScheme === 'Annual' ? 'selected' : ''}`}
            onClick={() => handleSelectScheme('Annual')}
          >
            <div className="checkmark">✔</div>
            <h3>Annual</h3>
            <p>Donate ₹ 1200 every year</p>
            <h2>₹ 1200</h2>
          </div>
          
          <button className="submit-button" onClick={handleSelectClick}>
            SELECT →
          </button>
        </div>
      )}
    </div>
  );
}

export default PaymentSchemePage;
